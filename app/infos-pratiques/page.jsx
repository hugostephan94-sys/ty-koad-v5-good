import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

export default function InfosPratiquesPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="space-y-6 sm:space-y-8">
          {/* HERO */}
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Infos pratiques
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-700">
              Tout pour préparer sereinement votre séjour aux{" "}
              <strong>Chalets Ty-Koad</strong>.
            </p>
          </header>

          {/* CARTES D’INFOS */}
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
                  TV avec <strong>Netflix</strong> et{" "}
                  <strong>Internet</strong> pour le streaming / télétravail
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
                  Ty-Koad : <strong>2 chambres</strong> (une avec 2 lits
                  simples, une avec lit double) chacune avec{" "}
                  <strong>salle d’eau &amp; toilettes privatives</strong>
                </li>
              </ul>
            </div>

            {/* HORAIRES & ARRIVÉE / DÉPART */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Arrivée / départ
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Arrivée</strong> : à partir de{" "}
                  <strong>16h00</strong>
                </li>
                <li>
                  <strong>Départ</strong> : au plus tard à{" "}
                  <strong>11h00</strong>
                </li>
                <li>
                  Accès autonome : vous arrivez à l’heure qui vous arrange à
                  partir de 16h, grâce à la{" "}
                  <strong>boîte à clé</strong>.
                </li>
                <li>
                  Merci de nous prévenir en cas d’arrivée très tardive ou de
                  souci le jour J, pour que tout se passe au mieux.
                </li>
              </ul>
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
                <li>
                  Les animaux ne doivent pas monter sur les lits / canapés
                </li>
                <li>
                  <strong>Avant le départ</strong>, merci de :
                  <ul className="mt-1 ml-4 list-disc list-inside space-y-1">
                    <li>
                      ranger le chalet et laisser les lieux dans un état propre,
                    </li>
                    <li>
                      vider les poubelles et les déposer dans les conteneurs
                      prévus,
                    </li>
                    <li>faire la vaisselle,</li>
                    <li>
                      ramasser les déjections de vos animaux dans le jardin,
                    </li>
                    <li>
                      fermer les fenêtres, éteindre lumières &amp; appareils.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Frais de ménage</strong> : uniquement si le chalet est
                  rendu sale ou non rangé — des frais pourront alors être
                  retenus sur la caution.
                </li>
              </ul>
            </div>

            {/* SPA – RÈGLES D’UTILISATION */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Spa privatif (Ty-Koad Duo)
              </h2>
              <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                <li>
                  Le spa est <strong>réservé aux occupants du Ty-Koad Duo</strong>
                </li>
                <li>
                  <strong>Douche obligatoire</strong> avant chaque utilisation
                </li>
                <li>
                  Pas de <strong>crème, huile, auto-bronzant</strong> ou
                  maquillage lourd avant d’entrer dans le spa (risque d’encrasser
                  l’eau et le système)
                </li>
                <li>
                  <strong>Aucun verre ni bouteille en verre</strong> dans
                  l’espace spa (sécurité)
                </li>
                <li>
                  Usage réservé aux adultes ou enfants sous la responsabilité
                  d’un adulte
                </li>
                <li>
                  Merci de respecter le <strong>calme</strong> des voisins,
                  surtout en soirée (pas de musique forte, pas de cris).
                </li>
                <li>
                  En cas de non-respect des règles entraînant un changement
                  d’eau ou une intervention, des frais pourront être retenus sur
                  la caution.
                </li>
              </ul>
            </div>

            {/* TARIFS & CONDITIONS */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Tarifs & conditions
              </h2>
              <div className="mt-3 grid gap-6 md:grid-cols-2 text-sm text-stone-700">
                <div>
                  <h3 className="text-base font-semibold">
                    Ty-Koad Duo — spa privatif pour 2
                  </h3>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>
                      <strong>110 €</strong> la nuit (du dimanche au jeudi)
                    </li>
                    <li>
                      <strong>130 €</strong> la nuit (vendredi &amp; samedi)
                    </li>
                    <li>
                      <em>Minimum 1 nuit</em>
                    </li>
                    <li>
                      <strong>Caution :</strong> 500 € (pré-autorisation
                      bancaire)
                    </li>
                    <li>
                      Accès illimité au spa privatif pendant votre séjour
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    Ty-Koad — 2 chambres / 2 SDB
                  </h3>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>
                      <strong>70 €</strong> la nuit
                    </li>
                    <li>
                      <em>Minimum 2 nuits</em>
                    </li>
                    <li>
                      <strong>Caution :</strong> 150 € (pré-autorisation
                      bancaire)
                    </li>
                    <li>
                      Idéal en famille ou entre amis (jusqu’à 4 personnes)
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-xs text-stone-500">
                Les prix peuvent varier selon la période, les offres en cours ou
                la plateforme de réservation. Référencez-vous toujours au tarif
                affiché au moment de la réservation (en direct ou via la
                plateforme utilisée).
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
              <h3 className="text-lg sm:text-xl font-semibold">
                Envies spéciales
              </h3>
              <p className="mt-2 text-sm text-stone-700">
                Anniversaire, déco romantique, petite attention, surprise
                gourmande… dites-le-nous lors de la réservation ou envoyez-nous
                un message après votre réservation : nous ferons au mieux pour
                personnaliser votre séjour 💚
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
