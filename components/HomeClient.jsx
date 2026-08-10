"use client";

import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Hero from "./Hero";
import InspirationBlocks from "./InspirationBlocks";
import GiftBanner from "./GiftBanner";
import PhotoCarousel from "./PhotoCarousel";
import GoogleReviewsMini from "./GoogleReviewsMini";

export default function HomeClient() {
  const GOOGLE_REVIEWS_URL =
    "https://maps.app.goo.gl/EsmwduwA4htLuE2N8";

  const googleReviews = [
    {
      author: "Nadine Briec",
      text: "Nina et Hugo sont des hôtes très accueillants et très réactifs…",
    },
    {
      author: "Esther",
      text: "Super séjour aux chalets Ty Koad à Laz ! Nina et Hugo sont adorables, très…",
    },
  ];

  const photosDuo = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/chalets/c2/${i + 1}.jpg`,
    alt: `Ty-Koad Duo avec spa privatif — photo ${i + 1}`,
  }));

  const photosC1 = Array.from({ length: 9 }, (_, i) => ({
    src: `/images/chalets/c1/${i + 1}.jpg`,
    alt: `Ty-Koad 2 chambres à Laz — photo ${i + 1}`,
  }));

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

        {/* AVIS GOOGLE */}
        <section
          className="max-w-6xl mx-auto px-4 animate-fade-in-up"
          style={{ animationDelay: "0.26s" }}
        >
          <div className="flex justify-center">
            <div className="w-full max-w-xl">
              <GoogleReviewsMini
                rating={5.0}
                count={3}
                reviews={googleReviews}
                googleUrl={GOOGLE_REVIEWS_URL}
              />
            </div>
          </div>
        </section>

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
          <span className="font-semibold">Voir les disponibilités</span>

          <span className="text-sm">
            dès 70 € →
          </span>
        </Link>
      </div>
    </div>
  );
}
