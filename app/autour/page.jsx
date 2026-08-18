import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import ImageCarousel from "../../components/ImageCarousel";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  title: "Que faire autour de Laz, Trévarez et Huelgoat | Chalets Ty-Koad",

  description:
    "Découvrez les incontournables autour des Chalets Ty-Koad à Laz : château de Trévarez, forêt de Huelgoat, Monts d’Arrée, Quimper, Locronan, Douarnenez et balades en Centre Finistère.",

  alternates: {
    canonical: `${SITE_URL}/autour`,
  },

  openGraph: {
    title: "Que faire autour de Laz et Trévarez | Chalets Ty-Koad",
    description:
      "Trévarez, Huelgoat, Monts d’Arrée, Quimper, Locronan et nature bretonne : préparez vos sorties autour des Chalets Ty-Koad.",
    url: `${SITE_URL}/autour`,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/og-tykoad.png`,
        width: 1200,
        height: 630,
        alt: "Découvrir le Centre Finistère depuis les Chalets Ty-Koad",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Que faire autour de Laz et Trévarez | Chalets Ty-Koad",
    description:
      "Découvrez Trévarez, Huelgoat, les Monts d’Arrée et les incontournables du Centre Finistère.",
    images: [`${SITE_URL}/images/og-tykoad.png`],
  },
};

const TREVAREZ_IMAGES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Kastell_Trevare_4.JPG",
    alt: "Château de Trévarez – façade sud",
    caption: "Château de Trévarez — à quelques minutes des chalets",
    credit: "Yann Gwilhoù",
    license: "CC BY-SA 3.0",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Chateau_Tr%C3%A9varez.jpg",
    alt: "Château de Trévarez – parterres et pelouses",
    caption: "Parterres et pelouses du domaine",
    credit: "Nicolas Grandjean",
    license: "CC BY-SA",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Chateau_trevarez_parc_07.jpg",
    alt: "Domaine de Trévarez – jardin italien et bassin",
    caption: "Jardin italien et bassin",
    credit: "Manfred Escherig",
    license: "CC BY-SA 3.0",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Chateau_trevarez01.jpg/973px-Chateau_trevarez01.jpg",
    alt: "Château de Trévarez – façade nord",
    caption: "Façade nord au cœur de la végétation",
    credit: "Wikimedia Commons",
    license: "CC BY-SA",
  },
];

const natureIdeas = [
  {
    title: "Forêt de Huelgoat",
    time: "≈ 30 min",
    text: "Une forêt légendaire connue pour ses énormes blocs de granit, ses sentiers et ses paysages mystérieux.",
  },
  {
    title: "Monts d’Arrée",
    time: "≈ 35 min",
    text: "Landes, crêtes, panoramas et paysages sauvages pour une vraie immersion dans la Bretagne intérieure.",
  },
  {
    title: "Vallée de l’Aulne",
    time: "≈ 20 min",
    text: "Une belle idée pour marcher, pédaler ou simplement profiter d’un environnement verdoyant au fil de l’eau.",
  },
  {
    title: "Baie de Douarnenez",
    time: "≈ 45 min",
    text: "Pour alterner campagne et bord de mer avec plages, ports et grands paysages côtiers.",
  },
];

const heritageIdeas = [
  {
    title: "Locronan",
    time: "≈ 40 min",
    text: "Un village de caractère aux ruelles pavées, maisons anciennes et ambiance typiquement bretonne.",
  },
  {
    title: "Quimper",
    time: "≈ 40 min",
    text: "Cathédrale, centre historique, musées, restaurants et jolies promenades le long de l’Odet.",
  },
  {
    title: "Douarnenez",
    time: "≈ 45 min",
    text: "Ports, patrimoine maritime, balades et atmosphère de ville côtière.",
  },
  {
    title: "Pont-Aven & Concarneau",
    time: "≈ 55 min",
    text: "Deux destinations idéales pour une journée entre patrimoine, galeries, port et ville close.",
  },
];

export default function AutourPage() {
  return (
    <>
      <SiteHeader />

      <main className="pb-12 md:pb-16 space-y-10 sm:space-y-12 md:space-y-16">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 md:pt-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
              Centre Finistère · Bretagne
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Que faire autour de Laz, Trévarez et Huelgoat ?
            </h1>

            <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
              Depuis les Chalets Ty-Koad, partez à la découverte du Centre
              Finistère : château de Trévarez, forêt de Huelgoat, Monts
              d’Arrée, villages de caractère et escapades vers la côte.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-semibold shadow-sm transition"
              >
                Voir les disponibilités
              </Link>

              <Link
                href="/spa"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm sm:text-base font-medium hover:border-emerald-300 hover:text-emerald-900 transition"
              >
                Découvrir le spa privatif
              </Link>
            </div>
          </div>
        </section>

        {/* TRÉVAREZ */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white/40 shadow-sm">
              <ImageCarousel images={TREVAREZ_IMAGES} className="h-full" />
            </div>

            <div className="bg-white rounded-3xl border border-rose-200 p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-100 text-rose-900">
                  Incontournable à proximité
                </div>

                <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-stone-900">
                  Domaine de Trévarez
                </h2>

                <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
                  L’un des grands incontournables du Centre Finistère :
                  château, parc, jardins, expositions et programmation
                  culturelle au fil des saisons.
                </p>

                <ul className="mt-4 text-sm text-stone-700 space-y-2">
                  <li>✓ Parc et jardins remarquables</li>
                  <li>✓ Expositions et événements selon la période</li>
                  <li>✓ Une belle sortie en couple ou en famille</li>
                  <li>✓ Noël à Trévarez en saison hivernale</li>
                </ul>
              </div>

              <div className="mt-6 rounded-2xl bg-stone-50 border border-stone-200 p-4">
                <div className="text-sm font-medium text-stone-900">
                  Notre conseil
                </div>

                <p className="mt-1 text-xs sm:text-sm text-stone-600">
                  Vérifiez les horaires, la billetterie et la programmation
                  officielle avant votre visite, car ils varient selon la
                  saison.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NATURE */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-[0.16em] text-emerald-800 font-medium">
              Grand air
            </div>

            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-stone-900">
              Nature et balades en Centre Finistère
            </h2>

            <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-600">
              Forêts légendaires, landes, vallées et paysages côtiers :
              plusieurs ambiances sont accessibles pendant votre séjour.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {natureIdeas.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-stone-900">
                    {item.title}
                  </h3>

                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-900">
                    {item.time}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* PATRIMOINE */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-[0.16em] text-emerald-800 font-medium">
              Patrimoine & villes
            </div>

            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-stone-900">
              Villages, ports et patrimoine breton
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {heritageIdeas.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-stone-900">
                    {item.title}
                  </h3>

                  <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-700">
                    {item.time}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* IDÉE DE JOURNÉE */}
        <section className="max-w-4xl mx-auto px-4">
          <div className="rounded-3xl bg-emerald-950 p-6 sm:p-8 md:p-10 text-white shadow-lg">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-200">
              Une idée simple
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
              Visite la journée, spa le soir
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-emerald-50/90 max-w-2xl">
              Profitez de la journée pour découvrir Trévarez, Huelgoat ou les
              Monts d’Arrée, puis retrouvez le calme du Ty-Koad Duo et son spa
              privatif en fin de journée.
            </p>

            <Link
              href="/reserver?tab=C2"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-950 hover:bg-emerald-50 transition"
            >
              Voir les disponibilités du Duo
            </Link>
          </div>
        </section>

        {/* CRÉDIT PHOTOS */}
        <section className="max-w-6xl mx-auto px-4 pt-2 text-[11px] text-stone-500 leading-snug">
          Photos du Domaine de Trévarez provenant de Wikimedia Commons
          sous licences CC BY-SA. L’attribution figure dans les légendes
          du carrousel.
        </section>
      </main>
    </>
  );
}
