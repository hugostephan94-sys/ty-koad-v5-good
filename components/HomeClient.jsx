"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Hero from "./Hero";
import InspirationBlocks from "./InspirationBlocks";
import GiftBanner from "./GiftBanner";
import PhotoCarousel from "./PhotoCarousel";
import GuestReviews from "./GuestReviews";

export default function HomeClient() {
  const photosDuo = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/chalets/c2/${i + 1}.jpg`,
    alt: `Ty-Koad Duo avec spa privatif — photo ${i + 1}`,
  }));

  const photosC1 = Array.from({ length: 9 }, (_, i) => ({
    src: `/images/chalets/c1/${i + 1}.jpg`,
    alt: `Ty-Koad 2 chambres à Laz — photo ${i + 1}`,
  }));

  // FAQ
  const faq = [
    {
      question: "Le spa est-il vraiment privatif ?",
      answer:
        "Oui. Le spa du Ty-Koad Duo est entièrement privatif et réservé aux occupants du chalet pendant toute la durée du séjour.",
    },
    {
      question: "Comment se passe l’arrivée ?",
      answer:
        "L’arrivée est autonome grâce à une boîte à clé. Les informations nécessaires pour accéder au chalet vous sont communiquées avant votre séjour.",
    },
    {
      question: "La caution est-elle débitée ?",
      answer:
        "Non. Il s’agit d’une empreinte bancaire et non d’un débit immédiat. Un lien vous est envoyé avant votre arrivée afin de valider la caution.",
    },
    {
      question: "Les animaux sont-ils acceptés ?",
      answer:
        "Oui, les animaux propres et respectueux des lieux sont acceptés. Pour des raisons d’hygiène et de sécurité, ils ne doivent pas accéder au spa.",
    },
    {
      question: "Peut-on commander un petit-déjeuner ?",
      answer:
        "Oui. Vous pouvez commander un petit-déjeuner en option. Il est déposé le matin directement sur la table de votre terrasse dans un sac hermétique.",
    },
    {
      question: "Y a-t-il Netflix et Internet ?",
      answer:
        "Oui. Les chalets disposent d’un accès Internet ainsi que d’une télévision avec Netflix et Molotov.",
    },
    {
      question: "Quelles sont les heures d’arrivée et de départ ?",
      answer:
        "L’arrivée est prévue à partir de 16h et le départ avant 11h. L’accès autonome par boîte à clé vous permet d’arriver tranquillement à l’heure qui vous convient après 16h.",
    },
    {
      question: "Pourquoi réserver directement sur votre site ?",
      answer:
        "Vous consultez directement nos disponibilités et nos tarifs, sans intermédiaire. Le paiement est sécurisé via Stripe et votre réservation est confirmée immédiatement.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-stone-50">
      <SiteHeader />

      <main className="pb-24 md:pb-16 space-y-8 md:space-y-12">
        {/* HERO */}
        <div className="animate-fade-in-up">
          <Hero onReserveClick={() => location.assign("/reserver")} />
        </div>

        {/* RÉASSURANCE RÉSERVATION DIRECTE */}
        <section className="max-w-6xl mx-auto px-4 -mt-3 md:-mt-5 relative z-10">
          <div className="bg-white border border-stone-200 shadow-sm rounded-2xl px-4 py-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg">✓</div>

                <div className="font-semibold text-sm text-stone-900">
                  Tarif en direct
                </div>

                <div className="text-xs text-stone-500 mt-0.5">
                  Sans intermédiaire
                </div>
              </div>

              <div>
                <div className="text-lg">🔒</div>

                <div className="font-semibold text-sm text-stone-900">
                  Paiement sécurisé
                </div>

                <div className="text-xs text-stone-500 mt-0.5">
                  Via Stripe
                </div>
              </div>

              <div>
                <div className="text-lg">🔑</div>

                <div className="font-semibold text-sm text-stone-900">
                  Arrivée autonome
                </div>

                <div className="text-xs text-stone-500 mt-0.5">
                  Boîte à clé
                </div>
              </div>

              <div>
                <div className="text-lg">🌿</div>

                <div className="font-semibold text-sm text-stone-900">
                  Au cœur du Finistère
                </div>

                <div className="text-xs text-stone-500 mt-0.5">
                  À Laz, en Bretagne
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PETITE INTRO */}
        <section className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
            Deux chalets, deux façons de profiter de la Bretagne
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-stone-900">
            Choisissez votre séjour aux Chalets Ty-Koad
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-600">
            Une escapade à deux avec spa privatif ou un chalet confortable
            avec deux chambres : réservez directement vos dates disponibles
            en quelques minutes.
          </p>
        </section>

        {/* SPA / AUTOUR / GOURMETS */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.12s" }}
        >
          <InspirationBlocks />
        </div>

        {/* CHÈQUE CADEAU */}
        <div
          className="mt-2 sm:mt-4 animate-fade-in-up"
          style={{ animationDelay: "0.22s" }}
        >
          <GiftBanner />
        </div>

        {/* AVIS GOOGLE / BOOKING / AIRBNB */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.26s" }}
        >
          <GuestReviews />
        </div>

        {/* LES DEUX CHALETS */}
        <section
          className="max-w-6xl mx-auto px-4 pt-2 sm:pt-4 md:pt-6 pb-6 md:pb-10 grid gap-8 md:grid-cols-2 items-start animate-fade-in-up"
          style={{ animationDelay: "0.32s" }}
        >
          {/* TY-KOAD DUO */}
          <article className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative">
              <PhotoCarousel
                images={photosDuo}
                heightClass="h-56 sm:h-64 md:h-80"
              />

              <div className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm">
                ❤️ Idéal pour 2
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-100 text-emerald-900">
                  Spa privatif
                </span>

                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-stone-100 text-stone-700">
                  2 personnes
                </span>
              </div>

              <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-stone-900">
                Ty-Koad Duo
              </h2>

              <p className="mt-1 text-sm text-stone-600">
                Votre parenthèse détente avec spa totalement privatif.
              </p>

              <ul className="mt-4 text-sm text-stone-600 space-y-2">
                <li>✓ Lit king size 180 × 200</li>
                <li>✓ Spa privatif avec jets et lumières</li>
                <li>✓ TV, Netflix et internet</li>
                <li>✓ Petit jardin privatif</li>
                <li>✓ Arrivée autonome</li>
              </ul>

              <div className="mt-5 pt-4 border-t border-stone-100">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-stone-500">
                      À partir de
                    </div>

                    <div className="text-2xl font-bold text-emerald-900">
                      110 €
                      <span className="text-sm font-normal text-stone-500">
                        {" "}
                        / nuit
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-xs text-stone-500">
                    110 € dim–jeu
                    <br />
                    130 € ven–sam
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href="/reserver?tab=C2"
                  className="inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-semibold shadow-sm transition"
                >
                  Voir les disponibilités
                </Link>
              </div>

              <p className="mt-2 text-center text-[11px] text-stone-500">
                Paiement sécurisé • Confirmation de réservation
              </p>
            </div>
          </article>

          {/* TY-KOAD 2 CHAMBRES */}
          <article className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative">
              <PhotoCarousel
                images={photosC1}
                heightClass="h-56 sm:h-64 md:h-80"
              />

              <div className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm">
                🏡 Séjour en famille
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-100 text-emerald-900">
                  2 chambres
                </span>

                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-stone-100 text-stone-700">
                  2 salles de bain
                </span>
              </div>

              <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-stone-900">
                Ty-Koad
              </h2>

              <p className="mt-1 text-sm text-stone-600">
                Un chalet confortable pour profiter de la Bretagne à
                plusieurs.
              </p>

              <ul className="mt-4 text-sm text-stone-600 space-y-2">
                <li>✓ 2 chambres et 2 salles de bain</li>
                <li>✓ Cuisine entièrement équipée</li>
                <li>✓ Salon cosy, TV et Netflix</li>
                <li>✓ Jardin privatif</li>
                <li>✓ Arrivée autonome</li>
              </ul>

              <div className="mt-5 pt-4 border-t border-stone-100">
                <div className="text-xs uppercase tracking-wide text-stone-500">
                  À partir de
                </div>

                <div className="text-2xl font-bold text-emerald-900">
                  70 €
                  <span className="text-sm font-normal text-stone-500">
                    {" "}
                    / nuit
                  </span>
                </div>

                <div className="text-xs text-stone-500 mt-1">
                  Séjour minimum : 2 nuits
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href="/reserver?tab=C1"
                  className="inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-semibold shadow-sm transition"
                >
                  Voir les disponibilités
                </Link>
              </div>

              <p className="mt-2 text-center text-[11px] text-stone-500">
                Paiement sécurisé • Confirmation de réservation
              </p>
            </div>
          </article>
        </section>

        {/* QUESTIONS FRÉQUENTES */}
        <section className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-7">
            <div className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
              Questions fréquentes
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900">
              Tout ce qu’il faut savoir avant de réserver
            </h2>

            <p className="mt-2 max-w-2xl mx-auto text-sm sm:text-base text-stone-600">
              Retrouvez les réponses aux questions les plus fréquentes
              concernant votre séjour aux Chalets Ty-Koad.
            </p>
          </div>

          <div className="space-y-3">
            {faq.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={item.question}
                  className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-stone-50 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm sm:text-base text-stone-900">
                      {item.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xl text-emerald-800 transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="pr-8 text-sm sm:text-base leading-relaxed text-stone-600">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/infos-pratiques"
              className="text-sm font-medium text-emerald-800 hover:text-emerald-950 transition"
            >
              Voir toutes les informations pratiques →
            </Link>
          </div>
        </section>

        {/* DERNIER APPEL À L'ACTION */}
        <section className="max-w-4xl mx-auto px-4">
          <div className="rounded-3xl bg-emerald-950 text-white px-6 py-8 sm:px-10 sm:py-10 text-center shadow-lg">
            <div className="text-xs sm:text-sm uppercase tracking-[0.18em] text-emerald-200">
              Votre séjour en Bretagne
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
              Une date en tête ?
            </h2>

            <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-emerald-50/90">
              Consultez directement le calendrier et découvrez les nuits
              encore disponibles.
            </p>

            <Link
              href="/reserver"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm sm:text-base font-semibold text-emerald-950 hover:bg-emerald-50 transition"
            >
              Consulter les disponibilités
            </Link>
          </div>
        </section>
      </main>

      {/* CTA FIXE SUR MOBILE */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-stone-200 bg-white/95 backdrop-blur px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <Link
          href="/reserver"
          className="flex w-full items-center justify-between rounded-xl bg-emerald-700 px-5 py-3 text-white"
        >
          <span className="font-semibold">
            Voir les disponibilités
          </span>

          <span className="text-sm">
            dès 70 € →
          </span>
        </Link>
      </div>
    </div>
  );
}
