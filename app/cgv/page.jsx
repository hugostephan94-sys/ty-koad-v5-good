import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

export default function CGVPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-4xl mx-auto px-4 space-y-6 sm:space-y-8">
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Conditions Générales de Vente (CGV)
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-700">
              Les présentes conditions définissent les modalités de réservation
              et de séjour aux <strong>Chalets Ty-Koad</strong>.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
              >
                Réserver
              </Link>
              <Link
                href="/infos-pratiques"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Infos pratiques
              </Link>
              <Link
                href="/caution"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Caution
              </Link>
            </div>
          </header>

          <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm space-y-6">
            <Section title="1. Identité du vendeur">
              <p>
                Les locations sont proposées par <strong>Hugo &amp; Nina</strong>,
                exploitants des <strong>Chalets Ty-Koad</strong>.
              </p>
              <p className="text-xs text-stone-500 mt-2">
                Les informations légales complémentaires (adresse, SIRET, etc.)
                peuvent être communiquées sur demande.
              </p>
            </Section>

            <Section title="2. Champ d’application">
              <p>
                Les présentes CGV s’appliquent à toute réservation effectuée en
                direct via le site, ainsi qu’à toute prestation associée (options,
                services, caution, etc.).
              </p>
              <p className="text-xs text-stone-500 mt-2">
                En cas de réservation via une plateforme (Booking, Airbnb, etc.),
                ses règles peuvent s’ajouter. En cas de contradiction, les
                conditions de la plateforme prévalent pour la partie “plateforme”.
              </p>
            </Section>

            <Section title="3. Réservation">
              <ul className="list-disc list-inside space-y-1">
                <li>La réservation est valable après paiement confirmé.</li>
                <li>
                  Vous devez fournir des informations exactes (nom, e-mail, dates,
                  nombre de personnes, etc.).
                </li>
                <li>
                  Toute réservation implique l’acceptation des présentes CGV et des
                  règles du logement.
                </li>
              </ul>
            </Section>

            <Section title="4. Tarifs">
              <p>
                Les prix affichés au moment de la réservation font foi. Ils peuvent
                varier selon la période, les offres, et le chalet choisi.
              </p>
              <p className="text-xs text-stone-500 mt-2">
                Sauf mention contraire, les prix sont indiqués en euros, toutes
                taxes comprises (TTC).
              </p>
            </Section>

            <Section title="5. Paiement">
              <p>
                Le paiement en ligne est sécurisé et traité par <strong>Stripe</strong>.
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Le paiement valide la réservation.</li>
                <li>En cas d’échec de paiement, la réservation n’est pas confirmée.</li>
              </ul>
            </Section>

            <Section title="6. Caution (empreinte bancaire)">
              <p>
                Une <strong>caution</strong> peut être demandée afin de couvrir les
                dégradations, manquements, pertes, frais de remise en état ou
                interventions exceptionnelles.
              </p>
              <p className="mt-2">
                Elle peut être réalisée via une <strong>empreinte bancaire</strong>{" "}
                (autorisation) : aucune somme n’est débitée sauf si une situation
                le justifie.
              </p>

              <div className="mt-3 rounded-2xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="font-medium text-stone-900 mb-2">Montants</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-stone-700">
                  <li>
                    <strong>Ty-Koad Duo (spa)</strong> : <strong>300 €</strong>
                  </li>
                  <li>
                    <strong>Ty-Koad Cosy</strong> : <strong>150 €</strong>
                  </li>
                </ul>
              </div>

              <p className="mt-3">
                Détails :{" "}
                <Link
                  className="underline text-emerald-800 hover:text-emerald-900"
                  href="/caution"
                >
                  consulter la page caution
                </Link>
                .
              </p>
            </Section>

            <Section title="7. Arrivée / départ">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Arrivée</strong> : à partir de 16h00</li>
                <li><strong>Départ</strong> : au plus tard à 11h00</li>
                <li>
                  Accès autonome possible via boîte à clé (informations envoyées
                  avant l’arrivée).
                </li>
              </ul>
            </Section>

            <Section title="8. Capacité, voyageurs & animaux">
              <ul className="list-disc list-inside space-y-1">
                <li>Le nombre de personnes ne doit pas dépasser la capacité du chalet.</li>
                <li>
                  Animaux acceptés sous réserve du respect des règles du logement
                  (propreté, respect, interdiction lits/canapés, déjections ramassées).
                </li>
              </ul>
            </Section>

            <Section title="9. Règles d’usage, ménage & respect des lieux">
              <ul className="list-disc list-inside space-y-1">
                <li>Logements non-fumeurs (intérieur).</li>
                <li>Respect du voisinage (bruit, surtout le soir).</li>
                <li>
                  Le logement doit être rendu dans un état correct : vaisselle, poubelles,
                  rangement minimal.
                </li>
                <li>
                  En cas de logement rendu très sale / non conforme, des frais peuvent être
                  retenus ou facturés (nettoyage, remise en état, etc.).
                </li>
              </ul>
            </Section>

            <Section title="10. Spa (Ty-Koad Duo)">
              <p>
                Le spa est strictement réservé aux occupants du Ty-Koad Duo et doit être
                utilisé conformément aux règles affichées (douche, pas de crème/huile,
                pas de verre, etc.).
              </p>
              <p className="mt-2">
                En cas de non-respect entraînant changement d’eau ou intervention, des frais
                peuvent être facturés.
              </p>
            </Section>

            <Section title="11. Annulation, modification, non-présentation">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Annulation gratuite</strong> jusqu’à <strong>7 jours</strong>{" "}
                  avant la date d’arrivée.
                </li>
                <li>
                  <strong>Moins de 7 jours</strong> avant l’arrivée : le montant total de la
                  réservation peut être dû.
                </li>
                <li>
                  <strong>Non-présentation</strong> : la réservation est due.
                </li>
              </ul>
              <p className="text-xs text-stone-500 mt-2">
                En cas de réservation via plateforme, les conditions de la plateforme peuvent
                s’appliquer.
              </p>
            </Section>

            <Section title="12. Responsabilité & assurance">
              <p>
                Le locataire est responsable du logement, de ses équipements, et des personnes
                présentes pendant le séjour. Il est recommandé d’être couvert par une assurance
                villégiature / responsabilité civile.
              </p>
              <p className="mt-2">
                Les Chalets Ty-Koad ne pourront être tenus responsables d’une mauvaise utilisation
                des équipements, ni des pertes/vols d’effets personnels.
              </p>
            </Section>

            <Section title="13. Données personnelles">
              <p>
                Les données collectées (nom, e-mail, informations de séjour) sont utilisées
                pour gérer la réservation, la communication et les obligations liées à l’hébergement.
              </p>
              <p className="mt-2">
                Vous pouvez demander l’accès, la rectification ou la suppression de vos données
                en nous contactant.
              </p>
            </Section>

            <Section title="14. Réclamations & litiges">
              <p>
                En cas de difficulté, merci de nous contacter rapidement afin de rechercher une
                solution amiable.
              </p>
              <p className="mt-2">
                À défaut d’accord, le litige pourra être porté devant les juridictions compétentes.
              </p>
            </Section>

            <div className="pt-2 border-t border-stone-200 text-xs text-stone-500">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-2">
      <h2 className="text-base sm:text-lg font-semibold text-stone-900">
        {title}
      </h2>
      <div className="text-sm text-stone-700 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}
