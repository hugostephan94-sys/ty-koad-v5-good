import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import CadeauClient from "../../components/CadeauClient";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  title: {
    absolute: "Chèque cadeau séjour & spa en Finistère | Chalets Ty-Koad",
  },

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
        url: `${SITE_URL}/images/chalets/c2/8.jpg`,
        width: 1200,
        height: 630,
        alt: "Chèque cadeau pour un séjour avec spa aux Chalets Ty-Koad",
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
    images: [`${SITE_URL}/images/chalets/c2/8.jpg`],
  },
};

export default function CadeauPage() {
  return (
    <>
      <SiteHeader />

      <main className="pb-14 md:pb-20">
        {/* ======================================================
            HERO
            ====================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white">
          <div className="max-w-6xl mx-auto px-4 pt-6 sm:pt-10 md:pt-14 pb-10 md:pb-14">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
              {/* TEXTE */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm">
                  <span>🎁</span>
                  Une expérience à offrir
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] text-stone-900">
                  Offrez une parenthèse
                  <span className="block text-emerald-900">
                    aux Chalets Ty-Koad
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-stone-600">
                  Une nuit à deux avec spa privatif, un séjour en famille ou
                  quelques attentions gourmandes : créez un{" "}
                  <strong className="font-semibold text-stone-900">
                    chèque cadeau personnalisé
                  </strong>{" "}
                  à offrir à ceux que vous aimez.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-white border border-stone-200 px-3 py-2 text-xs sm:text-sm text-stone-700 shadow-sm">
                    ✓ Chèque personnalisé
                  </span>

                  <span className="inline-flex items-center rounded-full bg-white border border-stone-200 px-3 py-2 text-xs sm:text-sm text-stone-700 shadow-sm">
                    ✓ PDF envoyé par e-mail
                  </span>

                  <span className="inline-flex items-center rounded-full bg-white border border-stone-200 px-3 py-2 text-xs sm:text-sm text-stone-700 shadow-sm">
                    ✓ Paiement sécurisé
                  </span>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#composer-cadeau"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-900 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    🎁 Créer mon chèque cadeau
                  </a>

                  <Link
                    href="/nuit"
                    className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm sm:text-base font-medium text-stone-800 transition hover:border-emerald-400 hover:text-emerald-950"
                  >
                    Découvrir les chalets
                  </Link>
                </div>
              </div>

              {/* VISUEL CADEAU */}
              <div className="relative">
                <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-xl">
                  <div
                    className="relative min-h-[390px] sm:min-h-[440px] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/images/chalets/c2/8.jpg')",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

                    <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
                      <div className="rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-emerald-950 shadow-sm">
                        Chalets Ty-Koad
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm backdrop-blur">
                        🎁
                      </div>
                    </div>

                    <div className="absolute left-5 right-5 bottom-5">
                      <div className="rounded-3xl border border-white/25 bg-white/15 p-5 sm:p-6 text-white backdrop-blur-md shadow-lg">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                          Chèque cadeau
                        </div>

                        <div className="mt-2 text-2xl sm:text-3xl font-bold">
                          Une escapade en Bretagne
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-white/85">
                          Séjour en chalet, spa privatif et petites attentions
                          à choisir selon vos envies.
                        </p>

                        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/20 pt-4">
                          <div>
                            <div className="text-[10px] uppercase tracking-wide text-white/60">
                              Pour
                            </div>
                            <div className="mt-0.5 text-sm font-medium">
                              Une personne qui compte
                            </div>
                          </div>

                          <div className="text-2xl">
                            ❤️
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            AVANTAGES
            ====================================================== */}
        <section className="max-w-6xl mx-auto px-4 mt-4 md:mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <GiftFeature
              icon="✍️"
              title="Personnalisé"
              text="Ajoutez le prénom et votre message"
            />

            <GiftFeature
              icon="📩"
              title="Reçu par e-mail"
              text="Un joli chèque cadeau au format PDF"
            />

            <GiftFeature
              icon="🔒"
              title="Paiement sécurisé"
              text="Règlement en ligne via Stripe"
            />

            <GiftFeature
              icon="🥂"
              title="À composer"
              text="Séjour et attentions gourmandes"
            />
          </div>
        </section>

        {/* ======================================================
            COMMENT ÇA MARCHE
            ====================================================== */}
        <section className="max-w-6xl mx-auto px-4 mt-12 sm:mt-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
              Simple & rapide
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900">
              Votre cadeau en 3 étapes
            </h2>

            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Vous choisissez l’expérience, vous la personnalisez et nous nous
              occupons du reste.
            </p>
          </div>

          <div className="mt-7 grid md:grid-cols-3 gap-4">
            <StepCard
              number="1"
              title="Choisissez le séjour"
              text="Sélectionnez le chalet et la formule que vous souhaitez offrir."
            />

            <StepCard
              number="2"
              title="Ajoutez vos attentions"
              text="Personnalisez le cadeau avec votre message et les options souhaitées."
            />

            <StepCard
              number="3"
              title="Recevez le chèque"
              text="Après paiement, le chèque cadeau est envoyé par e-mail au format PDF."
            />
          </div>
        </section>

        {/* ======================================================
            FORMULAIRE
            ====================================================== */}
        <section
          id="composer-cadeau"
          className="max-w-6xl mx-auto px-4 mt-14 sm:mt-16 scroll-mt-24"
        >
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
              🎁 À vous de jouer
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900">
              Composez votre chèque cadeau
            </h2>

            <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-stone-600">
              Choisissez le séjour, personnalisez votre cadeau et ajoutez les
              options qui feront plaisir à son bénéficiaire.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-emerald-100/40 via-transparent to-amber-100/40 blur-xl" />

            <div className="relative">
              <CadeauClient />
            </div>
          </div>
        </section>

        {/* ======================================================
            RÉASSURANCE
            ====================================================== */}
        <section className="max-w-5xl mx-auto px-4 mt-14 sm:mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-8 sm:px-9 sm:py-10 text-white shadow-xl">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-700/30 blur-3xl" />

            <div className="relative grid md:grid-cols-[1fr_auto] md:items-center gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Un cadeau différent
                </div>

                <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
                  Offrez des souvenirs plutôt qu’un objet
                </h2>

                <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-emerald-50/85">
                  Le bénéficiaire pourra profiter de son séjour aux Chalets
                  Ty-Koad selon les disponibilités, avec les attentions que
                  vous aurez choisies spécialement pour lui.
                </p>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 border border-white/10 text-4xl">
                🎁
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function GiftFeature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">
        {icon}
      </div>

      <div className="mt-3 text-sm sm:text-base font-semibold text-stone-900">
        {title}
      </div>

      <div className="mt-1 text-xs sm:text-sm leading-relaxed text-stone-500">
        {text}
      </div>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div className="relative rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-white shadow-sm">
        {number}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-stone-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        {text}
      </p>
    </div>
  );
}
