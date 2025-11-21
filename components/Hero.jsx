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
    <section className="max-w-6xl mx-auto px-4 pt-6 md:pt-10">
      {/* BANNIÈRE PHOTO */}
      <div className="overflow-hidden rounded-3xl shadow-md border border-stone-200">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1600}
          height={900}
          className="block w-full h-56 sm:h-64 md:h-80 object-cover"
          priority
        />
      </div>

      {/* TEXTE + BOUTONS */}
      <div className="mt-5 md:mt-6 grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-6 items-center">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-emerald-900">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
              Spa privatif
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-200">
              Laz · Centre Finistère
            </span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Escapade à Laz dans nos chalets cosy{" "}
            <span className="text-emerald-800">& spa privatif</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-xl">
            Deux chalets tout équipés au calme, à 5 minutes du château de Trévarez :
            <br className="hidden sm:inline" />
            <span className="font-medium"> Ty-Koad Duo</span> avec spa privatif pour 2,
            et <span className="font-medium">Ty-Koad</span> (2 chambres / 2 SDB) pour venir
            en famille ou entre amis.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {onReserveClick ? (
              <button
                onClick={onReserveClick}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm"
              >
                Réserver en direct
              </button>
            ) : (
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm"
              >
                Réserver en direct
              </Link>
            )}

            {onDiscoverClick ? (
              <button
                onClick={onDiscoverClick}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm sm:text-base font-medium shadow-sm"
              >
                Découvrir les alentours
              </button>
            ) : (
              <Link
                href="/autour"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm sm:text-base font-medium shadow-sm"
              >
                Découvrir les alentours
              </Link>
            )}
          </div>
        </div>

        {/* Petit bloc “infos rapides” sur desktop, masqué sur mobile si tu veux épurer */}
        <div className="hidden md:block bg-white rounded-3xl border border-stone-200 p-4 text-sm text-stone-700 shadow-sm">
          <div className="font-semibold text-stone-900 mb-2">
            En un coup d’œil
          </div>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Ty-Koad Duo : spa privatif pour 2, lit 180×200, TV + Netflix</li>
            <li>Ty-Koad : 2 chambres, 2 salles d’eau avec WC, petit jardin</li>
            <li>Arrivée autonome via boîte à clé, animaux autorisés</li>
            <li>À 5 min du château de Trévarez, au cœur du Centre Finistère</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
