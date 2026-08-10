import SiteHeader from "../../components/SiteHeader";
import ContactClient from "../../components/ContactClient";

const SITE_URL = "https://chalets-tykoad.fr";

export const metadata = {
  title: "Contact & réservation | Chalets Ty-Koad à Laz",

  description:
    "Contactez les Chalets Ty-Koad à Laz dans le Finistère pour une question sur votre séjour, une réservation, un chèque cadeau ou nos options gourmandes.",

  alternates: {
    canonical: `${SITE_URL}/contact`,
  },

  openGraph: {
    title: "Contact | Chalets Ty-Koad",
    description:
      "Une question sur votre séjour aux Chalets Ty-Koad ? Contactez-nous directement pour une réservation, un chèque cadeau ou une demande particulière.",
    url: `${SITE_URL}/contact`,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/og-tykoad.png`,
        width: 1200,
        height: 630,
        alt: "Chalets Ty-Koad à Laz dans le Finistère",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact | Chalets Ty-Koad",
    description:
      "Contactez-nous pour préparer votre séjour aux Chalets Ty-Koad en Centre Finistère.",
    images: [`${SITE_URL}/images/og-tykoad.png`],
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-5xl mx-auto px-4">
          {/* HERO */}
          <header className="max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              Une question ? Nous sommes disponibles
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Contactez les Chalets Ty-Koad
            </h1>

            <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
              Une question sur une réservation, nos chalets, le spa privatif,
              un chèque cadeau ou les options gourmandes ? Envoyez-nous votre
              demande et nous vous répondrons rapidement.
            </p>
          </header>

          {/* PETITS ÉLÉMENTS DE RÉASSURANCE */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">✉️</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Réponse rapide
              </div>
              <div className="mt-1 text-xs text-stone-500">
                Généralement sous 24h
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">📞</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Par téléphone
              </div>
              <div className="mt-1 text-xs text-stone-500">
                Contact direct
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">🔑</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Réservation directe
              </div>
              <div className="mt-1 text-xs text-stone-500">
                Sur notre site
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">📍</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Laz
              </div>
              <div className="mt-1 text-xs text-stone-500">
                Centre Finistère
              </div>
            </div>
          </div>

          {/* FORMULAIRE CLIENT */}
          <div className="mt-8">
            <ContactClient />
          </div>
        </section>
      </main>
    </>
  );
}
