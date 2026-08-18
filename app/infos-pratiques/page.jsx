import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import CommercialBand from "../../components/CommercialBand";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  title: "Infos pratiques séjour | Chalets Ty-Koad Finistère",

  description:
    "Préparez votre séjour aux Chalets Ty-Koad à Laz : arrivée autonome, linge et serviettes fournis, spa privatif, animaux, caution, ménage et options gourmandes.",

  alternates: {
    canonical: `${SITE_URL}/infos-pratiques`,
  },

  openGraph: {
    title: "Infos pratiques | Chalets Ty-Koad",
    description:
      "Toutes les informations utiles pour préparer votre séjour aux Chalets Ty-Koad : arrivée, linge fourni, spa, caution, animaux et options.",
    url: `${SITE_URL}/infos-pratiques`,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/og-tykoad.png`,
        width: 1200,
        height: 630,
        alt: "Chalets Ty-Koad à Laz en Finistère",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Infos pratiques | Chalets Ty-Koad",
    description:
      "Arrivée, linge fourni, spa, caution et informations utiles pour votre séjour.",
    images: [`${SITE_URL}/images/og-tykoad.png`],
  },
};

export default function InfosPratiquesPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-5xl mx-auto px-4 space-y-6 sm:space-y-8">
          {/* HERO */}
          <header>
            <div className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
              Préparer votre séjour
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Infos pratiques pour votre séjour aux Chalets Ty-Koad
            </h1>

            <p className="mt-3 text-sm sm:text-base text-stone-700 max-w-3xl leading-relaxed">
              Retrouvez ici toutes les informations utiles pour préparer
              sereinement votre arrivée : équipements, linge fourni, horaires,
              spa, caution, animaux, ménage et options disponibles pendant
              votre séjour.
            </p>

            <div className="mt-4">
              <CommercialBand compact />
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-sm transition"
              >
                Voir les disponibilités
              </Link>

              <Link
                href="/cgv"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Voir les CGV
              </Link>

              <Link
                href="/caution"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Infos caution
              </Link>
            </div>
          </header>

          {/* RÉSUMÉ EXPRESS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">🔑</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Arrivée autonome
              </div>
              <div className="mt-1 text-xs text-stone-500">
                À partir de 16h
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">🕚</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Départ
              </div>
              <div className="mt-1 text-xs text-stone-500">
                Avant 11h
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">🐾</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Animaux acceptés
              </div>
              <div className="mt-1 text-xs text-stone-500">
                Sous conditions
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl">💳</div>
              <div className="mt-2 text-sm font-semibold text-stone-900">
                Caution
              </div>
              <div className="mt-1 text-xs text-stone-500">
                Empreinte bancaire
              </div>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
            <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
              En option
            </div>

            <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
              Options gourmandes
            </h2>

            <p className="mt-2 text-sm text-stone-700 leading-relaxed">
              Envie de vous faire plaisir pendant votre séjour ? Petit
              déjeuner livré au chalet ou plateau gourmand : vous pouvez
              préparer vos options à l’avance.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://tally.so/r/npjkGB"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
              >
                Commander un petit-déjeuner
              </a>

              <a
                href="https://tally.so/r/w4WDWk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Voir les plateaux gourmands
              </a>

              <Link
                href="/cadeau"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Offrir un chèque cadeau
              </Link>
            </div>
          </div>

          {/* CARTES */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-start">
            {/* CONFORT */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Confort & équipements
              </h2>

              <ul className="mt-4 text-sm text-stone-700 space-y-2">
                <li>✓ Petit jardin privatif pour chaque chalet</li>

                <li>
                  ✓ <strong>Linge de lit fourni</strong> dans les deux chalets
                </li>

                <li>
                  ✓ <strong>Serviettes de toilette fournies</strong> dans les
                  deux chalets
                </li>

                <li>
                  ✓ Ty-Koad Duo : <strong>peignoirs fournis pour le spa</strong>
                </li>

                <li>
                  ✓ <strong>Animaux autorisés</strong> s’ils restent propres
                  et respectueux des lieux
                </li>

                <li>
                  ✓ Accès autonome via <strong>boîte à clé</strong>
                </li>

                <li>
                  ✓ Cuisine équipée : plaques, four, micro-ondes, vaisselle…
                </li>

                <li>✓ Cafetière filtre et machine à dosettes</li>

                <li>
                  ✓ TV avec <strong>Netflix</strong> et{" "}
                  <strong>Internet</strong>
                </li>

                <li>
                  ✓ Ty-Koad Duo :{" "}
                  <strong>lit 180 × 200 cm king size</strong>
                </li>

                <li>
                  ✓ Ty-Koad Duo : cuisine équipée +{" "}
                  <strong>cave à vin</strong>
                </li>

                <li>
                  ✓ Ty-Koad : <strong>2 chambres</strong> et{" "}
                  <strong>2 salles d’eau avec toilettes</strong>
                </li>
              </ul>
            </div>

            {/* ARRIVÉE */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Arrivée & départ
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                  <div className="text-xs text-emerald-800">
                    Arrivée
                  </div>

                  <div className="mt-1 text-2xl font-bold text-emerald-950">
                    16h
                  </div>
                </div>

                <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                  <div className="text-xs text-stone-600">
                    Départ
                  </div>

                  <div className="mt-1 text-2xl font-bold text-stone-900">
                    11h
                  </div>
                </div>
              </div>

              <ul className="mt-4 text-sm text-stone-700 space-y-2">
                <li>
                  ✓ Vous arrivez de façon autonome grâce à la boîte à clé.
                </li>

                <li>
                  ✓ Le code et les informations d’accès sont envoyés avant
                  votre arrivée.
                </li>

                <li>
                  ✓ Vous pouvez arriver tranquillement à l’heure qui vous
                  convient après 16h.
                </li>

                <li>
                  ✓ Merci de nous prévenir en cas d’arrivée très tardive ou
                  de difficulté le jour J.
                </li>
              </ul>
            </div>

            {/* RÈGLES */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Règles & ménage
              </h2>

              <ul className="mt-4 text-sm text-stone-700 space-y-2">
                <li>
                  ✓ <strong>Logements non-fumeurs</strong>
                </li>

                <li>
                  ✓ Les animaux ne doivent pas monter sur les lits ou les
                  canapés.
                </li>

                <li>
                  ✓ Avant votre départ, merci de ranger le chalet et de
                  laisser les lieux propres.
                </li>

                <li>✓ Faire la vaisselle</li>

                <li>✓ Vider les poubelles dans les conteneurs prévus</li>

                <li>
                  ✓ Ramasser les déjections des animaux dans le jardin
                </li>

                <li>
                  ✓ Fermer les fenêtres et éteindre lumières et appareils
                </li>
              </ul>

              <div className="mt-4 rounded-2xl bg-stone-50 border border-stone-200 p-4 text-xs sm:text-sm text-stone-600">
                Si le chalet est rendu très sale ou nécessite une remise en
                état inhabituelle, des frais supplémentaires pourront être
                facturés.
              </div>
            </div>

            {/* SPA */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  Spa privatif
                </h2>

                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-900">
                  Ty-Koad Duo
                </span>
              </div>

              <ul className="mt-4 text-sm text-stone-700 space-y-2">
                <li>
                  ✓ Spa réservé uniquement aux occupants du Ty-Koad Duo
                </li>

                <li>
                  ✓ <strong>Peignoirs fournis</strong> pour profiter du spa
                </li>

                <li>
                  ✓ <strong>Douche obligatoire</strong> avant chaque
                  utilisation
                </li>

                <li>
                  ✓ Pas de crème, huile, autobronzant ou maquillage récent
                </li>

                <li>
                  ✓ <strong>Aucun verre</strong> dans l’espace spa
                </li>

                <li>
                  ✓ Les enfants restent sous la responsabilité d’un adulte
                </li>

                <li>
                  ✓ Merci de respecter le calme du voisinage en soirée
                </li>
              </ul>

              <Link
                href="/spa"
                className="mt-5 inline-flex text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition"
              >
                Découvrir le spa privatif →
              </Link>
            </div>

            {/* CAUTION */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="inline-flex rounded-full bg-sky-50 border border-sky-100 px-3 py-1 text-xs font-medium text-sky-900">
                    Aucun débit immédiat
                  </div>

                  <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
                    Caution par empreinte bancaire
                  </h2>
                </div>

                <div className="text-xs text-stone-500 sm:text-right">
                  Sécurisée via paiement en ligne
                </div>
              </div>

              <div className="mt-4 grid gap-6 md:grid-cols-2 text-sm text-stone-700">
                <div className="space-y-3">
                  <p>
                    Une <strong>caution</strong> peut être demandée afin de
                    couvrir d’éventuelles dégradations, pertes ou frais de
                    remise en état.
                  </p>

                  <p>
                    Elle est réalisée sous forme d’{" "}
                    <strong>empreinte bancaire</strong> : aucune somme n’est
                    débitée immédiatement si tout est conforme.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="font-semibold text-stone-900 mb-3">
                    Montants
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span>Ty-Koad Duo</span>
                      <strong className="text-emerald-900">300 €</strong>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span>Ty-Koad</span>
                      <strong className="text-emerald-900">150 €</strong>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/caution"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
                    >
                      Détails caution
                    </Link>

                    <Link
                      href="/cgv"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
                    >
                      Voir les CGV
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="rounded-3xl bg-emerald-950 text-white px-6 py-8 sm:px-8 sm:py-9 shadow-lg">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-200">
              Prêt pour votre séjour ?
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
              Consultez les dates disponibles
            </h2>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-emerald-50/90">
              Choisissez votre chalet, vos dates et réservez directement en
              quelques minutes.
            </p>

            <Link
              href="/reserver"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-950 hover:bg-emerald-50 transition"
            >
              Voir les disponibilités
            </Link>
          </div>

          <p className="text-[11px] text-stone-500">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </section>
      </main>
    </>
  );
}
