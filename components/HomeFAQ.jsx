"use client";

import { useState } from "react";

const FAQ = [
  {
    question: "Le spa est-il vraiment privatif ?",
    answer:
      "Oui. Le spa du Ty-Koad Duo est entièrement privatif et réservé aux occupants du chalet pendant toute la durée du séjour.",
  },
  {
    question: "Comment se passe l’arrivée ?",
    answer:
      "L’arrivée est autonome grâce à une boîte à clé. Les informations d’accès vous sont envoyées avant votre séjour.",
  },
  {
    question: "La caution est-elle débitée ?",
    answer:
      "Non. Il s’agit d’une empreinte bancaire. Aucun débit n’est effectué si tout est conforme au départ.",
  },
  {
    question: "Les animaux sont-ils acceptés ?",
    answer:
      "Oui, les animaux propres et respectueux des lieux sont acceptés. Ils ne doivent pas accéder au spa.",
  },
  {
    question: "Peut-on commander un petit-déjeuner ?",
    answer:
      "Oui. Un petit-déjeuner peut être commandé en option et est déposé le matin directement sur la terrasse.",
  },
  {
    question: "Y a-t-il Netflix et Internet ?",
    answer:
      "Oui. Les chalets disposent d’une télévision avec Netflix et d’un accès Internet.",
  },
  {
    question: "Quelle est l’heure d’arrivée et de départ ?",
    answer:
      "L’arrivée est prévue à partir de 16h et le départ avant 11h, sauf accord particulier.",
  },
  {
    question: "Pourquoi réserver directement sur votre site ?",
    answer:
      "La réservation directe vous permet de consulter les disponibilités en temps réel, de payer de façon sécurisée via Stripe et d’échanger directement avec nous.",
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-6">
        <div className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
          Questions fréquentes
        </div>

        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900">
          Tout ce qu’il faut savoir avant de réserver
        </h2>

        <p className="mt-2 text-sm sm:text-base text-stone-600">
          Les réponses aux questions les plus fréquentes sur votre séjour aux Chalets Ty-Koad.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium text-stone-900">
                  {item.question}
                </span>

                <span className="text-xl text-emerald-800">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm sm:text-base text-stone-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
