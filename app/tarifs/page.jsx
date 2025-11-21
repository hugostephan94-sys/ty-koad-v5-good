import SiteHeader from "../../components/SiteHeader";

export default function TarifsPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-3xl mx-auto px-4 space-y-6 sm:space-y-8">
          {/* Titre */}
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Tarifs & CGV
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-700">
              Aperçu des tarifs des deux chalets et rappel des principales
              conditions de séjour.
            </p>
          </header>

          {/* Cartes tarifs */}
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 text-sm text-stone-700">
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">
                Chalet
              </div>
              <div className="font-semibold text-stone-900">
                Ty-Koad — 2 chambres / 2 SDB
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <div>
                  <span className="font-medium">70 €</span> / nuit
                </div>
                <div>Séjour minimum : 2 nuits</div>
                <div>
                  Caution : <span className="font-medium">150 €</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">
                Chalet
              </div>
              <div className="font-semibold text-stone-900">
                Ty-Koad Duo — spa privatif
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <div>
                  <span className="font-medium">130 €</span> (dim–jeu)
                </div>
                <div>
                  <span className="font-medium">150 €</span> (ven–sam)
                </div>
                <div>Minimum : 1 nuit</div>
                <div>
                  Caution : <span className="font-medium">500 €</span>
                </div>
              </div>
            </div>
          </div>

          {/* CGV / règles principales */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm text-sm text-stone-700">
            <h2 className="text-base sm:text-lg font-semibold text-stone-900">
              Conditions générales (extrait)
            </h2>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-stone-700">
              <li>Animaux autorisés (tenus propres & respectueux des lieux).</li>
              <li>
                Frais de ménage uniquement si le logement n’est pas rendu propre
                ou rangé : des frais peuvent alors être retenus sur la caution.
              </li>
              <li>
                Annulation / arrhes : à préciser selon vos règles (ex. non
                remboursable à J-7, etc.).
              </li>
              <li>
                Arrivée / départ : à préciser (par exemple, arrivée à 16h,
                départ à 11h).
              </li>
            </ul>
            <p className="mt-3 text-[11px] text-stone-500">
              Pour les CGV complètes, pensez à les intégrer dans vos
              confirmations de réservation ou dans un document séparé (PDF / page
              dédiée).
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
