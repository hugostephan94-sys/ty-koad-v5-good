import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

const SITE_URL = "https://chalets-tykoad.fr";

export const metadata = {
  title: "Politique de confidentialité & cookies | Chalets Ty-Koad",

  description:
    "Politique de confidentialité et gestion des cookies du site des Chalets Ty-Koad : données personnelles, paiements Stripe, Pixel Meta et droits RGPD.",

  alternates: {
    canonical: `${SITE_URL}/confidentialite`,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-4xl mx-auto px-4">
          {/* HERO */}
          <header className="max-w-3xl">
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              Vie privée & données personnelles
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Politique de confidentialité et cookies
            </h1>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-700">
              Les Chalets Ty-Koad accordent une attention particulière à la
              protection de vos données personnelles et à la transparence sur
              leur utilisation.
            </p>

            <p className="mt-2 text-xs text-stone-500">
              Dernière mise à jour : août 2026
            </p>
          </header>

          <div className="mt-8 space-y-6">
            {/* RESPONSABLE */}
            <Section title="1. Responsable du traitement">
              <p>
                Les données collectées sur le site{" "}
                <strong>chalets-tykoad.fr</strong> sont traitées dans le cadre
                de l'activité des <strong>Chalets Ty-Koad</strong>, situés à
                Laz dans le Finistère (France).
              </p>

              <p>
                Pour toute question concernant vos données personnelles ou
                pour exercer vos droits, vous pouvez nous contacter via notre{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </Section>

            {/* DONNEES */}
            <Section title="2. Données personnelles collectées">
              <p>
                Selon votre utilisation du site, nous pouvons notamment
                recueillir les informations suivantes :
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>nom et prénom ;</li>
                <li>adresse e-mail ;</li>
                <li>numéro de téléphone lorsque vous le renseignez ;</li>
                <li>dates et informations relatives à votre séjour ;</li>
                <li>chalet et prestations sélectionnés ;</li>
                <li>
                  informations nécessaires à la gestion d'un chèque cadeau ;
                </li>
                <li>contenu des messages envoyés via le formulaire de contact ;</li>
                <li>
                  informations techniques liées à la navigation et aux
                  cookies, lorsque vous les acceptez.
                </li>
              </ul>

              <p>
                Nous cherchons à limiter les informations collectées à celles
                nécessaires au traitement de votre demande ou de votre
                réservation.
              </p>
            </Section>

            {/* FINALITES */}
            <Section title="3. Pourquoi utilisons-nous vos données ?">
              <p>Les données peuvent être utilisées afin de :</p>

              <ul className="list-disc list-inside space-y-2">
                <li>traiter et gérer vos réservations ;</li>
                <li>vous envoyer les informations relatives à votre séjour ;</li>
                <li>gérer les paiements et cautions ;</li>
                <li>créer et gérer les chèques cadeaux ;</li>
                <li>répondre aux demandes envoyées via le formulaire de contact ;</li>
                <li>gérer les options et prestations commandées ;</li>
                <li>assurer la sécurité et le bon fonctionnement du site ;</li>
                <li>
                  mesurer l'efficacité de nos campagnes publicitaires lorsque
                  vous avez accepté les cookies correspondants.
                </li>
              </ul>
            </Section>

            {/* BASE LEGALE */}
            <Section title="4. Bases juridiques des traitements">
              <p>
                Selon la nature du traitement, l'utilisation de vos données
                repose notamment sur :
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>l'exécution d'un contrat</strong> ou de mesures
                  précontractuelles pour les réservations, prestations et
                  chèques cadeaux ;
                </li>

                <li>
                  <strong>notre intérêt légitime</strong> pour répondre à
                  certaines demandes, assurer la sécurité du site et gérer
                  notre activité ;
                </li>

                <li>
                  <strong>le respect de nos obligations légales</strong>,
                  notamment comptables et fiscales ;
                </li>

                <li>
                  <strong>votre consentement</strong> pour les cookies et
                  traceurs publicitaires non indispensables.
                </li>
              </ul>
            </Section>

            {/* STRIPE */}
            <Section title="5. Paiements sécurisés avec Stripe">
              <p>
                Les paiements réalisés sur notre site sont traités à l'aide
                des services de <strong>Stripe</strong>.
              </p>

              <p>
                Lorsque vous effectuez un paiement ou une empreinte bancaire,
                certaines informations nécessaires au traitement de
                l'opération sont transmises directement à Stripe.
              </p>

              <p>
                Les Chalets Ty-Koad ne stockent pas sur leur site les numéros
                complets de votre carte bancaire.
              </p>

              <a
                href="https://stripe.com/fr/privacy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Consulter la politique de confidentialité de Stripe ↗
              </a>
            </Section>

            {/* COOKIES */}
            <Section title="6. Cookies">
              <p>
                Le site peut utiliser des technologies de stockage local ou
                des cookies nécessaires à son fonctionnement ainsi qu'à la
                mémorisation de certains choix.
              </p>

              <p>
                Les cookies et traceurs publicitaires non indispensables ne
                sont utilisés qu'après votre accord.
              </p>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <div className="font-semibold text-stone-900">
                  Votre choix concernant les cookies
                </div>

                <p className="mt-2">
                  Lors de votre première visite, vous pouvez{" "}
                  <strong>accepter</strong> ou <strong>refuser</strong> les
                  cookies publicitaires.
                </p>

                <p className="mt-2">
                  Le refus n'empêche pas de consulter le site, de vérifier les
                  disponibilités ou d'effectuer une réservation.
                </p>

                <p className="mt-2">
                  Votre choix peut être modifié ultérieurement grâce au bouton{" "}
                  <strong>« Gérer mes cookies »</strong> disponible sur le
                  site.
                </p>
              </div>
            </Section>

            {/* META */}
            <Section title="7. Pixel Meta — Facebook et Instagram">
              <p>
                Avec votre consentement, notre site utilise le{" "}
                <strong>Pixel Meta</strong>, fourni par Meta.
              </p>

              <p>
                Cet outil nous permet notamment de mieux comprendre
                l'efficacité de nos campagnes publicitaires diffusées sur
                Facebook et Instagram et de mesurer certaines interactions
                avec notre site.
              </p>

              <p>
                <strong>
                  Le Pixel Meta n'est chargé qu'après votre acceptation des
                  cookies publicitaires.
                </strong>
              </p>

              <p>
                Si vous refusez ces cookies, le Pixel Meta n'est pas chargé
                par notre site.
              </p>
            </Section>

            {/* DESTINATAIRES */}
            <Section title="8. Destinataires des données">
              <p>
                Vos données sont accessibles uniquement aux personnes et
                prestataires qui en ont besoin pour assurer les services
                concernés.
              </p>

              <p>Cela peut notamment concerner :</p>

              <ul className="list-disc list-inside space-y-2">
                <li>les Chalets Ty-Koad ;</li>
                <li>
                  nos prestataires techniques nécessaires à l'hébergement et
                  au fonctionnement du site ;
                </li>
                <li>Stripe pour les opérations de paiement ;</li>
                <li>
                  Meta lorsque vous avez accepté l'utilisation de ses
                  traceurs publicitaires.
                </li>
              </ul>

              <p>
                Nous ne vendons pas vos données personnelles.
              </p>
            </Section>

            {/* CONSERVATION */}
            <Section title="9. Durée de conservation">
              <p>
                Les données personnelles ne sont conservées que pendant la
                durée nécessaire à la finalité pour laquelle elles ont été
                collectées, puis, lorsque cela est nécessaire, pendant les
                durées imposées par les obligations légales, comptables ou
                fiscales applicables.
              </p>

              <p>
                Les demandes envoyées via le formulaire de contact sont
                conservées pendant la durée nécessaire au traitement et au
                suivi de la demande.
              </p>

              <p>
                Le choix relatif aux cookies est enregistré afin d'éviter de
                vous demander votre préférence à chaque page consultée.
              </p>
            </Section>

            {/* TRANSFERTS */}
            <Section title="10. Prestataires et transferts de données">
              <p>
                Certains prestataires techniques utilisés par le site peuvent
                traiter des données depuis des pays situés en dehors de
                l'Espace économique européen.
              </p>

              <p>
                Lorsque de tels transferts sont réalisés, ils doivent
                s'effectuer dans le respect des mécanismes prévus par la
                réglementation applicable en matière de protection des
                données.
              </p>
            </Section>

            {/* DROITS */}
            <Section title="11. Vos droits">
              <p>
                Conformément à la réglementation applicable en matière de
                protection des données personnelles, vous pouvez, selon les
                circonstances, disposer notamment des droits suivants :
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>droit d'accès à vos données ;</li>
                <li>droit de rectification ;</li>
                <li>droit à l'effacement ;</li>
                <li>droit à la limitation du traitement ;</li>
                <li>droit d'opposition ;</li>
                <li>droit à la portabilité lorsque celui-ci est applicable ;</li>
                <li>
                  droit de retirer votre consentement à tout moment lorsque
                  le traitement repose sur celui-ci.
                </li>
              </ul>

              <p>
                Pour exercer l'un de ces droits, vous pouvez nous contacter
                via notre{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </Section>

            {/* CNIL */}
            <Section title="12. Réclamation auprès de la CNIL">
              <p>
                Si vous estimez que le traitement de vos données personnelles
                ne respecte pas la réglementation applicable, vous disposez
                également du droit d'introduire une réclamation auprès de la
                Commission Nationale de l'Informatique et des Libertés
                (CNIL).
              </p>

              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Consulter le site de la CNIL ↗
              </a>
            </Section>

            {/* SECURITE */}
            <Section title="13. Sécurité">
              <p>
                Nous mettons en œuvre des mesures techniques et
                organisationnelles destinées à protéger les données
                personnelles contre l'accès non autorisé, la perte,
                l'altération ou la divulgation.
              </p>

              <p>
                Les paiements sont réalisés via une infrastructure de paiement
                spécialisée et sécurisée fournie par Stripe.
              </p>
            </Section>

            {/* CONTACT FINAL */}
            <div className="rounded-3xl bg-emerald-950 p-6 sm:p-8 text-white shadow-lg">
              <div className="text-xs uppercase tracking-[0.16em] text-emerald-200">
                Données personnelles
              </div>

              <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
                Une question sur vos données ?
              </h2>

              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-emerald-50/90">
                Vous pouvez nous contacter pour toute question concernant
                cette politique ou l'utilisation de vos données personnelles.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 md:p-7 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
        {title}
      </h2>

      <div className="mt-3 space-y-3 text-sm sm:text-[15px] leading-relaxed text-stone-700">
        {children}
      </div>
    </section>
  );
}
