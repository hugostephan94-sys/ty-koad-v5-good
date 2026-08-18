import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import PhotoCarousel from "../../components/PhotoCarousel";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  title: "Nos chalets à Laz en Finistère | Spa privatif & famille",

  description:
    "Découvrez les deux Chalets Ty-Koad à Laz : Ty-Koad Duo avec spa privatif pour 2 et Ty-Koad 2 chambres pour un séjour en famille ou entre amis.",

  alternates: {
    canonical: `${SITE_URL}/nuit`,
  },

  openGraph: {
    title: "Nos chalets en Centre Finistère | Chalets Ty-Koad",
    description:
      "Deux hébergements à Laz : une escapade à deux avec spa privatif ou un chalet 2 chambres pour profiter de la Bretagne en famille.",
    url: `${SITE_URL}/nuit`,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/chalets/c2/8.jpg`,
        width: 1200,
        height: 630,
        alt: "Ty-Koad Duo avec spa privatif en Finistère",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nos chalets à Laz | Chalets Ty-Koad",
    description:
      "Spa privatif pour deux ou chalet 2 chambres : choisissez votre séjour en Centre Finistère.",
    images: [`${SITE_URL}/images/chalets/c2/8.jpg`],
  },
};

export default function NuitPage() {
  const photosDuo = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/chalets/c2/${i + 1}.jpg`,
    alt: `Ty-Koad Duo avec spa privatif — photo ${i + 1}`,
  }));

  const photosC1 = Array.from({ length: 9 }, (_, i) => ({
    src: `/images/chalets/c1/${i + 1}.jpg`,
    alt: `Ty-Koad 2 chambres à Laz — photo ${i + 1}`,
  }));

  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              Deux chalets · Deux ambiances
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Nos chalets à Laz, au cœur du Finistère
            </h1>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-700">
              Choisissez votre façon de profiter de la Bretagne :{" "}
              <strong>Ty-Koad Duo</strong> pour une escapade à deux avec spa
              privatif, ou <strong>Ty-Koad</strong> avec 2 chambres et 2
              salles d’eau pour un séjour en famille ou entre amis.
            </p>
          </div>

          {/* CHOIX EXPRESS */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href="#duo"
              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5 transition hover:border-emerald-400"
            >
              <div className="text-xl">❤️</div>

              <div className="mt-2 font-semibold text-emerald-950">
                Vous venez à deux ?
              </div>

              <div className="mt-1 text-sm text-emerald-900/80">
                Découvrez le Duo et son spa privatif.
              </div>
            </a>

            <a
              href="#famille"
              className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 transition hover:border-emerald-300"
            >
              <div className="text-xl">🏡</div>

              <div className="mt-2 font-semibold text-stone-900">
                Vous venez à plusieurs ?
              </div>

              <div className="mt-1 text-sm text-stone-600">
                Découvrez Ty-Koad et ses deux chambres.
              </div>
            </a>
          </div>
        </section>

        {/* ======================================================
            TY-KOAD DUO
            ====================================================== */}
        <section
          id="duo"
          className="max-w-6xl mx-auto px-4 mt-10 sm:mt-12 scroll-mt-24"
        >
          <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              {/* PHOTO */}
              <div className="relative">
                <PhotoCarousel
                  images={photosDuo}
                  heightClass="h-64 sm:h-80 lg:h-full lg:min-h-[560px]"
                />

                <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur">
                  ❤️ Idéal pour 2
                </div>
              </div>

              {/* TEXTE */}
              <div className="p-5 sm:p-7 md:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-900">
                    Spa privatif
                  </span>

                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
                    2 personnes
                  </span>

                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
                    Dès 1 nuit
                  </span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-stone-900">
                  Ty-Koad Duo
                </h2>

                <p className="mt-2 text-sm sm:text-base leading-relaxed text-stone-600">
                  Une parenthèse pensée pour deux, avec un{" "}
                  <strong>spa entièrement privatif</strong>, un lit king size
                  et un petit jardin pour profiter pleinement de votre séjour.
                </p>

                {/* POINTS FORTS */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <Feature
                    icon="♨️"
                    title="Spa privatif"
                    text="Jets massants et lumières d’ambiance"
                  />

                  <Feature
                    icon="🛏️"
                    title="Lit king size"
                    text="Lit 180 × 200 cm"
                  />

                  <Feature
                    icon="🧺"
                    title="Linge & peignoirs inclus"
                    text="Lit préparé, serviettes de toilette et peignoirs pour le spa"
                  />

                  <Feature
                    icon="📺"
                    title="TV & streaming"
                    text="Netflix et connexion Internet"
                  />

                  <Feature
                    icon="🌿"
                    title="Petit jardin"
                    text="Un espace extérieur privatif"
                  />
                </div>

                {/* TARIF */}
                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-emerald-800">
                        À partir de
                      </div>

                      <div className="mt-1 text-3xl font-bold text-emerald-950">
                        110 €
                        <span className="text-sm font-normal text-emerald-800">
                          {" "}
                          / nuit
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-xs sm:text-sm text-emerald-900/80">
                      110 € dim–jeu
                      <br />
                      130 € ven–sam
                    </div>
                  </div>

                  <div className="mt-3 border-t border-emerald-200 pt-3 text-xs text-emerald-900/80">
                    Séjour minimum : 1 nuit
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/reserver?tab=C2"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    Voir les disponibilités
                  </Link>

                  <Link
                    href="/spa"
                    className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-emerald-400 hover:text-emerald-900"
                  >
                    Découvrir le spa
                  </Link>
                </div>

                <p className="mt-3 text-center text-[11px] text-stone-500">
                  Paiement sécurisé · Confirmation de réservation
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* ======================================================
            TY-KOAD FAMILLE
            ====================================================== */}
        <section
          id="famille"
          className="max-w-6xl mx-auto px-4 mt-10 sm:mt-12 scroll-mt-24"
        >
          <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              {/* TEXTE */}
              <div className="order-2 lg:order-1 p-5 sm:p-7 md:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-900">
                    2 chambres
                  </span>

                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
                    2 salles d’eau
                  </span>

                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
                    Dès 2 nuits
                  </span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-stone-900">
                  Ty-Koad
                </h2>

                <p className="mt-2 text-sm sm:text-base leading-relaxed text-stone-600">
                  Un chalet confortable pour séjourner à plusieurs, avec{" "}
                  <strong>deux chambres</strong> et une salle d’eau avec
                  toilettes pour chacune.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <Feature
                    icon="🛏️"
                    title="2 chambres"
                    text="1 lit double + 2 lits simples"
                  />

                  <Feature
                    icon="🚿"
                    title="2 salles d’eau"
                    text="Avec toilettes privatives"
                  />

                  <Feature
                    icon="🧺"
                    title="Linge fourni"
                    text="Lits préparés et serviettes de toilette incluses"
                  />

                  <Feature
                    icon="🍳"
                    title="Cuisine équipée"
                    text="Pour profiter du séjour en autonomie"
                  />

                  <Feature
                    icon="🌿"
                    title="Petit jardin"
                    text="Espace extérieur privatif"
                  />

                  <Feature
                    icon="📺"
                    title="TV & Netflix"
                    text="Connexion Internet disponible"
                  />

                  <Feature
                    icon="🔑"
                    title="Arrivée autonome"
                    text="Grâce à la boîte à clé"
                  />
                </div>

                {/* TARIF */}
                <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
                  <div className="text-xs uppercase tracking-wide text-stone-500">
                    À partir de
                  </div>

                  <div className="mt-1 text-3xl font-bold text-emerald-950">
                    70 €
                    <span className="text-sm font-normal text-stone-500">
                      {" "}
                      / nuit
                    </span>
                  </div>

                  <div className="mt-3 border-t border-stone-200 pt-3 text-xs text-stone-500">
                    Séjour minimum : 2 nuits
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/reserver?tab=C1"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    Voir les disponibilités
                  </Link>
                </div>

                <p className="mt-3 text-[11px] text-stone-500">
                  Paiement sécurisé · Confirmation de réservation
                </p>
              </div>

              {/* PHOTO */}
              <div className="order-1 lg:order-2 relative">
                <PhotoCarousel
                  images={photosC1}
                  heightClass="h-64 sm:h-80 lg:h-full lg:min-h-[560px]"
                />

                <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur">
                  🏡 Idéal famille & amis
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* ======================================================
            COMPARATIF
            ====================================================== */}
        <section className="max-w-6xl mx-auto px-4 mt-12">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              Quel chalet choisir ?
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900">
              Comparatif des deux hébergements
            </h2>
          </div>

          {/* VERSION DESKTOP */}
          <div className="hidden md:block mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-stone-600">
                <tr>
                  <th className="p-4 text-left font-medium">
                    Caractéristique
                  </th>

                  <th className="p-4 text-left font-medium">
                    Ty-Koad Duo
                  </th>

                  <th className="p-4 text-left font-medium">
                    Ty-Koad
                  </th>
                </tr>
              </thead>

              <tbody className="text-stone-700">
                <ComparisonRow
                  label="Idéal pour"
                  duo="Couple / escapade à deux"
                  c1="Famille / amis"
                />

                <ComparisonRow
                  label="Capacité"
                  duo="2 personnes"
                  c1="Jusqu’à 4 personnes"
                />

                <ComparisonRow
                  label="Chambres"
                  duo="1"
                  c1="2"
                />

                <ComparisonRow
                  label="Salles d’eau"
                  duo="1"
                  c1="2 avec WC"
                />

                <ComparisonRow
                  label="Spa privatif"
                  duo="✓ Oui"
                  c1="—"
                  highlight
                />

                <ComparisonRow
                  label="Linge de lit & serviettes"
                  duo="✓ Inclus"
                  c1="✓ Inclus"
                />

                <ComparisonRow
                  label="Peignoirs"
                  duo="✓ Inclus pour le spa"
                  c1="—"
                />

                <ComparisonRow
                  label="Jardin privatif"
                  duo="✓"
                  c1="✓"
                />

                <ComparisonRow
                  label="Netflix & Internet"
                  duo="✓"
                  c1="✓"
                />

                <ComparisonRow
                  label="Séjour minimum"
                  duo="1 nuit"
                  c1="2 nuits"
                />

                <ComparisonRow
                  label="Tarif à partir de"
                  duo="110 € / nuit"
                  c1="70 € / nuit"
                  highlight
                />
              </tbody>
            </table>
          </div>

          {/* VERSION MOBILE */}
          <div className="md:hidden mt-6 grid gap-4">
            <MobileComparison
              title="Ty-Koad Duo"
              subtitle="Pour une escapade à deux"
              price="Dès 110 € / nuit"
              items={[
                "2 personnes",
                "1 chambre",
                "Spa privatif",
                "Lit king size 180 × 200",
                "Lit préparé & serviettes incluses",
                "Peignoirs fournis pour le spa",
                "Petit jardin",
                "Netflix & Internet",
                "Minimum 1 nuit",
              ]}
              href="/reserver?tab=C2"
            />

            <MobileComparison
              title="Ty-Koad"
              subtitle="Pour une famille ou des amis"
              price="Dès 70 € / nuit"
              items={[
                "Jusqu’à 4 personnes",
                "2 chambres",
                "2 salles d’eau avec WC",
                "Lits préparés & serviettes incluses",
                "Cuisine équipée",
                "Petit jardin",
                "Netflix & Internet",
                "Minimum 2 nuits",
              ]}
              href="/reserver?tab=C1"
            />
          </div>
        </section>

        {/* ======================================================
            CTA FINAL
            ====================================================== */}
        <section className="max-w-4xl mx-auto px-4 mt-12">
          <div className="rounded-3xl bg-emerald-950 px-6 py-8 sm:px-9 sm:py-10 text-center text-white shadow-lg">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-200">
              Votre séjour en Bretagne
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
              Vous avez trouvé votre chalet ?
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-emerald-50/90">
              Consultez le calendrier pour découvrir les prochaines dates
              disponibles et réserver directement votre séjour.
            </p>

            <Link
              href="/reserver"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm sm:text-base font-semibold text-emerald-950 transition hover:bg-emerald-50"
            >
              Voir toutes les disponibilités
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <div className="flex gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white"
          aria-hidden="true"
        >
          {icon}
        </div>

        <div>
          <div className="text-sm font-semibold text-stone-900">
            {title}
          </div>

          <div className="mt-1 text-xs leading-relaxed text-stone-500">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonRow({
  label,
  duo,
  c1,
  highlight = false,
}) {
  return (
    <tr className="border-t border-stone-100">
      <td className="p-4 font-medium text-stone-900">
        {label}
      </td>

      <td
        className={`p-4 ${
          highlight ? "font-semibold text-emerald-900" : ""
        }`}
      >
        {duo}
      </td>

      <td
        className={`p-4 ${
          highlight ? "font-semibold text-emerald-900" : ""
        }`}
      >
        {c1}
      </td>
    </tr>
  );
}

function MobileComparison({
  title,
  subtitle,
  price,
  items,
  href,
}) {
  return (
    <article className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-semibold text-stone-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-stone-500">
        {subtitle}
      </p>

      <div className="mt-3 text-xl font-bold text-emerald-900">
        {price}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-stone-700">
        {items.map((item) => (
          <li key={item}>
            ✓ {item}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        Voir les disponibilités
      </Link>
    </article>
  );
}
