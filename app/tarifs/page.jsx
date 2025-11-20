import SiteHeader from "../../components/SiteHeader";

export default function TarifsPage(){
  return (
    <div>
      <SiteHeader />
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl font-bold">Tarifs & CGV</h1>
        <div className="mt-4 grid md:grid-cols-2 gap-6 text-sm text-stone-700">
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="font-medium">Ty-Koad — 2 chambres / 2 SDB</div>
            <div className="mt-1">70 € / nuit • Séjour minimum : 2 nuits • Caution : 150 €</div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="font-medium">Ty-Koad Duo — Spa privatif</div>
            <div className="mt-1">130 € (dim-jeu) • 150 € (ven-sam) • Minimum : 1 nuit • Caution : 500 €</div>
          </div>
          <ul className="md:col-span-2 list-disc list-inside text-stone-600">
            <li>Animaux autorisés.</li>
            <li>Frais de ménage : uniquement si le logement n’est pas rendu propre.</li>
            <li>Annulation / arrhes : à préciser.</li>
            <li>Arrivée / Départ : à préciser (ex. arrivée 16:00, départ 10:00).</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
