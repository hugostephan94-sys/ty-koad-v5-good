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
        {/* Image héro */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1600}
          height={900}
          className="block w-full h-64 sm:h-72 md:h-auto object-cover"
          priority
        />

        {/* Dégradés global */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/35 via-black/20 to-transparent" />

        {/* --- VERSION MOBILE : petit bandeau en bas de la photo --- */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:hidden">
          <div className="backdrop-blur-sm bg-black/45 rounded-2xl px-4 py-3 text-white text-sm shadow-lg">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-400/30 border border-emerald-300/50">
                Spa privatif
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 border border-white/20">
                Laz · Finistère
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 border border-white/20">
                Lit king 180×200
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-semibold leading-snug">
              Escapade à Laz — chalets cosy &{" "}
              <span className="text-emerald-300">spa privatif</span>
            </h1>

            <div className="mt-3 flex flex-wrap gap-2">
              {onReserveClick ? (
                <button
                  onClick={onReserveClick}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium"
                >
                  Réserver en direct
                </button>
              ) : (
                <Link
                  href="/reserver"
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium"
                >
                  Réserver en direct
                </Link>
              )}

              {onDiscoverClick ? (
                <button
                  onClick={onDiscoverClick}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white/95 text-stone-900 text-sm font-medium"
                >
                  Découvrir
                </button>
              ) : (
                <Link
                  href="/autour"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white/95 text-stone-900 text-sm font-medium"
                >
                  Découvrir
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* --- VERSION DESKTOP : grande carte en verre par-dessus l’image --- */}
        <div className="hidden md:block absolute left-6 top-6 max-w-xl">
          <div className="backdrop-blur-sm bg-white/10 border border-white/15 rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-emerald-400/20 border border-emerald-300/40">
                Spa privatif
              </span>
              <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-white/15 border border-white/20">
                Laz · Finistère
              </span>
              <span className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-white/15 border border-white/20">
                Lit king 180×200
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
              Escapade à Laz — chalets cosy &{" "}
              <span className="text-emerald-300">spa privatif</span>
            </h1>

            <p className="mt-3 text-sm text-stone-100/90 max-w-lg">
              Deux chalets tout équipés au calme, à 5 minutes du château de
              Trévarez : parfait pour une parenthèse à deux ou en famille.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {onReserveClick ? (
                <button
                  onClick={onReserveClick}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm"
                >
                  Réserver en direct
                </button>
              ) : (
                <Link
                  href="/reserver"
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm"
                >
                  Réserver en direct
                </Link>
              )}

              {onDiscoverClick ? (
                <button
                  onClick={onDiscoverClick}
                  className="px-4 py-2.5 rounded-xl bg-white/95 text-stone-900 text-sm font-medium shadow-sm"
                >
                  Découvrir
                </button>
              ) : (
                <Link
                  href="/autour"
                  className="px-4 py-2.5 rounded-xl bg-white/95 text-stone-900 text-sm font-medium shadow-sm"
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
