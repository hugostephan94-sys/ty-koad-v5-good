import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import PhotoCarousel from "../../components/PhotoCarousel";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  title: {
    absolute: "Chalet avec spa privatif pour 2 en Finistère | Ty-Koad Duo",
  },

  description:
    "Profitez d’un chalet avec spa privatif pour 2 à Laz, au cœur du Finistère. Jacuzzi privé, lit king size, jardin et séjour détente en Bretagne.",

  alternates: {
    canonical: `${SITE_URL}/spa`,
  },

  openGraph: {
    title: "Chalet avec spa privatif pour 2 en Finistère | Ty-Koad Duo",
    description:
      "Une parenthèse à deux en Bretagne avec spa privatif, lit king size et jardin au cœur du Finistère.",
    url: `${SITE_URL}/spa`,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/chalets/c2/8.jpg`,
        width: 1200,
        height: 630,
        alt: "Spa privatif du chalet Ty-Koad Duo en Finistère",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chalet avec spa privatif pour 2 en Finistère | Ty-Koad Duo",
    description:
      "Spa privatif, lit king size et séjour détente à deux au cœur du Finistère.",
    images: [`${SITE_URL}/images/chalets/c2/8.jpg`],
  },
};

export default function SpaPage() {
  const spaImages = [7, 8, 9, 18, 20].map((n) => ({
    src: `/images/chalets/c2/${n}.jpg`,
    alt: `Spa privatif du chalet Ty-Koad Duo en Finistère — photo ${n}`,
  }));

  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        {/* HERO */}
        <section className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
            Ty-Koad Duo · Laz · Finistère
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
            Chalet avec spa privatif pour 2 en Finistère
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
            Au <span className="font-medium">Ty-Koad Duo</span>, profitez
            d’un <strong>spa entièrement privatif</strong> accessible
            directement depuis votre chalet. Une parenthèse idéale à deux
            pour se détendre au calme, au cœur du Centre Finistère.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-600">
            <span className="rounded-full bg-white border border-stone-200 px-3 py-1.5">
              ✓ Spa privatif
            </span>

            <span className="rounded-full bg-white border border-stone-200 px-3 py-1.5">
              ✓ 2 personnes
            </span>

            <span className="rounded-full bg-white border border-stone-200 px-3 py-1.5">
              ✓ Lit king size
            </span>

            <span className="rounded-full bg-white border border-stone-200 px-3 py-1.5">
              ✓ Linge & serviettes inclus
            </span>

            <span className="rounded-full bg-white border border-stone-200 px-3 py-1.5">
              ✓ Peignoirs fournis
            </span>

            <span className="rounded-full bg-white border border-stone-200 px-3 py-1.5">
              ✓ Jardin privatif
            </span>
          </div>
        </section>

        {/* CARTE SPA */}
        <section className="mt-8 sm:mt-10 max-w-4xl mx-auto px-4">
          <article className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <PhotoCarousel
              images={spaImages}
              heightClass="h-56 sm:h-64 md:h-72"
            />

            <div className="p-5 sm:p-6 md:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-stone-900">
                    Votre bulle de détente
                  </h2>

                  <p className="mt-2 text-sm text-stone-600">
                    Un espace pensé pour profiter pleinement d’un moment
                    de calme à deux.
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-2">
                  <div className="text-[11px] uppercase tracking-wide text-emerald-800">
                    À partir de
                  </div>

                  <div className="text-xl font-bold text-emerald-950">
                    110 €
                    <span className="text-xs font-normal text-emerald-800">
                      {" "}
                      / nuit
                    </span>
                  </div>
                </div>
              </div>

              <ul className="mt-5 text-sm text-stone-700 space-y-2">
                <li>
                  ✓ <strong>Jets massants</strong> pour relâcher les tensions
                </li>

                <li>
                  ✓ <strong>Lumières d’ambiance</strong> pour profiter du spa
                  en soirée
                </li>

                <li>
                  ✓ <strong>Peignoirs fournis</strong> pour profiter
                  confortablement de votre espace spa
                </li>

                <li>
                  ✓ <strong>Usage entièrement privatif</strong> pendant votre
                  séjour
                </li>

                <li>✓ Accès rapide depuis le chalet</li>
                <li>✓ Petit jardin privatif attenant</li>
              </ul>

              {/* EXPÉRIENCE */}
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="text-xl" aria-hidden="true">
                    ♨️
                  </div>

                  <div className="mt-2 font-medium text-sm text-stone-900">
                    Totalement privatif
                  </div>

                  <div className="mt-1 text-xs text-stone-600">
                    Le spa est uniquement réservé aux occupants du Duo.
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="text-xl" aria-hidden="true">
                    🧖
                  </div>

                  <div className="mt-2 font-medium text-sm text-stone-900">
                    Peignoirs fournis
                  </div>

                  <div className="mt-1 text-xs text-stone-600">
                    Des peignoirs sont à votre disposition pour profiter
                    pleinement du spa.
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="text-xl" aria-hidden="true">
                    ❤️
                  </div>

                  <div className="mt-2 font-medium text-sm text-stone-900">
                    Idéal pour deux
                  </div>

                  <div className="mt-1 text-xs text-stone-600">
                    Une escapade romantique au cœur de la Bretagne.
                  </div>
                </div>
              </div>

              {/* LINGE INCLUS */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm">
                <div className="font-semibold text-emerald-950">
                  🧺 Voyagez léger, tout est prévu
                </div>

                <ul className="mt-2 text-emerald-950/80 space-y-1.5">
                  <li>✓ Lit king size préparé à votre arrivée</li>
                  <li>✓ Linge de lit fourni</li>
                  <li>✓ Serviettes de toilette fournies</li>
                  <li>✓ Peignoirs fournis pour le spa</li>
                </ul>
              </div>

              {/* BON À SAVOIR */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-sm">
                <div className="font-semibold text-stone-900">
                  Bon à savoir
                </div>

                <ul className="mt-2 text-stone-700 space-y-1.5">
                  <li>✓ Douche obligatoire avant d’utiliser le spa</li>
                  <li>✓ Pas de verre dans l’espace spa pour votre sécurité</li>
                  <li>✓ Respect du voisinage et du matériel</li>
                  <li>✓ Spa réservé aux occupants du Ty-Koad Duo</li>
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-6 rounded-2xl bg-emerald-950 text-white p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-emerald-200">
                      Votre séjour à deux
                    </div>

                    <div className="mt-1 text-lg sm:text-xl font-bold">
                      Envie d’une nuit avec spa privatif ?
                    </div>

                    <p className="mt-1 text-sm text-emerald-50/90">
                      Consultez directement les prochaines dates disponibles.
                    </p>
                  </div>

                  <Link
                    href="/reserver?tab=C2"
                    className="shrink-0 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 text-sm sm:text-base font-semibold shadow-sm transition"
                  >
                    Voir les disponibilités
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* LIEN INFOS */}
        <section className="max-w-3xl mx-auto px-4 mt-8 text-center">
          <p className="text-sm text-stone-600">
            Une question concernant le spa, l’arrivée ou la caution ?
          </p>

          <Link
            href="/infos-pratiques"
            className="mt-2 inline-flex text-sm font-medium text-emerald-800 hover:text-emerald-950 transition"
          >
            Consulter les informations pratiques →
          </Link>
        </section>
      </main>
    </>
  );
}
