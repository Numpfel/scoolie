import Link from 'next/link';
import { FaInstagram, FaTiktok, FaSnapchat } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950/90 backdrop-blur-sm shadow-inner mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-gray-300">
        
        {/* Rechtliches */}
        <div className="flex gap-4 mb-4 md:mb-0 text-sm">
          <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
          <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz & Sicherheit</Link>
          <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <Link href="https://instagram.com" target="_blank" className="hover:text-blue-300"><FaInstagram /></Link>
          <Link href="https://tiktok.com" target="_blank" className="hover:text-blue-300"><FaTiktok /></Link>
          <Link href="https://snapchat.com" target="_blank" className="hover:text-blue-300"><FaSnapchat /></Link>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs py-2 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Scoolie UG (haftungsbeschränkt). Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
