"use client";

import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Hero from "./Hero";
import InspirationBlocks from "./InspirationBlocks";
import GiftBanner from "./GiftBanner";
import PhotoCarousel from "./PhotoCarousel";
import GoogleReviewsMini from "./GoogleReviewsMini";

export default function HomeClient() {
  const photosDuo = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/chalets/c2/${i + 1}.jpg`,
    alt: `Ty-Koad Duo — photo ${i + 1}`,
  }));
  const photosC1 = Array.from({ length: 9 }, (_, i) => ({
    src: `/images/chalets/c1/${i + 1}.jpg`,
    alt: `Ty-Koad (2 chambres) — photo ${i + 1}`,
  }));

  const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/EsmwduwA4htLuE2N8";

  // ✅ extraits réels (raccourcis) + noms corrects
  const googleReviews = [
    {
      author: "Esther",
      text:
        "Super séjour aux chalets Ty Koad à Laz ! Nina et Hugo sont adorables, très…",
    },
    {
      author: "Nadine Briec",
      text:
        "Nina et Hugo sont des hôtes très accueillants et très réactifs…",
    },
    // Ajoute ici d’autres extraits réels si tu veux
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_500px_at_50%_0%,rgba(16,185,129,0.12),transparent_55%)]">
      <SiteHeader />

      <main className="pb-12 md:pb-16 space-y-8 md:space-y-12">
        {/* HERO + décor */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -top-16 -left-16 h-[340px] w-[340px] rounded-full bg-teal-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -top-10 -right-24 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="animate-fade-in-up">
            <Hero onReserveClick={() => location.assign("/reserver")} />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        {/* Inspiration */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
          <InspirationBlocks />
        </div>

        {/* 🔔 Bandeau chèque-cadeau */}
        <div
          className="mt-2 sm:mt-4 mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.22s" }}
        >
          <GiftBanner />
        </div>

        {/* ✅ Avis Google (juste sous carte cadeau) */}
        <section
          className="max-w-6xl mx-auto px-4 animate-fade-in-up"
          style={{ animationDelay: "0.26s" }}
        >
          <div className="max-w-xl">
            <GoogleReviewsMini
              rating={5.0}
              count={3}
              reviews={googleReviews}
              googleUrl={GOOGLE_REVIEWS_URL}
            />
          </div>
        </section>

        {/* Les 2 chalets avec carrousel + bouton “Réserver” */}
        <section
          className="max-w-6xl mx-auto px-4 pt-2 sm:pt-4 md:pt-6 pb-6 md:pb-10 grid gap-8 md:grid-cols-2 items-start animate-fade-in-up"
          style={{ animationDelay: "0.32s" }}
        >
          {/* Ty-Koad Duo */}
          <article className="relative bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_300px_at_50%_0%,rgba(16,185,129,0.10),transparent_60%)]" />

            <PhotoCarousel
              images={photosDuo}
              heightClass="h-56 sm:h-64 md:h-80"
            />
            <div className="relative p-5 sm:p-6">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-100 text-emerald-900">
                Spa privatif
              </div>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold">
                Ty-Koad Duo — spa privatif pour 2
              </h3>
              <ul className="mt-2 text-sm text-stone-600 list-disc list-inside space-y-1">
                <li>Lit 180 × 200 (king), grande TV + Netflix, internet</li>
                <li>Accès direct au spa (jets, lumières), petit jardin</li>
                <li>110 € (dim–jeu) • 130 € (ven–sam)</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/reserver?tab=C2"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Réserver
                </Link>
              </div>
            </div>
          </article>

          {/* Ty-Koad 2 chambres */}
          <article className="relative bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_300px_at_50%_0%,rgba(2,132,199,0.08),transparent_60%)]" />

            <PhotoCarousel
              images={photosC1}
              heightClass="h-56 sm:h-64 md:h-80"
            />
            <div className="relative p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold">
                Ty-Koad — 2 chambres, 2 SDB
              </h3>
              <ul className="mt-2 text-sm text-stone-600 list-disc list-inside space-y-1">
                <li>Cuisine équipée, salon cosy, TV + Netflix, internet</li>
                <li>Petit jardin, arrivée autonome</li>
                <li>70 € / nuit • min 2 nuits</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/reserver?tab=C1"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Réserver
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
