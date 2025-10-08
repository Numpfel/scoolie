export default function Features() {
  const features = [
    {
      title: 'Individuelle Lernempfehlungen',
      description: 'Basierend auf deinem Lernfortschritt und deiner Klassenstufe.',
    },
    {
      title: 'Übungsblätter & Zusammenfassungen',
      description: 'Erhalte automatisch passende Übungsaufgaben und Lernhilfen.',
    },
    {
      title: 'Klar strukturierte Lernübersicht',
      description: 'Behalte jederzeit den Überblick über behandelte Themen.',
    },
  ];

  return (
    <section
      id="features"
      className="py-20"
      style={{ backgroundColor: 'var(--color-bg-features)' }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          className="text-4xl font-bold mb-12"
          style={{ color: 'var(--color-primary)' }}
        >
          Warum Scoolie?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl transition"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                {f.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
