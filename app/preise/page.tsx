'use client';

import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function PreisePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentPlan, setCurrentPlan] = useState<'free' | 'basic' | 'pro'>('free');
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: '0 € / Monat',
      priceId: process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE!,
      features: [
        { text: 'Einfacher Chatbot zur Unterstützung Schulaufgaben', included: true },
        { text: 'Allgemeine Vorraussage der nächsten Themen', included: true },
        { text: 'Lehrplanspezifische Vorrausage der nächsten Themen', included: false },
        { text: 'Erstellen von Übungsblättern zur Vor und Nachbereitung', included: false },
        { text: 'Erstellen von Probeklassenarbeiten/Tests', included: false },
        { text: 'Erstellen von individuellen Lernplänen', included: false },
      ],
    },
    {
      name: 'Basic',
      price: '10 € / Monat',
      priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE!,
      features: [
        { text: 'Erweiterter Chatbot zur Unterstützung Schulaufgaben', included: true },
        { text: 'Allgemeine Vorraussage der nächsten Themen', included: true },
        { text: 'Lehrplanspezifische Vorrausage der nächsten Themen', included: true },
        { text: 'Erstellen von Übungsblättern zur Vor und Nachbereitung', included: true },
        { text: 'Erstellen von Probeklassenarbeiten/Tests', included: false },
        { text: 'Erstellen von individuellen Lernplänen', included: false },
      ],
    },
    {
      name: 'Pro',
      price: '20 € / Monat',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE!,
      features: [
        { text: 'Erweiterter Chatbot zur Unterstützung Schulaufgaben', included: true },
        { text: 'Allgemeine Vorraussage der nächsten Themen', included: true },
        { text: 'Lehrplanspezifische Vorrausage der nächsten Themen', included: true },
        { text: 'Erstellen von Übungsblättern zur Vor und Nachbereitung', included: true },
        { text: 'Erstellen von Probeklassenarbeiten/Tests', included: true },
        { text: 'Erstellen von individuellen Lernplänen', included: true },
      ],
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        setUser(null);
        setCurrentPlan('free');
        return;
      }
      setUser(data.session.user);
      loadSubscription(data.session.user.id);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
        setCurrentPlan('free');
        return;
      }
      setUser(session.user);
      loadSubscription(session.user.id);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadSubscription = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('current_plan')
      .eq('id', userId)
      .single();

    if (data?.current_plan) setCurrentPlan(data.current_plan as 'free' | 'basic' | 'pro');
    else setCurrentPlan('free');
  };

  const handleCheckout = async (planPriceId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, priceId: planPriceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Fehler beim Erstellen der Checkout-Session.');
      }
    } catch (error) {
      console.error(error);
      alert('Fehler beim Checkout-Vorgang.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="max-w-6xl mx-auto px-6 py-20 text-center"
      style={{ color: 'var(--text-1)' }}
    >
      <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--accent-1)' }}>
        Unsere Preise
      </h1>
      <p className="text-lg mb-12" style={{ color: 'var(--text-2)' }}>
        Wähle den Plan, der zu dir passt. Du kannst jederzeit upgraden oder downgraden.
      </p>

      {/* Upgrade Banner */}
      {user && currentPlan !== 'pro' && (
        <div
          className="max-w-3xl mx-auto mb-10 p-4 rounded-xl text-center font-semibold cursor-pointer"
          style={{
            backgroundColor: 'var(--highlight-bg)',
            color: 'var(--highlight-text)',
          }}
          onClick={() => {
            if (currentPlan === 'free')
              handleCheckout(process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE!);
            else handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE!);
          }}
        >
          Dein aktueller Plan: <strong>{currentPlan}</strong>. Upgrade jetzt!
        </div>
      )}

      {/* Preis-Karten */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => {
          let buttonClasses =
            'mt-auto py-3 px-10 rounded-xl text-lg shadow-md transition-all duration-300 font-bold ';
          let buttonText = '';
          let disabled = false;

          if (!user) {
            buttonClasses += 'bg-[var(--button-1)] hover:bg-[var(--button-2)] text-[var(--button-text)]';
            buttonText = 'Jetzt anmelden';
          } else {
            if (currentPlan === plan.name.toLowerCase()) {
              buttonClasses +=
                'bg-[var(--button-disabled)] text-[var(--text-disabled)] cursor-not-allowed';
              buttonText = 'Aktueller Plan';
              disabled = true;
            } else {
              buttonClasses +=
                'bg-[var(--button-1)] hover:bg-[var(--button-2)] text-[var(--button-text)]';
              buttonText = 'Wählen';
            }
          }

          return (
            <div
              key={idx}
              className="rounded-3xl shadow-xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-2)',
                border: '1px solid var(--card-border)',
              }}
            >
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--accent-1)' }}>
                {plan.name}
              </h2>
              <p className="text-2xl font-semibold mb-8">{plan.price}</p>

              <ul className="mb-8 space-y-4 text-lg">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 justify-center">
                    {f.included ? (
                      <FaCheckCircle className="text-[var(--success)] text-xl" />
                    ) : (
                      <FaTimesCircle className="text-[var(--error)] text-xl" />
                    )}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  !user && plan.name !== 'Free'
                    ? router.push('/login')
                    : handleCheckout(plan.priceId)
                }
                className={buttonClasses}
                disabled={disabled || loading}
              >
                {buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
