import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Scoolie',
  description: 'KI-Nachhilfe für Schüler',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
        <Header /> {/* dynamischer aktiver Link */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
