'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const linkClass = (path: string) =>
    pathname === path
      ? 'text-yellow-400 font-semibold'
      : 'hover:text-blue-300 transition-colors';

  return (
    <header className="bg-gray-950/90 backdrop-blur-sm shadow-md sticky top-0 z-50 text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Scoolie
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className={linkClass('/')}>Home</Link>
          <Link href="/features" className={linkClass('/features')}>Features</Link>
          <Link href="/preise" className={linkClass('/preise')}>Preise</Link>
          <Link href="#kontakt" className={linkClass('#kontakt')}>Kontakt</Link>

          {/* Ressourcen Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="hover:text-blue-300 flex items-center gap-1"
            >
              Ressourcen ▼
            </button>
            {resourcesOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-gray-900/80 backdrop-blur-sm shadow-md rounded-md">
                <Link href="/blog" className="block px-4 py-2 hover:bg-gray-800/70">Blog</Link>
                <Link href="/tutorials" className="block px-4 py-2 hover:bg-gray-800/70">Tutorials</Link>
                <Link href="/faq" className="block px-4 py-2 hover:bg-gray-800/70">FAQ</Link>
              </div>
            )}
          </div>

          {/* Konto Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="text-2xl hover:text-blue-300 flex items-center"
            >
              <FaUserCircle />
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900/80 backdrop-blur-sm shadow-md rounded-md">
                <Link href="/konto/profil" className="block px-4 py-2 hover:bg-gray-800/70">Profil</Link>
                <Link href="/konto/einstellungen" className="block px-4 py-2 hover:bg-gray-800/70">Einstellungen</Link>
                <Link href="/logout" className="block px-4 py-2 hover:bg-gray-800/70">Logout</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-950/90 backdrop-blur-sm shadow-md py-2 flex flex-col">
          <Link href="/" className={linkClass('/') + ' block px-4 py-2'}>Home</Link>
          <Link href="/features" className={linkClass('/features') + ' block px-4 py-2'}>Features</Link>
          <Link href="/preise" className={linkClass('/preise') + ' block px-4 py-2'}>Preise</Link>
          <Link href="#kontakt" className={linkClass('#kontakt') + ' block px-4 py-2'}>Kontakt</Link>

          {/* Mobile Ressourcen */}
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="text-left px-4 py-2 hover:text-blue-300 flex justify-between items-center"
          >
            Ressourcen ▼
          </button>
          {resourcesOpen && (
            <div className="flex flex-col pl-6">
              <Link href="/blog" className="block px-4 py-2 hover:bg-gray-800/70">Blog</Link>
              <Link href="/tutorials" className="block px-4 py-2 hover:bg-gray-800/70">Tutorials</Link>
              <Link href="/faq" className="block px-4 py-2 hover:bg-gray-800/70">FAQ</Link>
            </div>
          )}

          {/* Mobile Konto */}
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className="text-left px-4 py-2 hover:text-blue-300 flex justify-between items-center"
          >
            Konto ▼
          </button>
          {accountOpen && (
            <div className="flex flex-col pl-6">
              <Link href="/konto/profil" className="block px-4 py-2 hover:bg-gray-800/70">Profil</Link>
              <Link href="/konto/einstellungen" className="block px-4 py-2 hover:bg-gray-800/70">Einstellungen</Link>
              <Link href="/logout" className="block px-4 py-2 hover:bg-gray-800/70">Logout</Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
