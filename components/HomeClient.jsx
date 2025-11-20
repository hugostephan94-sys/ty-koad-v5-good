"use client";
import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Hero from "./Hero";
import InspirationBlocks from "./InspirationBlocks";
import GiftBanner from "./GiftBanner";
import PhotoCarousel from "./PhotoCarousel";

export default function HomeClient() {
  // Génère automatiquement les listes d’images
  const photosDuo = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/chalets/c2/${i + 1}.jpg`,
    alt: `Ty-Koad Duo — photo ${i + 1}`,
  }));
  const photosC1 = Array.from({ length: 9 }, (_, i) => ({
    src: `/images/chalets/c1/${i + 1}.jpg`,
    alt: `Ty-Koad (2 chambres) — photo ${i + 1}`,
  }));

  return (
    <div>
      <SiteHeader />

      {/* Hero avec bouton principal */}
      <Hero onReserveClick={() => location.assign("/reserver")} />

      {/* 3 cartes : Spa / Autour / Gourmets */}
      <InspirationBlocks />

      {/* 🔔 Bandeau chèque-cadeau */}
      <div className="mt-4 mb-4">
        <GiftBanner />
      </div>

      {/* Les 2 chalets avec carrousel + bouton “Réserver” */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-start">
        {/* Ty-Koad Duo */}
        <article className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <PhotoCarousel images={photosDuo} heightClass="h-64 md:h-80" />
          <div className="p-5">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-900">
              Spa privatif
            </div>
            <h3 className="mt-2 text-xl font-semibold">Ty-Koad Duo — spa privatif pour 2</h3>
            <ul className="mt-2 text-sm text-stone-600 list-disc list-inside space-y-1">
              <li>Lit 180 × 200 (king), grande TV + Netflix, internet</li>
              <li>Accès direct au spa (jets, lumières), petit jardin</li>
              <li>130 € (dim-jeu) • 150 € (ven-sam) • caution 500 €</li>
            </ul>
            <div className="mt-4">
              <Link
                href="/reserver?tab=C2"
                className="inline-flex px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
              >
                Réserver
              </Link>
            </div>
          </div>
        </article>

        {/* Ty-Koad 2 chambres */}
        <article className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <PhotoCarousel images={photosC1} heightClass="h-64 md:h-80" />
          <div className="p-5">
            <h3 className="text-xl font-semibold">Ty-Koad — 2 chambres, 2 SDB</h3>
            <ul className="mt-2 text-sm text-stone-600 list-disc list-inside space-y-1">
              <li>Cuisine équipée, salon cosy, TV + Netflix, internet</li>
              <li>Petit jardin, arrivée autonome</li>
              <li>70 € / nuit • min 2 nuits • caution 150 €</li>
            </ul>
            <div className="mt-4">
              <Link
                href="/reserver?tab=C1"
                className="inline-flex px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
              >
                Réserver
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
