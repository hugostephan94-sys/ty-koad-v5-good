"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero({
  onReserveClick,
  onDiscoverClick,
  imageSrc = "/images/chalets/c2/8.jpg",
  imageAlt = "Ty-Koad Duo — spa privatif",
}) {
  return (
    <section className="max-w-6xl mx-auto px-4">
      {/* PHOTO HERO */}
      <div className="relative overflow-hidden rounded-3xl shadow-sm">
        {/*
          Hauteur volontairement plus importante sur mobile.
          Le texte prend davantage de lignes sur petit écran.
        */}
        <div className="relative h-[570px] sm:h-[540px] md:h-[520px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />

          {/* Dégradé */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

          {/* Badge haut */}
          <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-auto z-10">
            <div className="inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] sm:text-sm font-semibold text-emerald-900 shadow-sm">
              Spa privatif · Centre Finistère
            </div>
          </div>

          {/* Texte sur la photo */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-10 text-white">
            <div className="max-w-3xl">
              <div className="text-[11px] sm:text-sm font-medium uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/80">
                Les Chalets Ty-Koad · Laz
              </div>

              <h1 className="mt-2 text-[30px] leading-[1.08] sm:text-4xl md:text-5xl font-bold">
                Une parenthèse en Bretagne,
                <span className="block text-emerald-200">
                  avec spa privatif
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
                Deux chalets au calme au cœur du Finistère : une escapade à
                deux avec spa privatif ou un séjour confortable en famille.
              </p>

              <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {onReserveClick ? (
                  <button
                    onClick={onReserveClick}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-950 shadow-md transition hover:bg-emerald-50 hover:-translate-y-0.5"
                  >
                    Voir les disponibilités
                  </button>
                ) : (
                  <Link
                    href="/reserver"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-950 shadow-md transition hover:bg-emerald-50 hover:-translate-y-0.5"
                  >
                    Voir les disponibilités
                  </Link>
                )}

                <div className="rounded-xl bg-black/30 backdrop-blur px-4 py-2.5 text-sm">
                  <span className="text-white/75">Dès </span>
                  <span className="font-bold text-white text-lg">
                    70 €
                  </span>
                  <span className="text-white/75"> / nuit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOC INFOS SOUS PHOTO */}
      <div className="mt-5 md:mt-6 grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-6 items-stretch">
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-900">
              Spa privatif
            </span>

            <span className="inline-flex items-center rounded-full bg-sky-100 border border-sky-200 px-2.5 py-1 text-xs font-medium text-sky-900">
              Laz · Finistère
            </span>

            <span className="inline-flex items-center rounded-full bg-stone-100 border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-700">
              Réservation directe
            </span>
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-stone-900">
            Deux chalets, selon votre façon de voyager
          </h2>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-stone-600">
            <span className="font-medium text-stone-900">
              Ty-Koad Duo
            </span>{" "}
            pour une escapade à deux avec spa privatif, lit king size et
            jardin.
            <br className="hidden sm:inline" />{" "}
            <span className="font-medium text-stone-900">
              Ty-Koad
            </span>{" "}
            avec 2 chambres et 2 salles de bain pour un séjour en famille ou
            entre amis.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {onReserveClick ? (
              <button
                onClick={onReserveClick}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-semibold shadow-sm transition"
              >
                Consulter le calendrier
              </button>
            ) : (
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-semibold shadow-sm transition"
              >
                Consulter le calendrier
              </Link>
            )}

            {onDiscoverClick ? (
              <button
                onClick={onDiscoverClick}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm sm:text-base font-medium hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Découvrir les alentours
              </button>
            ) : (
              <Link
                href="/autour"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm sm:text-base font-medium hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Découvrir les alentours
              </Link>
            )}
          </div>
        </div>

        {/* RÉASSURANCE */}
        <aside className="bg-emerald-950 rounded-3xl p-5 sm:p-6 text-white shadow-sm">
          <div className="text-sm font-semibold text-emerald-100">
            Réserver en direct
          </div>

          <div className="mt-1 text-xl font-bold">
            Simple, rapide et sécurisé
          </div>

          <ul className="mt-4 space-y-3 text-sm text-emerald-50">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Disponibilités visibles en temps réel</span>
            </li>

            <li className="flex gap-2">
              <span>✓</span>
              <span>Paiement sécurisé via Stripe</span>
            </li>

            <li className="flex gap-2">
              <span>✓</span>
              <span>Confirmation immédiate</span>
            </li>

            <li className="flex gap-2">
              <span>✓</span>
              <span>Arrivée autonome via boîte à clé</span>
            </li>

            <li className="flex gap-2">
              <span>✓</span>
              <span>À 5 min du château de Trévarez</span>
            </li>
          </ul>

          <div className="mt-5 pt-4 border-t border-white/15">
            <div className="text-xs text-emerald-200">
              Séjours à partir de
            </div>

            <div className="mt-1 text-2xl font-bold">
              70 €
              <span className="text-sm font-normal text-emerald-200">
                {" "}
                / nuit
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
