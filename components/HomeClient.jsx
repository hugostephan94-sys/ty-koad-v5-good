"use client";
import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Hero from "./Hero";
import InspirationBlocks from "./InspirationBlocks";
import GiftBanner from "./GiftBanner";
import PhotoCarousel from "./PhotoCarousel";

export default function HomeClient() {
  const photosDuo = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/chalets/c2/${i + 1}.jpg`,
    alt: `Ty-Koad Duo — photo ${i + 1}`,
  }));
  const photosC1 = Array.from({ length: 9 }, (_, i) => ({
    src: `/images/chalets/c1/${i + 1}.jpg`,
    alt: `Ty-Koad (2 chambres) — photo ${i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-stone-50">
      <SiteHeader />

      {/* petites “lumières” décoratives (soft) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-teal-200/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-stone-200/25 blur-3xl" />
      </div>

      <main className="relative pb-12 md:pb-16 space-y-10 md:space-y-14">
        {/* HERO */}
        <div className="animate-fade-in-up">
          <Hero onReserveClick={() => location.assign("/reserver")} />
        </div>

        {/* Mini ligne avis (pro + rassurant) */}
        <section
          className="max-w-6xl mx-auto px-4 animate-fade-in-up"
          style={{ animationDelay: "0.06s" }}
        >
          <div className="rounded-2xl border border-stone-200 bg-white/80 backdrop-blur px-4 py-3 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-stone-700">
              <span className="font-semibold text-stone-900">Séjour 100% détente</span>{" "}
              — spa privatif, arrivée autonome, jardin privatif 🌿
            </div>
            <div className="text-xs text-stone-500">
              ⭐⭐⭐⭐⭐ <span className="font-medium text-stone-700">Excellent</span> •
              <span className="ml-1">Réservation en direct = plus simple</span>
            </div>
          </div>
        </section>

        {/* Inspiration blocks */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
          <InspirationBlocks />
        </div>

        {/* RÉASSURANCE (pro, ultra utile commercialement) */}
        <section
          className="max-w-6xl mx-auto px-4 animate-fade-in-up"
          style={{ animationDelay: "0.18s" }}
        >
          <div className="rounded-3xl border border-stone-200 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                  Pourquoi réserver en direct ?
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  Une réservation claire, rapide, et sans mauvaise surprise.
                </p>
              </div>
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
              >
                Voir les disponibilités
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Paiement sécurisé",
                  desc: "Stripe 🔒 — vos données bancaires ne sont jamais stockées.",
                  icon: "🔒",
                },
                {
                  title: "Confirmation immédiate",
                  desc: "Email automatique + infos pratiques envoyées rapidement.",
                  icon: "✅",
                },
                {
                  title: "Arrivée autonome",
                  desc: "Boîte à clé : vous arrivez quand vous voulez (dès 16h).",
                  icon: "🗝️",
                },
                {
                  title: "Caution simple",
                  desc: "Empreinte bancaire 24h avant (aucun débit immédiat).",
                  icon: "💳",
                },
              ].map((x) => (
                <div
                  key={x.title}
                  className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <span className="text-lg">{x.icon}</span>
                    </div>
                    <div className="font-medium text-stone-900">{x.title}</div>
                  </div>
                  <div className="mt-2 text-sm text-stone-600">{x.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bandeau chèque-cadeau */}
        <div
          className="mt-2 sm:mt-4 mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.22s" }}
        >
          <GiftBanner />
        </div>

        {/* Titre section chalets */}
        <section
          className="max-w-6xl mx-auto px-4 animate-fade-in-up"
          style={{ animationDelay: "0.28s" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-stone-900">
                Choisissez votre chalet
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                Duo romantique avec spa ou version famille/amis avec 2 chambres.
              </p>
            </div>
            <Link
              href="/infos-pratiques"
              className="text-sm font-medium text-emerald-800 hover:text-emerald-900 underline"
            >
              Voir les infos pratiques
            </Link>
          </div>
        </section>

        {/* Les 2 chalets */}
        <section
          className="max-w-6xl mx-auto px-4 pb-6 md:pb-10 grid gap-8 md:grid-cols-2 items-start animate-fade-in-up"
          style={{ animationDelay: "0.32s" }}
        >
          {/* DUO */}
          <article className="group bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:border-emerald-200">
            <div className="relative">
              <PhotoCarousel images={photosDuo} heightClass="h-56 sm:h-64 md:h-80" />
              {/* voile élégant */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-100 text-emerald-900">
                  Spa privatif
                </div>
                <div className="text-xs text-stone-500">
                  110€ dim–jeu • 130€ ven–sam
                </div>
              </div>

              <h3 className="mt-2 text-lg sm:text-xl font-semibold text-stone-900">
                Ty-Koad Duo — spa privatif pour 2
              </h3>
              <ul className="mt-2 text-sm text-stone-600 list-disc list-inside space-y-1">
                <li>Lit 180 × 200 (king), grande TV + Netflix, internet</li>
                <li>Accès direct au spa (jets, lumières), petit jardin</li>
                <li>Ambiance cocooning, idéale pour se retrouver</li>
              </ul>

              <div className="mt-4 flex gap-3">
                <Link
                  href="/reserver?tab=C2"
                  className="inline-flex flex-1 items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Réserver le Duo
                </Link>
                <Link
                  href="/infos-pratiques"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm sm:text-base font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
                >
                  Infos
                </Link>
              </div>
            </div>
          </article>

          {/* C1 */}
          <article className="group bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:border-emerald-200">
            <div className="relative">
              <PhotoCarousel images={photosC1} heightClass="h-56 sm:h-64 md:h-80" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-stone-100 text-stone-800">
                  Famille / amis
                </div>
                <div className="text-xs text-stone-500">70€ / nuit • min 2 nuits</div>
              </div>

              <h3 className="mt-2 text-lg sm:text-xl font-semibold text-stone-900">
                Ty-Koad — 2 chambres, 2 SDB
              </h3>
              <ul className="mt-2 text-sm text-stone-600 list-disc list-inside space-y-1">
                <li>Cuisine équipée, salon cosy, TV + Netflix, internet</li>
                <li>2 chambres • 2 salles d’eau • WC privatifs</li>
                <li>Petit jardin, arrivée autonome</li>
              </ul>

              <div className="mt-4 flex gap-3">
                <Link
                  href="/reserver?tab=C1"
                  className="inline-flex flex-1 items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Réserver Ty-Koad
                </Link>
                <Link
                  href="/infos-pratiques"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm sm:text-base font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
                >
                  Infos
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
