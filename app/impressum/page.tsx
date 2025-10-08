import React from "react";

export default function ImpressumPage() {
  return (
    <section
      className="max-w-4xl mx-auto px-6 py-20 bg-[var(--background-1)] text-[var(--text-1)]"
    >
      <h1 className="text-5xl font-bold mb-8 text-[var(--accent-1)] text-center">
        Impressum
      </h1>

      <div className="bg-[var(--background-2)] shadow-md rounded-2xl p-10 space-y-6 leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-[var(--text-2)]">
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            <strong>Jonathan Pfeiffer</strong><br />
            Pfeiffer Consulting<br />
            Schottmüllerstraße 94<br />
            14167 Berlin
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-[var(--text-2)]">
            Kontakt
          </h2>
          <p>
            Telefon: +49 (0) 152 08685320<br />
            Telefax: +49 (0) 123 44 55 99<br />
            E-Mail:{" "}
            <a
              href="mailto:info@scoolie.de"
              className="text-[var(--accent-2)] hover:underline"
            >
              info@scoolie.de
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-[var(--text-2)]">
            Umsatzsteuer-ID
          </h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
            <br />
            <strong>DE999999999</strong>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-[var(--text-2)]">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <div className="pt-6 border-t border-[var(--border-light)] text-sm text-[var(--text-3)]">
          Quelle:{" "}
          <a
            href="https://www.e-recht24.de"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-2)] hover:underline"
          >
            e-recht24.de
          </a>
        </div>
      </div>
    </section>
  );
}
