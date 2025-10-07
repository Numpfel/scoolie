import React from 'react';

const testimonials = [
  { text: '„Scoolie macht das Lernen meiner Kinder viel strukturierter und einfacher.“', name: 'Maria H., Mutter' },
  { text: '„Als Lehrer spare ich täglich Zeit durch Scoolie.“', name: 'Herr S., Lehrer' },
  { text: '„Endlich ein Tool, das meine Lernplanung unterstützt.“', name: 'Max T., Lehrer' },
  { text: '„Mein Kind arbeitet motivierter, seit wir Scoolie nutzen.“', name: 'Anna L., Mutter' },
  { text: '„Sehr hilfreich, um den Lernstoff für die Prüfungen vorzubereiten.“', name: 'Lukas W., Schüler' },
  { text: '„Die Arbeitsblätter sind super hilfreich für die Oberstufe.“', name: 'Jonas K., Schüler' },
  { text: '„Sehr intuitiv und hilfreich – für mich als Lehrer eine große Entlastung.“', name: 'Frau B., Lehrerin' },
  { text: '„Ich sehe sofort, welche Themen als nächstes dran sind.“', name: 'Elena M., Mutter' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full py-24 bg-gray-950/80 backdrop-blur-sm flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-300">Scoolie – KI-Nachhilfe für Schüler</h1>
        <p className="text-xl mb-4 max-w-3xl text-gray-200">
          Scoolie analysiert, was im Unterricht passiert, und schlägt automatisch passende Lerninhalte und Arbeitsblätter vor – perfekt angepasst an Klassenstufe, Bundesland und Schulform.
        </p>
        <p className="text-gray-300 max-w-2xl">
          Hilft Lehrern, Schülern und Eltern, den Lernstoff effektiv zu strukturieren.
        </p>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-300">Was unsere Nutzer sagen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-gray-100">
                <p className="italic mb-4">{t.text}</p>
                <h3 className="font-bold">{t.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
