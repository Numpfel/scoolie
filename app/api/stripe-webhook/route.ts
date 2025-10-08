import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const data = event.data.object as any;

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
    const plan = data.items.data[0].plan.nickname;
    const customerId = data.customer;

    await supabase
      .from('profiles')
      .update({
        subscription_status: data.status,
        current_plan: plan,
      })
      .eq('stripe_customer_id', customerId);
  }

  return NextResponse.json({ received: true });
}
