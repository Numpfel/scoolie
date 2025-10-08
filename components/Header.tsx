'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<'free' | 'basic' | 'pro' | null>(null);

  const resourcesTimeout = useRef<NodeJS.Timeout | null>(null);
  const accountTimeout = useRef<NodeJS.Timeout | null>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        supabase
          .from('profiles')
          .select('subscription')
          .eq('id', currentUser.id)
          .single()
          .then(({ data }) => {
            if (data?.subscription) setSubscription(data.subscription);
          });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        supabase
          .from('profiles')
          .select('subscription')
          .eq('id', currentUser.id)
          .single()
          .then(({ data }) => {
            if (data?.subscription) setSubscription(data.subscription);
          });
      } else {
        setSubscription(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleCheckout = async (plan: 'basic' | 'pro') => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const priceId =
      plan === 'basic'
        ? process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE!
        : process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE!;

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, priceId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert('Fehler beim Erstellen der Checkout-Session');
  };

  const linkClass = (path: string) =>
    pathname === path ? 'font-semibold text-accent' : 'hover:text-accent transition-colors';

  const handleMouseEnter = (type: 'resources' | 'account') => {
    if (type === 'resources') {
      setAccountOpen(false);
      if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
      setResourcesOpen(true);
    } else {
      setResourcesOpen(false);
      if (accountTimeout.current) clearTimeout(accountTimeout.current);
      setAccountOpen(true);
    }
  };

  const handleMouseLeave = (type: 'resources' | 'account') => {
    const timeout = setTimeout(() => {
      if (type === 'resources') setResourcesOpen(false);
      else setAccountOpen(false);
    }, 2000);
    if (type === 'resources') resourcesTimeout.current = timeout;
    else accountTimeout.current = timeout;
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-sm border-b border-[var(--btn-1)] bg-[var(--btn-1)] text-white"
      style={{
        backdropFilter: 'blur(6px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold"
          style={{ color: 'white' }}
        >
          Scoolie
        </Link>

        {/* Upgrade Banner */}
        {user && subscription && subscription !== 'pro' && (
          <div
            style={{
              backgroundColor: 'var(--accent-2)',
              color: 'white',
            }}
            className="absolute right-0 top-3 px-4 py-2 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition"
            onClick={() => {
              if (subscription === 'free') handleCheckout('basic');
              else if (subscription === 'basic') handleCheckout('pro');
            }}
          >
            Upgrade auf {subscription === 'free' ? 'Basic' : 'Pro'}
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center text-[var(--text-1)]">
          <Link href="/" className={linkClass('/')}>Home</Link>

          {user && subscription && (
            <Link
              href={
                subscription === 'free'
                  ? '/chat/free'
                  : subscription === 'basic'
                  ? '/chat/basic'
                  : '/chat/pro'
              }
              className={linkClass('/chat')}
            >
              KI-Chat
            </Link>
          )}

          <Link href="/features" className={linkClass('/features')}>Features</Link>
          <Link href="/preise" className={linkClass('/preise')}>Preise</Link>
          <Link href="#kontakt" className={linkClass('#kontakt')}>Kontakt</Link>

          {/* Ressourcen Dropdown */}
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={() => handleMouseLeave('resources')}
          >
            <button className="flex items-center gap-1 hover:text-accent">
              Ressourcen ▼
            </button>
            {resourcesOpen && (
              <div className="dropdown absolute left-0 mt-2 w-40 p-2">
                <Link href="/blog">Blog</Link>
                <Link href="/tutorials">Tutorials</Link>
                <Link href="/faq">FAQ</Link>
              </div>
            )}
          </div>

          {/* Konto Dropdown */}
          <div
            ref={accountRef}
            className="relative"
            onMouseEnter={() => handleMouseEnter('account')}
            onMouseLeave={() => handleMouseLeave('account')}
          >
            <button className="text-2xl flex items-center hover:text-accent">
              <FaUserCircle />
            </button>
            {accountOpen && (
              <div className="dropdown absolute right-0 mt-2 w-48 p-4 flex flex-col gap-2">
                {!user ? (
                  <>
                    <Link href="/signup" className="btn btn-primary text-center">Registrieren</Link>
                    <Link href="/login" className="btn btn-neutral text-center">Anmelden</Link>
                  </>
                ) : (
                  <>
                    <Link href="/konto/profil">Profil</Link>
                    <Link href="/konto/einstellungen">Einstellungen</Link>
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setUser(null);
                        setSubscription(null);
                      }}
                      className="text-red-500 hover:text-red-400 text-left px-4 py-2"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden py-2 flex flex-col bg-[var(--bg-2)] text-[var(--text-1)] border-t border-[var(--bg-4)]">
          <Link href="/" className="block px-4 py-2">Home</Link>
          {user && subscription && (
            <Link
              href={
                subscription === 'free'
                  ? '/chat/free'
                  : subscription === 'basic'
                  ? '/chat/basic'
                  : '/chat/pro'
              }
              className="block px-4 py-2"
            >
              KI-Chat
            </Link>
          )}
          <Link href="/features" className="block px-4 py-2">Features</Link>
          <Link href="/preise" className="block px-4 py-2">Preise</Link>
          <Link href="#kontakt" className="block px-4 py-2">Kontakt</Link>
        </nav>
      )}
    </header>
  );
}
