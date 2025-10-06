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
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Warum Scoolie?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
