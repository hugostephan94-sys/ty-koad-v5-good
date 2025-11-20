import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

function Card({ title, price, note }) {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {price && <div className="text-emerald-900 font-medium">{price}</div>}
      </div>
      {note && <div className="mt-1 text-xs text-stone-500">{note}</div>}
    </div>
  );
}

export default function GourmetsPage(){
  return (
    <div>
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Gourmets</h1>
        <p className="mt-3 text-stone-600">
          Envie d’un plateau à partager ou d’un <strong>petit déjeuner</strong> au chalet ?
          Commandez facilement ci-dessous. Vous recevrez ensuite un <strong>lien de paiement sécurisé</strong> par e-mail.
        </p>
      </section>

      {/* --- BLOCS COMMANDE --- */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-8">
        {/* PLATEAUX */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <div className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900">
            Pour 2 personnes
          </div>
          <h2 className="mt-2 text-2xl font-semibold">Plateaux</h2>
          <p className="mt-2 text-stone-700 text-sm">
            Choisissez vos plateaux pour 2. <strong>Délais</strong> : J-1 (charcuterie, fromage, mix)
            • <strong>J-5</strong> (fruits de mer). Les plateaux ne sont pas modifiables.
          </p>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Card title="Charcuterie (x2)" price="30€" note="Commande J-1" />
            <Card title="Fromage (x2)" price="28€" note="Commande J-1" />
            <Card title="Mixte (x2)" price="35€" note="Commande J-1" />
            <Card title="Fruits de mer (x2)" price="65€" note="Commande J-5" />
          </div>

          <div className="mt-5 bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm">
            <div className="font-medium">Comment ça marche ?</div>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-stone-700">
              <li>Remplissez le formulaire (prénom de la réservation, e-mail, date, heure approximative, choix du plateau).</li>
              <li>Vous recevez un <strong>lien de paiement sécurisé</strong> par e-mail.</li>
              <li>Nous préparons et livrons au chalet à l’heure convenue.</li>
            </ol>
          </div>

          <div className="mt-5">
            <a
              href="https://tally.so/r/w4WDWk"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center px-4 py-3 rounded-xl bg-emerald-900 text-white"
            >
              Commander un plateau
            </a>
          </div>

          <p className="mt-3 text-[12px] text-stone-500">
            Indiquez exactement le <em>prénom</em> utilisé lors de votre réservation pour faciliter le traitement.
          </p>
        </div>

        {/* PETIT DÉJEUNER */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <div className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-900">
            À commander la veille
          </div>
          <h2 className="mt-2 text-2xl font-semibold">Petit déjeuner</h2>
          <p className="mt-2 text-stone-700 text-sm">
            Réservez votre Petit Déjeuner : indiquez l’<strong>email</strong>, le <strong>prénom</strong> (comme sur la
            réservation), la <strong>date</strong>, l’<strong>heure</strong>, le <strong>nombre</strong> de petits déjeuners et vos <strong>choix</strong> (viennoiseries, pain & confiture, boissons chaudes, œufs, fromage, bacon…).
          </p>

          <div className="mt-5 bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm">
            <div className="font-medium">Étapes</div>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-stone-700">
              <li>Complétez le formulaire (coordonnées & préférences).</li>
              <li>Recevez le <strong>lien de paiement sécurisé</strong> par e-mail.</li>
              <li>Votre petit déjeuner est préparé à l’heure indiquée.</li>
            </ol>
          </div>

          <div className="mt-5">
            <a
              href="https://tally.so/r/npjkGB"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center px-4 py-3 rounded-xl bg-emerald-900 text-white"
            >
              Commander un petit déjeuner
            </a>
          </div>

          <p className="mt-3 text-[12px] text-stone-500">
            Merci de commander <strong>au plus tard la veille</strong> pour nous permettre de préparer dans les meilleures conditions.
          </p>
        </div>
      </section>

      {/* CTA complémentaires */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 rounded-3xl border border-emerald-200 p-6 text-sm text-emerald-950">
          <p>Envie d’offrir une expérience gourmande ? Ajoutez un plateau ou un petit déjeuner dans un <strong>chèque cadeau</strong>.</p>
          <div className="mt-3 flex gap-3">
            <Link href="/cadeau" className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">Créer un cadeau</Link>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-stone-200 p-6 text-sm">
          <p>Vous avez déjà réservé ? Parfait — vos commandes seront associées à votre séjour.</p>
          <div className="mt-3 flex gap-3">
            <Link href="/reserver" className="px-4 py-2 rounded-xl border">Accéder à la réservation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
