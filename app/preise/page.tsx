import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function PreisePage() {
  const plans = [
    { name: 'Free', price: '0 € / Monat', features: [
      { text: 'Feature 1', included: true },
      { text: 'Feature 2', included: true },
      { text: 'Feature 3', included: false },
      { text: 'Feature 4', included: false },
      { text: 'Feature 5', included: false },
      { text: 'Feature 6', included: false },
    ] },
    { name: 'Basic', price: '10 € / Monat', features: [
      { text: 'Feature 1', included: true },
      { text: 'Feature 2', included: true },
      { text: 'Feature 3', included: true },
      { text: 'Feature 4', included: true },
      { text: 'Feature 5', included: false },
      { text: 'Feature 6', included: false },
    ] },
    { name: 'Pro', price: '20 € / Monat', features: [
      { text: 'Feature 1', included: true },
      { text: 'Feature 2', included: true },
      { text: 'Feature 3', included: true },
      { text: 'Feature 4', included: true },
      { text: 'Feature 5', included: true },
      { text: 'Feature 6', included: true },
    ] },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-blue-300 text-center mb-12">Unsere Preise</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-gray-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">{plan.name}</h2>
            <p className="text-2xl font-semibold mb-8">{plan.price}</p>
            <ul className="mb-8 space-y-4 text-lg">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  {f.included ? <FaCheckCircle className="text-green-400 text-xl" /> : <FaTimesCircle className="text-red-500 text-xl" />}
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto bg-blue-500/90 hover:bg-blue-600 text-gray-900 font-bold py-3 px-10 rounded-xl text-lg shadow-md hover:shadow-lg transition-all duration-300">
              Wählen
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
