import SiteHeader from "../../components/SiteHeader";
import CadeauClient from "../../components/CadeauClient";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  title: "Chèque cadeau séjour & spa en Finistère | Chalets Ty-Koad",

  description:
    "Offrez un chèque cadeau aux Chalets Ty-Koad à Laz : nuit avec spa privatif, séjour en Bretagne, petit-déjeuner, champagne et options gourmandes.",

  alternates: {
    canonical: `${SITE_URL}/cadeau`,
  },

  openGraph: {
    title: "Offrez un séjour aux Chalets Ty-Koad",
    description:
      "Composez un chèque cadeau personnalisé : nuit avec spa privatif, séjour en chalet et options gourmandes en Centre Finistère.",
    url: `${SITE_URL}/cadeau`,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/og-tykoad.png`,
        width: 1200,
        height: 630,
        alt: "Chèque cadeau pour un séjour aux Chalets Ty-Koad",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chèque cadeau | Chalets Ty-Koad",
    description:
      "Offrez une nuit, un séjour avec spa privatif ou une expérience gourmande en Bretagne.",
    images: [`${SITE_URL}/images/og-tykoad.png`],
  },
};

export default function CadeauPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              🎁 Une expérience à offrir
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Offrez un séjour aux Chalets Ty-Koad
            </h1>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-700">
              Une nuit à deux avec spa privatif, un séjour en famille ou une
              expérience gourmande : composez votre{" "}
              <strong>chèque cadeau personnalisé</strong> en quelques minutes.
            </p>

            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
                <div className="text-xl">🎁</div>
                <div className="mt-2 text-sm font-semibold text-stone-900">
                  Personnalisé
                </div>
                <div className="mt-1 text-xs text-stone-500">
                  Avec votre message
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
                <div className="text-xl">📄</div>
                <div className="mt-2 text-sm font-semibold text-stone-900">
                  Format PDF
                </div>
                <div className="mt-1 text-xs text-stone-500">
                  Envoyé par e-mail
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
                <div className="text-xl">🔒</div>
                <div className="mt-2 text-sm font-semibold text-stone-900">
                  Paiement sécurisé
                </div>
                <div className="mt-1 text-xs text-stone-500">
                  Via Stripe
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
                <div className="text-xl">🥂</div>
                <div className="mt-2 text-sm font-semibold text-stone-900">
                  Options au choix
                </div>
                <div className="mt-1 text-xs text-stone-500">
                  Gourmandes & romantiques
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FORMULAIRE INTERACTIF */}
        <section className="max-w-6xl mx-auto px-4 mt-8 sm:mt-10">
          <CadeauClient />
        </section>

        {/* RÉASSURANCE FINALE */}
        <section className="max-w-4xl mx-auto px-4 mt-10">
          <div className="rounded-3xl bg-emerald-950 px-6 py-8 sm:px-8 sm:py-9 text-white shadow-lg">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-200">
              Un cadeau différent
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
              Offrez des souvenirs plutôt qu’un objet
            </h2>

            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-emerald-50/90">
              Le bénéficiaire pourra profiter de son séjour aux Chalets
              Ty-Koad selon les disponibilités, avec les options que vous
              aurez choisies pour lui.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
