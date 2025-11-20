import SiteHeader from "../../components/SiteHeader";
import ImageCarousel from "../../components/ImageCarousel";

const TREVAREZ_IMAGES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Kastell_Trevare_4.JPG",
    alt: "Château de Trévarez – façade sud",
    caption: "Château de Trévarez — à 5 minutes des chalets",
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
    caption: "Jardin italien & bassin",
    credit: "Manfred Escherig",
    license: "CC BY-SA 3.0",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Chateau_trevarez01.jpg/973px-Chateau_trevarez01.jpg",
    alt: "Château de Trévarez – façade nord",
    caption: "Façade nord, au cœur de la végétation",
    credit: "Wikimedia Commons",
    license: "CC BY-SA",
  },
];

export default function AutourPage() {
  return (
    <div>
      <SiteHeader />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Que faire aux alentours</h1>
        <p className="mt-3 text-stone-600">
          Incontournables autour de Laz et du Centre Finistère — tous les temps sont des temps de Bretagne 🌿
        </p>
      </section>

      {/* INCONTOURNABLE : CHÂTEAU DE TRÉVAREZ (5 min) */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <ImageCarousel images={TREVAREZ_IMAGES} className="md:col-span-1" />
          <div className="bg-white rounded-3xl border border-rose-200 p-6 md:p-8 md:col-span-1">
            <div className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-900">
              Incontournable — 5 minutes
            </div>
            <h2 className="mt-2 text-2xl font-semibold">Château de Trévarez</h2>
            <p className="mt-2 text-stone-700 text-sm">
              À deux pas des chalets : un domaine magnifique avec château, parc et jardins.
              Expositions et animations toute l’année, décorations féeriques en saison.
            </p>
            <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
              <li>Parc et jardins remarquables</li>
              <li>Expositions & événements (selon période)</li>
              <li>Superbe balade à faire en toute saison</li>
            </ul>
            <p className="mt-3 text-xs text-stone-500">
              Astuce : vérifiez les horaires/programmations avant la visite.
            </p>
          </div>
        </div>
      </section>

      {/* AUTRES IDÉES : 2 COLONNES */}
      <section className="max-w-6xl mx-auto px-4 pb-12 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h2 className="text-xl font-semibold">Nature & balades</h2>
          <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
            <li>Forêt de Huelgoat — chaos granitique • ~30 min</li>
            <li>Monts d’Arrée — crêtes & landes • ~35 min</li>
            <li>Vallée de l’Aulne — rando, vélo • ~20 min</li>
            <li>Baie de Douarnenez — plage & pêche • ~45 min</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h2 className="text-xl font-semibold">Patrimoine</h2>
          <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
            <li>Locronan — village de caractère • ~40 min</li>
            <li>Quimper — cathédrale & musées • ~40 min</li>
            <li>Douarnenez — ports & musée du bateau • ~45 min</li>
            <li>Pont-Aven / Concarneau — remparts & ateliers • ~55 min</li>
          </ul>
        </div>
      </section>

      {/* Crédit/licence des photos */}
      <section className="max-w-6xl mx-auto px-4 pb-16 text-[11px] text-stone-500">
        Photos de Wikimedia Commons (licence CC BY-SA). L’attribution figure dans chaque légende.
      </section>
    </div>
  );
}
