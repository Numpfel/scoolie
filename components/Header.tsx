'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Scoolie
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#features" className="hover:text-blue-600">
            Features
          </Link>
          <Link href="#preise" className="hover:text-blue-600">
            Preise
          </Link>
          <Link href="#kontakt" className="hover:text-blue-600">
            Kontakt
          </Link>
        </nav>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md py-2">
          <Link href="#features" className="block px-4 py-2 hover:bg-gray-100">
            Features
          </Link>
          <Link href="#preise" className="block px-4 py-2 hover:bg-gray-100">
            Preise
          </Link>
          <Link href="#kontakt" className="block px-4 py-2 hover:bg-gray-100">
            Kontakt
          </Link>
        </nav>
      )}
    </header>
  );
}
