// app/agb/page.tsx
import React from 'react';

export default function AGB() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-[var(--text-1)] bg-[var(--background-1)]">
      <h1 className="text-4xl font-bold mb-6 text-[var(--accent-1)]">
        Allgemeine Geschäftsbedingungen (AGB)
      </h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--text-2)]">
        1. Geltungsbereich
      </h2>
      <p className="text-[var(--text-1)]">
        Diese AGB gelten für alle Verträge zwischen der Pfeiffer Consulting und unseren Nutzern.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--text-2)]">
        2. Vertragsabschluss
      </h2>
      <p>
        Der Vertrag kommt zustande, wenn der Nutzer unseren Dienst über die Website bucht oder sich registriert.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--text-2)]">
        3. Nutzung des Dienstes
      </h2>
      <p>
        Die Nutzung von Scoolie erfolgt ausschließlich für private oder schulische Zwecke. Eine kommerzielle
        Weitergabe ist untersagt.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--text-2)]">
        4. Preise & Zahlungsbedingungen
      </h2>
      <p>
        Preise sind auf unserer Website angegeben. Zahlungen erfolgen monatlich per Abonnement, sofern nicht anders
        vereinbart.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--text-2)]">
        5. Haftung
      </h2>
      <p>
        Wir haften nur für Schäden, die vorsätzlich oder grob fahrlässig verursacht wurden. Eine Haftung für
        mittelbare Schäden oder entgangenen Gewinn ist ausgeschlossen.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--text-2)]">
        6. Kündigung
      </h2>
      <p>
        Nutzer können kostenpflichtige Abonnements jederzeit mit einer Frist von 14 Tagen zum Monatsende kündigen.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--text-2)]">
        7. Änderungen der AGB
      </h2>
      <p>
        Wir behalten uns das Recht vor, die AGB jederzeit zu ändern. Änderungen werden auf der Website veröffentlicht.
      </p>

      <p className="mt-6 text-[var(--text-3)]">
        Bei Fragen wenden Sie sich bitte an <a href="mailto:info@scoolie.de" className="text-[var(--link-color)] underline hover:text-[var(--link-hover)]">info@scoolie.de</a>.
      </p>
    </section>
  );
}
