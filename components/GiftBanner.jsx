"use client";
import Link from "next/link";

export default function GiftBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 sm:p-6 md:p-8 shadow-sm">
        {/* Petit halo décoratif */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(16,185,129,0.35), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-emerald-900 text-sm font-medium">
              <span className="text-xl" aria-hidden>
                🎁
              </span>
              <span>Offrir un séjour</span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-semibold">
              Chèque cadeau — Les Chalets Ty-Koad
            </h3>
            <p className="mt-2 text-sm sm:text-[15px] text-stone-600">
              Choisissez le chalet (<strong>Duo spa</strong> ou{" "}
              <strong>2 chambres</strong>), le montant et les options (
              plateaux, champagne, pétales…).
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/cadeau"
              className="inline-flex w-full md:w-auto items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-50 transition"
            >
              Créer un cadeau
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
