export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Scoolie. Alle Rechte vorbehalten.</p>
        <div className="flex space-x-6">
          <a href="#impressum" className="hover:text-white">
            Impressum
          </a>
          <a href="#datenschutz" className="hover:text-white">
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
}
