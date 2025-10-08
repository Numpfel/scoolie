'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [klassenstufe, setKlassenstufe] = useState('1');
  const [bundesland, setBundesland] = useState('Bayern');
  const [schulform, setSchulform] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bundeslaender = [
    'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
    'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
    'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          vorname,
          nachname,
          klassenstufe,
          bundesland,
          schulform,
          subscription: 'free', // Default Subscription
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-1)] text-[var(--text-1)] px-4">
      <form
        onSubmit={handleSignup}
        className="bg-[var(--background-2)] p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center text-[var(--accent-1)]">Registrieren</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Vorname"
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
          required
        />

        <input
          type="text"
          placeholder="Nachname"
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
          required
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
          required
        />

        <select
          value={klassenstufe}
          onChange={(e) => setKlassenstufe(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
          required
        >
          {Array.from({ length: 13 }, (_, i) => (
            <option key={i+1} value={(i+1).toString()}>{i+1}</option>
          ))}
        </select>

        <select
          value={bundesland}
          onChange={(e) => setBundesland(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
          required
        >
          {bundeslaender.map((bl) => (
            <option key={bl} value={bl}>{bl}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Schulform"
          value={schulform}
          onChange={(e) => setSchulform(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--accent-1)] hover:bg-[var(--accent-2)] p-2 rounded font-semibold transition-colors"
        >
          {loading ? 'Lädt...' : 'Registrieren'}
        </button>
      </form>
    </div>
  );
}
