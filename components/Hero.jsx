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
      <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
        {/* Image optimisée Next.js */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1600}         // taille de base (peut être ajustée)
          height={900}
          className="block w-full h-auto"
          priority             // image héro -> chargée en priorité
        />

        {/* Dégradés au-dessus de l'image */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/35 via-black/20 to-transparent" />

        {/* Carte en verre */}
        <div className="absolute left-4 right-4 top-4 md:left-6 md:top-6 max-w-xl">
          <div className="backdrop-blur-sm bg-white/10 border border-white/15 rounded-2xl p-5 md:p-6 text-white shadow-2xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-emerald-400/20 border border-emerald-300/30">
                Spa privatif
              </span>
              <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-white/15 border border-white/20">
                Laz · Finistère
              </span>
              <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-white/15 border border-white/20">
                King 180×200
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
              Escapade à Laz — chalets cosy &{" "}
              <span className="text-emerald-300">spa privatif</span>
            </h1>

            {/* Boutons */}
            <div className="mt-4 flex flex-wrap gap-3">
              {onReserveClick ? (
                <button
                  onClick={onReserveClick}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition shadow"
                >
                  Réserver en direct
                </button>
              ) : (
                <Link
                  href="/reserver"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition shadow"
                >
                  Réserver en direct
                </Link>
              )}

              {onDiscoverClick ? (
                <button
                  onClick={onDiscoverClick}
                  className="px-4 py-2 rounded-xl bg-white/90 text-stone-900 hover:bg-white transition shadow-sm"
                >
                  Découvrir
                </button>
              ) : (
                <Link
                  href="/autour"
                  className="px-4 py-2 rounded-xl bg-white/90 text-stone-900 hover:bg-white transition shadow-sm"
                >
                  Découvrir
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
