// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;

      if (!currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    loadUser();
  }, [router]);

  const handleUpgrade = async (priceId: string) => {
    if (!user) return router.push('/login');

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Checkout-Fehler:', err);
      alert('Beim Upgrade ist ein Fehler aufgetreten.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-1)] text-[var(--text-1)]">
        <p>Lade Dashboard...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[var(--background-1)] text-[var(--text-1)] flex flex-col items-center pt-24 px-6">
      <div className="max-w-3xl w-full bg-[var(--background-2)] shadow-lg rounded-3xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-[var(--accent-1)]">
          Willkommen, {profile?.name || 'Benutzer'}
        </h1>
        <p className="mb-8 text-[var(--text-2)]">
          Dein aktueller Plan: <strong>{profile?.current_plan || 'free'}</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE!)}
            className="bg-[var(--button-1)] hover:bg-[var(--button-1-hover)] text-[var(--button-text)] px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Upgrade auf Basic
          </button>
          <button
            onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE!)}
            className="bg-[var(--button-2)] hover:bg-[var(--button-2-hover)] text-[var(--button-text)] px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Upgrade auf Pro
          </button>
        </div>
      </div>
    </section>
  );
}
