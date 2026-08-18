import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  title: "Petit-déjeuner & plateaux gourmands | Chalets Ty-Koad",

  description:
    "Commandez un petit-déjeuner ou un plateau gourmand directement pour votre séjour aux Chalets Ty-Koad à Laz : charcuterie, fromage, mixte ou fruits de mer.",

  alternates: {
    canonical: `${SITE_URL}/gourmets`,
  },

  openGraph: {
    title: "Petit-déjeuner & plateaux gourmands | Chalets Ty-Koad",
    description:
      "Complétez votre séjour avec un petit-déjeuner ou un plateau gourmand préparé pour deux et livré directement au chalet.",
    url: `${SITE_URL}/gourmets`,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/plateau-mixte.jpg`,
        width: 1200,
        height: 630,
        alt: "Plateau gourmand des Chalets Ty-Koad",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Petit-déjeuner & plateaux gourmands | Chalets Ty-Koad",
    description:
      "Plateaux gourmands et petits-déjeuners directement au chalet.",
    images: [`${SITE_URL}/images/plateau-mixte.jpg`],
  },
};

function Card({ title, price, note, featured = false }) {
  return (
    <div
      className={`relative rounded-3xl border p-5 sm:p-6 transition ${
        featured
          ? "border-amber-300 bg-amber-50 shadow-sm"
          : "border-stone-200 bg-white hover:border-stone-300"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-4 rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
          Notre sélection
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-stone-900 sm:text-lg">
          {title}
        </h3>

        {price && (
          <div className="whitespace-nowrap text-base font-semibold text-emerald-900">
            {price}
          </div>
        )}
      </div>

      {note && (
        <div className="mt-1 text-[11px] text-stone-500 sm:text-xs">
          {note}
        </div>
      )}
    </div>
  );
}

