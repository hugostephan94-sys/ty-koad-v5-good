import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

const SITE_URL = "https://chalets-tykoad.fr";

export const metadata = {
  title: "Conditions Générales de Vente | Chalets Ty-Koad",

  description:
    "Consultez les conditions générales de réservation et de séjour des Chalets Ty-Koad à Laz : paiement, caution, annulation, spa et règles des logements.",

  alternates: {
    canonical: `${SITE_URL}/cgv`,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function CGVPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-4xl mx-auto px-4">
          {/* HERO */}
          <header>
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              Informations contractuelles
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Conditions Générales de Vente
            </h1>

            <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-stone-700">
              Les présentes conditions définissent les modalités de
              réservation, de paiement et de séjour aux{" "}
              <strong>Chalets Ty-Koad</strong> à Laz, dans le Finistère.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Réserver
              </Link>

              <Link
                href="/infos-pratiques"
                className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:border-emerald-500 hover:text-emerald-900"
              >
                Infos pratiques
              </Link>

              <Link
                href="/caution"
                className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:border-emerald-500 hover:text-emerald-900"
              >
                Caution
              </Link>
            </div>
          </header>

          {/* PETIT RÉSUMÉ */}
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <InfoCard
              icon="🔒"
              title="Paiement sécurisé"
              text="Paiement en ligne via Stripe"
            />

            <InfoCard
              icon="📅"
              title="Annulation"
              text="Gratuite jusqu’à 7 jours avant"
            />

            <InfoCard
              icon="🔑"
              title="Arrivée autonome"
              text="À partir de 16h"
            />
          </div>

          {/* CGV */}
          <div className="mt-7 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-8 shadow-sm space-y-8">
            {/* 1 */}
            <Section title="1. Exploitants">
              <p>
                Les locations proposées sur le présent site sont exploitées
                par <strong>Hugo & Nina</strong> dans le cadre de l’activité{" "}
                <strong>Chalets Ty-Koad</strong>, à Laz (Finistère).
              </p>

              <p>
                L’activité est exercée sous le régime de la{" "}
                <strong>location meublée non professionnelle (LMNP)</strong>.
              </p>

              <p>
                Pour toute demande concernant une réservation ou un séjour,
                vous pouvez utiliser notre{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </Section>

            {/* 2 */}
            <Section title="2. Champ d’application">
              <p>
                Les présentes Conditions Générales de Vente s’appliquent aux
                réservations effectuées directement sur le site des Chalets
                Ty-Koad ainsi qu’aux prestations et options commandées
                directement auprès des Chalets Ty-Koad.
              </p>

              <p>
                Lorsqu’une réservation est réalisée par l’intermédiaire d’une
                plateforme de réservation telle que Booking.com ou Airbnb, les
                conditions applicables à la réservation via cette plateforme
                peuvent également s’appliquer.
              </p>
            </Section>

            {/* 3 */}
            <Section title="3. Réservation">
              <p>
                La réservation est considérée comme confirmée lorsque le
                paiement demandé a été accepté et que la confirmation de
                réservation a été délivrée.
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>
                  Le voyageur doit fournir des informations exactes lors de sa
                  réservation.
                </li>

                <li>
                  Les dates, le chalet et le nombre de voyageurs doivent
                  correspondre à la réservation effectuée.
                </li>

                <li>
                  Toute réservation implique l’acceptation des présentes CGV
                  et des règles applicables au logement.
                </li>
              </ul>
            </Section>

            {/* 4 */}
            <Section title="4. Tarifs">
              <p>
                Les tarifs applicables sont ceux affichés sur le site au
                moment de la réservation.
              </p>

              <p>
                Ils peuvent varier selon le chalet, les dates, la durée du
                séjour, les offres éventuellement proposées et les options
                sélectionnées.
              </p>

              <p>
                Le montant total à régler est présenté au voyageur avant la
                validation du paiement.
              </p>
            </Section>

            {/* 5 */}
            <Section title="5. Paiement">
              <p>
                Les paiements réalisés directement sur notre site sont traités
                par <strong>Stripe</strong>.
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>Le paiement permet de confirmer la réservation.</li>

                <li>
                  En cas d’échec ou de refus du paiement, la réservation n’est
                  pas considérée comme confirmée.
                </li>

                <li>
                  Les Chalets Ty-Koad ne stockent pas directement sur leur
                  site les numéros complets de cartes bancaires.
                </li>
              </ul>
            </Section>

            {/* 6 */}
            <Section title="6. Caution / empreinte bancaire">
              <p>
                Une caution sous forme d’empreinte bancaire peut être demandée
                afin de couvrir notamment les dégradations, pertes,
                manquements aux règles du logement ou frais exceptionnels de
                remise en état.
              </p>

              <p>
                Une empreinte bancaire correspond à une autorisation. Elle ne
                constitue pas, en principe, un débit immédiat du montant de la
                caution.
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                <div className="font-semibold text-stone-900">
                  Montant des cautions
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white border border-emerald-100 p-3">
                    <div className="text-sm font-medium text-stone-900">
                      Ty-Koad Duo
                    </div>

                    <div className="mt-1 text-xs text-stone-500">
                      Chalet avec spa privatif
                    </div>

                    <div className="mt-2 text-xl font-bold text-emerald-900">
                      300 €
                    </div>
                  </div>

                  <div className="rounded-xl bg-white border border-emerald-100 p-3">
                    <div className="text-sm font-medium text-stone-900">
                      Ty-Koad
                    </div>

                    <div className="mt-1 text-xs text-stone-500">
                      2 chambres / 2 salles d’eau
                    </div>

                    <div className="mt-2 text-xl font-bold text-emerald-900">
                      150 €
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Les modalités détaillées sont disponibles sur notre{" "}
                <Link
                  href="/caution"
                  className="font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  page consacrée à la caution
                </Link>
                .
              </p>
            </Section>

            {/* 7 */}
            <Section title="7. Arrivée et départ">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-stone-500">
                    Arrivée
                  </div>

                  <div className="mt-1 text-xl font-semibold text-stone-900">
                    À partir de 16h00
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-stone-500">
                    Départ
                  </div>

                  <div className="mt-1 text-xl font-semibold text-stone-900">
                    Avant 11h00
                  </div>
                </div>
              </div>

              <p>
                L’accès au chalet peut être réalisé de manière autonome grâce
                à une boîte à clé. Les informations nécessaires sont
                communiquées avant l’arrivée.
              </p>
            </Section>

            {/* 8 */}
            <Section title="8. Capacité et voyageurs">
              <p>
                Le nombre de personnes présentes dans le logement ne doit pas
                dépasser la capacité prévue pour le chalet réservé.
              </p>

              <p>
                Le titulaire de la réservation est responsable du respect des
                présentes conditions par les personnes qui l’accompagnent.
              </p>
            </Section>

            {/* 9 */}
            <Section title="9. Animaux">
              <p>
                Les animaux sont acceptés sous réserve du respect des règles
                du logement et de la tranquillité des lieux.
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>Le logement doit être maintenu propre.</li>

                <li>
                  Les déjections dans les espaces extérieurs doivent être
                  ramassées.
                </li>

                <li>
                  Les animaux ne doivent pas occasionner de dégradations ou de
                  nuisances.
                </li>

                <li>
                  Ils ne doivent pas accéder au spa.
                </li>
              </ul>
            </Section>

            {/* 10 */}
            <Section title="10. Respect des lieux et ménage">
              <p>
                Les logements sont <strong>non-fumeurs à l’intérieur</strong>.
              </p>

              <p>
                Les voyageurs sont tenus de respecter les lieux, les
                équipements ainsi que la tranquillité du voisinage,
                particulièrement en soirée et durant la nuit.
              </p>

              <p>
                Le logement doit être rendu dans un état correct, avec
                notamment la vaisselle rangée, les déchets évacués selon les
                consignes communiquées et un rangement raisonnable.
              </p>

              <p>
                Lorsqu’un nettoyage exceptionnel ou une remise en état est
                nécessaire en raison d’un usage anormal du logement, les frais
                correspondants peuvent être réclamés.
              </p>
            </Section>

            {/* 11 */}
            <Section title="11. Utilisation du spa — Ty-Koad Duo">
              <p>
                Le spa est réservé aux occupants du{" "}
                <strong>Ty-Koad Duo</strong>.
              </p>

              <p>
                Son utilisation doit respecter les consignes présentes dans le
                logement, notamment :
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>douche avant l’utilisation ;</li>
                <li>absence de crème, huile ou produit dans l’eau ;</li>
                <li>absence de verre dans l’espace spa ;</li>
                <li>respect du matériel et de la couverture du spa ;</li>
                <li>respect du calme et du voisinage.</li>
              </ul>

              <p>
                En cas de non-respect des consignes nécessitant notamment une
                intervention, une remise en état ou un changement anticipé de
                l’eau, les frais réellement occasionnés peuvent être
                réclamés.
              </p>

              <Link
                href="/spa"
                className="inline-flex font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Découvrir le spa privatif →
              </Link>
            </Section>

            {/* 12 */}
            <Section title="12. Annulation, modification et non-présentation">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-stone-500">
                      Jusqu’à 7 jours avant l’arrivée
                    </div>

                    <div className="mt-1 font-semibold text-emerald-800">
                      Annulation gratuite
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wide text-stone-500">
                      Moins de 7 jours avant
                    </div>

                    <div className="mt-1 font-semibold text-stone-900">
                      Le montant total peut être dû
                    </div>
                  </div>
                </div>
              </div>

              <p>
                En cas de non-présentation, le montant de la réservation est
                dû.
              </p>

              <p>
                Toute demande de modification reste soumise aux disponibilités
                du chalet concerné.
              </p>

              <p>
                Pour une réservation effectuée par l’intermédiaire d’une
                plateforme, les conditions d’annulation affichées par cette
                plateforme pour la réservation concernée s’appliquent.
              </p>
            </Section>

            {/* 13 */}
            <Section title="13. Chèques cadeaux et prestations complémentaires">
              <p>
                Les chèques cadeaux achetés sur notre site correspondent aux
                prestations et options sélectionnées au moment de l’achat.
              </p>

              <p>
                La réservation d’un séjour au moyen d’un chèque cadeau reste
                soumise aux disponibilités du chalet et aux conditions
                précisées sur le bon.
              </p>

              <p>
                Les prestations complémentaires commandées doivent être
                utilisées dans les conditions précisées lors de la commande ou
                dans les informations communiquées avant le séjour.
              </p>

              <Link
                href="/cadeau"
                className="inline-flex font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Voir les chèques cadeaux →
              </Link>
            </Section>

            {/* 14 */}
            <Section title="14. Responsabilité">
              <p>
                Le titulaire de la réservation est responsable de
                l’utilisation du logement et de ses équipements ainsi que des
                personnes présentes pendant le séjour.
              </p>

              <p>
                Il appartient aux voyageurs de respecter les consignes de
                sécurité et d’utilisation mises à leur disposition.
              </p>

              <p>
                Il est recommandé aux voyageurs de disposer d’une assurance
                responsabilité civile couvrant leur séjour et, le cas
                échéant, d’une garantie villégiature.
              </p>

              <p>
                Les Chalets Ty-Koad ne peuvent être tenus responsables des
                pertes ou vols d’effets personnels dans le logement.
              </p>
            </Section>

            {/* 15 */}
            <Section title="15. Données personnelles et cookies">
              <p>
                Les informations recueillies lors d’une réservation, d’un
                achat ou d’une prise de contact sont utilisées notamment pour
                gérer la demande, la réservation, le paiement et les
                informations relatives au séjour.
              </p>

              <p>
                Le site utilise également certains outils et traceurs dans les
                conditions décrites dans notre politique de confidentialité.
              </p>

              <Link
                href="/confidentialite"
                className="inline-flex font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Consulter notre politique de confidentialité et cookies →
              </Link>
            </Section>

            {/* 16 */}
            <Section title="16. Réclamation et règlement des litiges">
              <p>
                En cas de difficulté ou de contestation concernant une
                réservation ou un séjour, nous vous invitons à nous contacter
                en priorité afin de rechercher une solution amiable.
              </p>

              <Link
                href="/contact"
                className="inline-flex font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Nous contacter →
              </Link>

              <p>
                À défaut de résolution amiable, le litige pourra être soumis
                aux juridictions compétentes conformément aux règles
                applicables.
              </p>
            </Section>

            {/* ACCEPTATION */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
              <div className="font-semibold text-emerald-950">
                Acceptation des conditions
              </div>

              <p className="mt-2 text-sm leading-relaxed text-emerald-950/80">
                La validation d’une réservation directe implique la prise de
                connaissance et l’acceptation des présentes Conditions
                Générales de Vente.
              </p>
            </div>

            {/* DATE */}
            <div className="pt-4 border-t border-stone-200 text-xs text-stone-500">
              Dernière mise à jour : août 2026
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ============================================================
   COMPOSANTS
   ============================================================ */

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
        {title}
      </h2>

      <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-stone-700">
        {children}
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50"
          aria-hidden="true"
        >
          {icon}
        </div>

        <div>
          <div className="text-sm font-semibold text-stone-900">
            {title}
          </div>

          <div className="mt-0.5 text-xs text-stone-500">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
