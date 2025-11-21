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
    <section className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 md:pt-10">
      <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
        {/* Image optimisée Next.js */}
        <div className="relative h-[260px] sm:h-[320px] md:h-[420px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
          />
        </div>

        {/* Dégradés au-dessus de l'image */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

        {/* Carte en verre */}
        <div className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 md:left-6 md:right-auto md:top-6 max-w-md md:max-w-xl">
          <div className="backdrop-blur-sm bg-black/25 md:bg-black/20 border border-white/20 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 md:p-6 text-white shadow-2xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-[12px] font-medium bg-emerald-400/20 border border-emerald-300/40">
                Spa privatif
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-[12px] font-medium bg-white/15 border border-white/25">
                Laz · Finistère
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-[12px] font-medium bg-white/15 border border-white/25">
                Lit king 180×200
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold leading-snug md:leading-tight">
              Escapade à Laz — chalets cosy &{" "}
              <span className="text-emerald-300">spa privatif</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-stone-100/90 max-w-md">
              Deux chalets tout équipés au calme, à 5 minutes du{" "}
              <span className="font-medium">château de Trévarez</span> :
              parfait pour une parenthèse à deux ou en famille.
            </p>

            {/* Boutons */}
            <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              {onReserveClick ? (
                <button
                  onClick={onReserveClick}
                  className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Réserver en direct
                </button>
              ) : (
                <Link
                  href="/reserver"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Réserver en direct
                </Link>
              )}

              {onDiscoverClick ? (
                <button
                  onClick={onDiscoverClick}
                  className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-white/90 text-stone-900 hover:bg-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Découvrir les alentours
                </button>
              ) : (
                <Link
                  href="/autour"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-white/90 text-stone-900 hover:bg-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Découvrir les alentours
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