export default function GourmetsPage() {
  return (
    <>
      <SiteHeader />

      <main className="pb-12 pt-4 sm:pt-6 md:pb-16 md:pt-10">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
              Les plaisirs gourmands au chalet
            </div>

            <h1 className="mt-3 text-2xl font-bold leading-tight text-stone-900 sm:text-3xl md:text-4xl">
              Petit-déjeuner et plateaux gourmands aux Chalets Ty-Koad
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
              Complétez votre séjour avec un{" "}
              <strong>plateau à partager</strong> ou un{" "}
              <strong>petit-déjeuner préparé pour vous</strong>, directement
              au chalet. Commandez simplement en ligne et recevez ensuite
              votre lien de paiement sécurisé par e-mail.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-600">
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                ✓ Livraison au chalet
              </span>

              <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                ✓ Paiement sécurisé
              </span>

              <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                ✓ Commande simple
              </span>

              <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                ✓ Préparé pour votre séjour
              </span>
            </div>
          </div>
        </section>

        {/* BLOCS DE COMMANDE */}
        <section className="max-w-6xl mx-auto px-4 mt-8 sm:mt-10">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            {/* PLATEAUX */}
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
              <div className="p-5 sm:p-6 md:p-7">
                <div className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-900 sm:text-xs">
                  Pour 2 personnes
                </div>

                <h2 className="mt-2 text-xl font-semibold text-stone-900 sm:text-2xl">
                  Nos plateaux gourmands
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  Profitez d’un assortiment gourmand préparé pour deux
                  personnes et livré directement dans votre chalet.
                </p>

                {/* PHOTO DU PLATEAU MIXTE */}
                <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/plateau-mixte.jpg"
                      alt="Plateau mixte de charcuteries et de fromages pour deux personnes aux Chalets Ty-Koad"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-950 shadow-sm backdrop-blur">
                      Plateau mixte
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-stone-900">
                          L’incontournable à partager
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed text-stone-600">
                          Un assortiment généreux de charcuteries, fromages
                          et accompagnements, idéal pour profiter d’un moment
                          convivial à deux.
                        </p>
                      </div>

                      <div className="whitespace-nowrap text-lg font-bold text-emerald-900">
                        35€
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] leading-relaxed text-stone-500 sm:text-xs">
                      Photo de présentation. La composition et les produits
                      peuvent légèrement varier selon les arrivages et la
                      saison.
                    </p>
                  </div>
                </div>

                {/* DÉLAIS */}
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                  <div className="font-semibold">Délais de commande</div>

                  <p className="mt-1 leading-relaxed">
                    Commande au plus tard à <strong>J-1</strong> pour les
                    plateaux de charcuterie, de fromage et mixtes, et à{" "}
                    <strong>J-5</strong> pour le plateau de fruits de mer.
                  </p>
                </div>

                {/* CARTES DES PLATEAUX */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card
                    title="Charcuterie"
                    price="30€"
                    note="Pour 2 personnes • Commande J-1"
                  />

                  <Card
                    title="Fromage"
                    price="28€"
                    note="Pour 2 personnes • Commande J-1"
                  />

                  <Card
                    title="Mixte"
                    price="35€"
                    note="Pour 2 personnes • Commande J-1"
                    featured
                  />

                  <Card
                    title="Fruits de mer"
                    price="65€"
                    note="Pour 2 personnes • Commande J-5"
                  />
                </div>

                <p className="mt-4 text-xs leading-relaxed text-stone-500">
                  Les plateaux sont préparés selon une composition définie
                  et ne sont pas modifiables.
                </p>

                {/* FONCTIONNEMENT */}
                <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm">
                  <div className="font-semibold text-stone-900">
                    Comment ça marche ?
                  </div>

                  <ol className="mt-3 list-inside list-decimal space-y-2 text-stone-700">
                    <li>
                      Remplissez le formulaire avec le prénom utilisé pour
                      votre réservation, votre e-mail, la date et votre choix.
                    </li>

                    <li>
                      Vous recevez un{" "}
                      <strong>lien de paiement sécurisé</strong> par e-mail.
                    </li>

                    <li>
                      Nous préparons votre plateau et le déposons directement
                      au chalet à l’heure convenue.
                    </li>
                  </ol>
                </div>

                {/* BOUTON PLATEAU */}
                <div className="mt-5">
                  <a
                    href="https://tally.so/r/w4WDWk"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 sm:w-auto sm:text-base"
                  >
                    Commander un plateau
                  </a>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-stone-500 sm:text-xs">
                  Merci d’indiquer exactement le <em>prénom</em> utilisé lors
                  de votre réservation afin que nous puissions facilement
                  associer la commande à votre séjour.
                </p>
              </div>
            </div>

            {/* PETIT DÉJEUNER */}
            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-7">
              <div className="inline-flex rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-medium text-sky-900 sm:text-xs">
                À commander la veille
              </div>

              <h2 className="mt-2 text-xl font-semibold text-stone-900 sm:text-2xl">
                Petit-déjeuner au chalet
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                Commencez la journée tranquillement avec un petit-déjeuner
                préparé pour vous et déposé directement sur la table de votre
                terrasse.
              </p>

              {/* PETIT BLOC EXPÉRIENCE */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
                  <div className="text-xl">🥐</div>
                  <div className="mt-2 text-sm font-semibold text-stone-900">
                    Préparé le matin
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
                  <div className="text-xl">☕</div>
                  <div className="mt-2 text-sm font-semibold text-stone-900">
                    Déposé avant 9h
                  </div>
                </div>
              </div>

              {/* PRÉSENTATION PETIT DÉJEUNER */}
              <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-5">
                <h3 className="font-semibold text-sky-950">
                  Composez votre petit-déjeuner
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-sky-950/80">
                  Lors de votre commande, indiquez votre{" "}
                  <strong>e-mail</strong>, le{" "}
                  <strong>prénom de la réservation</strong>, la{" "}
                  <strong>date</strong>, le{" "}
                  <strong>nombre de petits-déjeuners</strong> ainsi que vos
                  préférences. Votre petit-déjeuner sera déposé le matin{" "}
                  <strong>avant 9h</strong> sur la table de votre terrasse.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Viennoiseries",
                    "Pain et confiture",
                    "Boissons chaudes",
                    "Œufs",
                    "Fromage",
                    "Bacon",
                  ].map((choice) => (
                    <span
                      key={choice}
                      className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-medium text-sky-950"
                    >
                      {choice}
                    </span>
                  ))}
                </div>
              </div>

              {/* ÉTAPES */}
              <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm">
                <div className="font-semibold text-stone-900">
                  Comment ça marche ?
                </div>

                <ol className="mt-3 list-inside list-decimal space-y-2 text-stone-700">
                  <li>
                    Complétez le formulaire avec vos coordonnées et vos
                    préférences.
                  </li>

                  <li>
                    Recevez votre{" "}
                    <strong>lien de paiement sécurisé</strong> par e-mail.
                  </li>

                  <li>
                    Votre petit-déjeuner est préparé puis déposé le matin{" "}
                    <strong>avant 9h</strong> sur la table de votre terrasse.
                  </li>
                </ol>
              </div>

              {/* BOUTON PETIT DÉJEUNER */}
              <div className="mt-5">
                <a
                  href="https://tally.so/r/npjkGB"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 sm:w-auto sm:text-base"
                >
                  Commander un petit-déjeuner
                </a>
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-stone-500 sm:text-xs">
                Merci de commander <strong>au plus tard la veille</strong>{" "}
                afin de nous permettre de préparer votre petit-déjeuner dans
                les meilleures conditions.
              </p>
            </div>
          </div>
        </section>

        {/* IDÉE SÉJOUR */}
        <section className="max-w-4xl mx-auto px-4 mt-10">
          <div className="rounded-3xl bg-emerald-950 p-6 sm:p-8 text-white shadow-lg">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-200">
              Une soirée sans sortir
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
              Spa, plateau gourmand et soirée au chalet
            </h2>

            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-emerald-50/90">
              Pour une escapade à deux, profitez du spa privatif puis
              retrouvez votre plateau directement au chalet. Une façon simple
              de profiter pleinement de votre soirée sans reprendre la
              voiture.
            </p>

            <Link
              href="/reserver?tab=C2"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-950 hover:bg-emerald-50 transition"
            >
              Voir les disponibilités du Duo
            </Link>
          </div>
        </section>

        {/* BLOCS COMPLÉMENTAIRES */}
        <section className="max-w-6xl mx-auto px-4 mt-10 grid gap-6 md:grid-cols-2">
          {/* CHÈQUE CADEAU */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-950 sm:p-6">
            <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
              Une idée cadeau
            </div>

            <h2 className="mt-3 text-lg font-semibold">
              Offrez une expérience gourmande
            </h2>

            <p className="mt-2 leading-relaxed">
              Ajoutez un plateau ou un petit-déjeuner à un{" "}
              <strong>chèque cadeau</strong> pour offrir une expérience encore
              plus complète aux Chalets Ty-Koad.
            </p>

            <div className="mt-4">
              <Link
                href="/cadeau"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                Créer un cadeau
              </Link>
            </div>
          </div>

          {/* RÉSERVATION */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 text-sm text-stone-800 shadow-sm sm:p-6">
            <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
              Votre séjour
            </div>

            <h2 className="mt-3 text-lg font-semibold text-stone-900">
              Vous n’avez pas encore réservé ?
            </h2>

            <p className="mt-2 leading-relaxed">
              Commencez par choisir vos dates. Vous pourrez ensuite ajouter
              vos options gourmandes à votre séjour.
            </p>

            <div className="mt-4">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                Voir les disponibilités
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
