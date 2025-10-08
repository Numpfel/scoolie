'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-1)] text-[var(--text-1)] px-4">
      <div className="bg-[var(--background-2)] p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-[var(--accent-1)]">Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 rounded bg-[var(--background-3)] border border-[var(--border-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-[var(--accent-1)] hover:bg-[var(--accent-2)] p-2 rounded font-semibold transition-colors"
        >
          {loading ? 'Login...' : 'Login'}
        </button>

        <button
          onClick={() => router.push('/signup')}
          className="bg-[var(--background-3)] hover:bg-[var(--background-4)] p-2 rounded font-semibold transition-colors"
        >
          Zur Registrierung
        </button>
      </div>
    </div>
  );
}
