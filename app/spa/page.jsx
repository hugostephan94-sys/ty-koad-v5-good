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
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        {/* HERO */}
        <section className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Spa privatif
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-700">
            Au <span className="font-medium">Ty-Koad Duo</span>, profitez d’un{" "}
            <strong>spa privatif</strong> accessible directement depuis la
            chambre : parfait pour déconnecter à deux après une journée de
            balades ou simplement pour savourer le calme.
          </p>
        </section>

        {/* CARTE SPA (unique) */}
        <section className="mt-8 sm:mt-10 max-w-4xl mx-auto px-4">
          <article className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            {/* Galerie SPA */}
            <PhotoCarousel
              images={spaImages}
              heightClass="h-56 sm:h-64 md:h-72"
            />

            <div className="p-5 sm:p-6 md:p-7">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Votre bulle de détente
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Jets massants</strong> pour relâcher les tensions
                </li>
                <li>
                  <strong>Lumières d’ambiance</strong> (chromothérapie)
                </li>
                <li>
                  <strong>Usage privé</strong> à deux, en toute tranquillité
                </li>
                <li>Accès rapide depuis la chambre</li>
                <li>Petit jardin privatif attenant</li>
              </ul>

              <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm">
                <div className="font-medium">Bon à savoir</div>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li>Douche obligatoire avant le bain</li>
                  <li>Pas de verre dans l’espace spa (sécurité)</li>
                  <li>Respect des voisins &amp; du matériel</li>
                </ul>
              </div>

              <div className="mt-5">
                <Link
                  href="/reserver?tab=C2"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm transition"
                >
                  Réserver le Duo avec spa
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
