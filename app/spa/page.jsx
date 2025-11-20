import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import PhotoCarousel from "../../components/PhotoCarousel";

export default function SpaPage() {
  // Galerie restreinte aux photos 7, 8, 9, 18, 20 du Duo (c2)
  const spaImages = [7, 8, 9, 18, 20].map((n) => ({
    src: `/images/chalets/c2/${n}.jpg`, // si certaines sont .jpeg, renomme-les ou utilise ImageWithFallback
    alt: `Ty-Koad Duo — spa privatif (photo ${n})`,
  }));

  return (
    <div>
      <SiteHeader />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Spa privatif</h1>
        <p className="mt-3 text-stone-600">
          Au <span className="font-medium">Ty-Koad Duo</span>, profitez d’un <strong>spa privatif</strong> accessible
          directement depuis la chambre : parfait pour déconnecter à deux après une journée de balades ou simplement pour savourer le calme.
        </p>
      </section>

      {/* CARTE SPA (unique) */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <article className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
          {/* Galerie SPA */}
          <PhotoCarousel images={spaImages} heightClass="h-60 md:h-72" />

          <div className="p-6">
            <h2 className="text-2xl font-semibold">Votre bulle de détente</h2>
            <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
              <li><strong>Jets massants</strong> pour relâcher les tensions</li>
              <li><strong>Lumières d’ambiance</strong> (chromothérapie)</li>
              <li><strong>Usage privé</strong> à deux, en toute tranquillité</li>
              <li>Accès rapide depuis la chambre</li>
              <li>Petit jardin privatif attenant</li>
            </ul>

            <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm">
              <div className="font-medium">Bon à savoir</div>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Douche obligatoire avant le bain</li>
                <li>Pas de verre dans l’espace spa (sécurité)</li>
                <li>Respect des voisins & du matériel</li>
              </ul>
            </div>

            <div className="mt-5">
              <Link href="/reserver?tab=C2" className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">
                Réserver le Duo avec spa
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
