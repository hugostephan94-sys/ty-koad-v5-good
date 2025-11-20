"use client";
import Link from "next/link";

export default function GiftBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-900 text-sm font-medium">
              <span className="text-xl" aria-hidden>🎁</span>
              <span>Offrir un séjour</span>
            </div>
            <h3 className="mt-1 text-xl md:text-2xl font-semibold">
              Chèque cadeau — Les Chalets Ty-Koad
            </h3>
            <p className="mt-1 text-stone-600 text-sm">
              Choisis le chalet (Duo spa ou 2 chambres), le montant et les options (plateaux, champagne, pétales…).
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/cadeau"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-900 text-white"
            >
              Créer un cadeau
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
