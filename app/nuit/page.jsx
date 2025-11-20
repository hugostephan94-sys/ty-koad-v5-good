import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import PhotoCarousel from "../../components/PhotoCarousel";

export default function NuitPage() {
  // --- Listes d’images pour les carrousels ---
  const photosDuo = Array.from({ length: 20 }, (_, i) => ({
    src: `/images/chalets/c2/${i + 1}.jpg`,
    alt: `Ty-Koad Duo — photo ${i + 1}`,
  }));
  const photosC1 = Array.from({ length: 9 }, (_, i) => ({
    src: `/images/chalets/c1/${i + 1}.jpg`,
    alt: `Ty-Koad (2 chambres) — photo ${i + 1}`,
  }));

  return (
    <div>
      <SiteHeader />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Douce nuit</h1>
        <p className="mt-3 text-stone-600">
          Deux ambiances à Laz : <span className="font-medium">Ty-Koad Duo</span> —{" "}
          <strong>spa privatif pour 2</strong> — et <span className="font-medium">Ty-Koad</span> (2 chambres / 2 SDB)
          pour venir en famille ou entre amis.
        </p>
      </section>

      {/* TY-KOAD DUO */}
      <section className="max-w-6xl mx-auto px-4 pb-12 md:pb-16 grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
          {/* Galerie DUO */}
          <PhotoCarousel images={photosDuo} heightClass="h-56 md:h-64" />
          <div className="p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-900">
                Spa privatif
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold">Ty-Koad Duo — spa privatif pour 2</h2>
            <p className="text-sm text-stone-600 mt-1">Chambre 180 × 200 cm (king)</p>

            <ul className="mt-3 text-stone-700 list-disc list-inside space-y-1 text-sm">
              <li><strong>Spa privatif</strong> : jets massants & lumières d’ambiance</li>
              <li>Lit <strong>180 × 200 cm (king)</strong>, ambiance cocon</li>
              <li>Grande TV + <strong>Netflix</strong></li>
              <li><strong>Internet</strong> pour télétravail ou streaming</li>
              <li>Petit jardin privatif</li>
              <li>Animaux autorisés</li>
            </ul>

            <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm">
              <div className="font-medium">Infos clés</div>
              <div className="mt-1">
                <strong>Accès illimité au spa privatif</strong> • 130 € (dim-jeu) • 150 € (ven-sam) — <em>min. 1 nuit</em> — caution 500 €
              </div>
            </div>

            <div className="mt-5">
              <Link href="/reserver" className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">Réserver le Duo</Link>
            </div>
          </div>
        </div>

        {/* TY-KOAD 2 CH / 2 SDB */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
          {/* Galerie FAMILLE */}
          <PhotoCarousel images={photosC1} heightClass="h-56 md:h-64" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold">Ty-Koad — 2 chambres / 2 SDB</h2>
            <ul className="mt-3 text-stone-700 list-disc list-inside space-y-1 text-sm">
              <li>
                <strong>2 chambres</strong> : l’une avec <strong>2 lits simples</strong>, l’autre avec
                un <strong>lit double</strong>
              </li>
              <li>
                Chaque chambre dispose de sa <strong>salle d’eau</strong> et de ses{" "}
                <strong>toilettes privatives</strong>
              </li>
              <li>Petit jardin privatif</li>
              <li>Animaux autorisés</li>
            </ul>

            <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm">
              <div className="font-medium">Infos clés</div>
              <div className="mt-1">70 € / nuit — <em>min. 2 nuits</em> — caution 150 €</div>
            </div>

            <div className="mt-5">
              <Link href="/reserver" className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">Réserver Ty-Koad</Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIF EXPRESS */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-xl font-semibold">Comparatif express</h3>
        <div className="mt-4 overflow-x-auto bg-white rounded-2xl border border-stone-200">
          <table className="min-w-full text-sm">
            <thead className="bg-stone-50 text-stone-600">
              <tr>
                <th className="text-left p-3">Chalet</th>
                <th className="text-left p-3">Capacité</th>
                <th className="text-left p-3">Chambres / SDB</th>
                <th className="text-left p-3">Points forts</th>
                <th className="text-left p-3">Tarifs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-medium">Ty-Koad Duo</td>
                <td className="p-3">2 personnes</td>
                <td className="p-3">1 chambre • 1 SDB</td>
                <td className="p-3">
                  <strong>Spa privatif</strong>, lit 180×200, TV + Netflix, Internet
                </td>
                <td className="p-3">130 € (dim-jeu) • 150 € (ven-sam) — min 1 nuit — caution 500 €</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-medium">Ty-Koad</td>
                <td className="p-3">Jusqu’à 4 (selon configuration)</td>
                <td className="p-3">2 chambres • 2 SDB</td>
                <td className="p-3">
                  2 chambres avec <strong>salle d’eau + WC privatifs</strong> • petit jardin
                </td>
                <td className="p-3">70 € / nuit — min 2 nuits — caution 150 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
