export default function Hero() {
  return (
    <section
      className="text-center py-24 px-6"
      style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}
    >
      <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>
        Lernen. Verstehen. Wachsen.
      </h1>
      <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        Scoolie hilft dir, mit KI-Unterstützung den Schulstoff besser zu verstehen – einfach erklärt und individuell angepasst.
      </p>
      <button
        className="px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        style={{
          backgroundColor: 'var(--color-button-bg)',
          color: 'var(--color-button-text)',
        }}
      >
        Jetzt kostenlos starten
      </button>
    </section>
  );
}
