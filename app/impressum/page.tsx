import React from 'react';

export default function Impressum() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-blue-300">Impressum</h1>

      <p><strong>Angaben gemäß § 5 TMG:</strong></p>
      <p>
        Pfeiffer Consulting <br />
        Schottmüllerstr. 94<br />
        14167 Berlin<br />
        Deutschland
      </p>

      <p className="mt-4">
        <strong>Vertreten durch:</strong><br />
        Jonathan Pfeiffer, Geschäftsführer
      </p>

      <p className="mt-4">
        <strong>Kontakt:</strong><br />
        Telefon: 01234 567890<br />
        E-Mail: info@scoolie.de
      </p>

      

      <p className="mt-4">
        <strong>Umsatzsteuer-ID:</strong><br />
        Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE364624900
      </p>
    </section>
  );
}
