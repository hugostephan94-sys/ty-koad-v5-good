import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

export default function InfosPratiquesPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-5xl mx-auto px-4 space-y-6 sm:space-y-8">
          {/* HERO */}
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Infos pratiques
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-700">
              Tout pour préparer sereinement votre séjour aux{" "}
              <strong>Chalets Ty-Koad</strong>.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
              >
                Réserver
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

          {/* CARTES */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-start">
            {/* CONFORT & ÉQUIPEMENTS */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Confort & équipements
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Petit jardin privatif</strong> pour chaque chalet
                </li>
                <li>
                  <strong>Animaux autorisés</strong> (tenus propres &amp;
                  respectueux des lieux)
                </li>
                <li>
                  Accès autonome via <strong>boîte à clé</strong> (code envoyé
                  avant l’arrivée)
                </li>
                <li>
                  Cuisine entièrement équipée (plaques, four, micro-ondes,
                  vaisselle…)
                </li>
                <li>Cafetière filtre &amp; machine à dosettes</li>
                <li>
                  TV avec <strong>Netflix</strong> et <strong>Internet</strong>{" "}
                  pour le streaming / télétravail
                </li>
                <li>
                  Ty-Koad Duo :{" "}
                  <strong>lit 180 × 200 cm (king size)</strong>
                </li>
                <li>
                  Ty-Koad Duo : cuisine équipée +{" "}
                  <strong>cave à vin</strong> (vins payants)
                </li>
                <li>
                  Ty-Koad : <strong>2 chambres</strong> (une avec 2 lits simples,
                  une avec lit double) chacune avec{" "}
                  <strong>salle d’eau &amp; toilettes privatives</strong>
                </li>
              </ul>
            </div>

            {/* ARRIVÉE / DÉPART */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Arrivée / départ
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Arrivée</strong> : à partir de <strong>16h00</strong>
                </li>
                <li>
                  <strong>Départ</strong> : au plus tard à <strong>11h00</strong>
                </li>
                <li>
                  Accès autonome : vous arrivez à l’heure qui vous arrange à
                  partir de 16h, grâce à la <strong>boîte à clé</strong>.
                </li>
                <li>
                  Merci de nous prévenir en cas d’arrivée très tardive ou de
                  souci le jour J.
                </li>
              </ul>
              <p className="mt-4 text-xs text-stone-500">
                Le code et les informations d’accès sont envoyés avant votre
                arrivée.
              </p>
            </div>

            {/* RÈGLES & MÉNAGE */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Règles & ménage
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Non-fumeur</strong> à l’intérieur des chalets
                </li>
                <li>Les animaux ne doivent pas monter sur les lits / canapés</li>
                <li>
                  <strong>Avant le départ</strong>, merci de :
                  <ul className="mt-1 ml-4 list-disc list-inside space-y-1">
                    <li>ranger le chalet et laisser les lieux propres,</li>
                    <li>vider les poubelles (conteneurs prévus),</li>
                    <li>faire la vaisselle,</li>
                    <li>ramasser les déjections des animaux dans le jardin,</li>
                    <li>fermer les fenêtres, éteindre lumières &amp; appareils.</li>
                  </ul>
                </li>
                <li>
                  Si le chalet est rendu très sale / non rangé, des{" "}
                  <strong>frais supplémentaires</strong> pourront être facturés.
                </li>
              </ul>
            </div>

            {/* SPA */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Spa privatif (Ty-Koad Duo)
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  Spa <strong>réservé aux occupants du Ty-Koad Duo</strong>
                </li>
                <li>
                  <strong>Douche obligatoire</strong> avant chaque utilisation
                </li>
                <li>
                  Pas de <strong>crème, huile, auto-bronzant</strong> ou
                  maquillage récent avant d’entrer dans le spa
                </li>
                <li>
                  <strong>Aucun verre</strong> dans l’espace spa
                </li>
                <li>Enfants uniquement sous la responsabilité d’un adulte</li>
                <li>
                  Respect du <strong>calme</strong> des voisins, surtout en soirée
                </li>
                <li>
                  Si non-respect entraînant changement d’eau / intervention, des
                  frais pourront être facturés.
                </li>
              </ul>
            </div>

            {/* CAUTION */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">Caution</h2>

              <div className="mt-3 grid gap-6 md:grid-cols-2 text-sm text-stone-700">
                <div className="space-y-2">
                  <p>
                    Une <strong>caution</strong> peut être demandée afin de
                    couvrir d’éventuelles dégradations, manquements, pertes,
                    ou frais de remise en état.
                  </p>
                  <p>
                    Elle est généralement réalisée sous forme d’{" "}
                    <strong>empreinte bancaire (autorisation)</strong> : aucune
                    somme n’est débitée sauf en cas de besoin justifié.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4">
                  <div className="font-medium text-stone-900 mb-2">Montants</div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Ty-Koad Duo (spa)</strong> : <strong>300 €</strong>
                    </li>
                    <li>
                      <strong>Ty-Koad Cosy</strong> : <strong>150 €</strong>
                    </li>
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-3">
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
                      CGV
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-stone-500">
                En cas de débit, un justificatif (photos, facture, intervention)
                pourra être fourni sur demande.
              </p>
            </div>

            {/* ANNULATION */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Annulation
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Annulation gratuite</strong> jusqu’à{" "}
                  <strong>7 jours</strong> avant la date d’arrivée.
                </li>
                <li>
                  Passé ce délai (moins de 7 jours avant l’arrivée), le montant
                  total de la réservation peut être dû.
                </li>
                <li>
                  En cas de <strong>non-présentation</strong>, la réservation est
                  due.
                </li>
              </ul>
              <p className="mt-3 text-xs text-stone-500">
                Réservation via plateforme : les conditions de la plateforme
                peuvent s’appliquer.
              </p>
            </div>

            {/* TARIFS */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">Tarifs</h2>
              <div className="mt-3 grid gap-6 md:grid-cols-2 text-sm text-stone-700">
                <div>
                  <h3 className="text-base font-semibold">
                    Ty-Koad Duo — spa privatif (2 pers.)
                  </h3>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>
                      <strong>110 €</strong> / nuit (dimanche → jeudi)
                    </li>
                    <li>
                      <strong>130 €</strong> / nuit (vendredi &amp; samedi)
                    </li>
                    <li>
                      <em>Minimum 1 nuit</em>
                    </li>
                    <li>Accès spa privatif pendant le séjour</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    Ty-Koad — 2 chambres / 2 SDB
                  </h3>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>
                      <strong>70 €</strong> / nuit
                    </li>
                    <li>
                      <em>Minimum 2 nuits</em>
                    </li>
                    <li>Jusqu’à 4 personnes</li>
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-xs text-stone-500">
                Les tarifs peuvent varier selon la période, les offres et la
                plateforme. Référez-vous au prix affiché au moment de la
                réservation.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/reserver"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
                >
                  Réserver votre séjour
                </Link>
              </div>
            </div>

            {/* ENVIES SPÉCIALES */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold">Envies spéciales</h3>
              <p className="mt-2 text-sm text-stone-700">
                Anniversaire, déco romantique, petite attention, surprise
                gourmande… dites-le-nous : nous ferons au mieux pour personnaliser
                votre séjour 💚
              </p>
            </div>

            {/* LIENS */}
            <div className="md:col-span-2 rounded-3xl border border-stone-200 bg-stone-50/60 p-5 sm:p-6 md:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-stone-700">
                  Besoin de tout vérifier ? <span className="font-medium">CGV</span>,{" "}
                  <span className="font-medium">caution</span> et réservation.
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/cgv"
                    className="text-sm font-medium text-emerald-800 hover:text-emerald-900 underline"
                  >
                    CGV
                  </Link>
                  <Link
                    href="/caution"
                    className="text-sm font-medium text-emerald-800 hover:text-emerald-900 underline"
                  >
                    Caution
                  </Link>
                  <Link
                    href="/reserver"
                    className="text-sm font-medium text-emerald-800 hover:text-emerald-900 underline"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-500">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </section>
      </main>
    </>
  );
}
