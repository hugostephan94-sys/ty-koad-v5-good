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
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        {/* HERO + CARTES CHALETS */}
        <section className="space-y-6 sm:space-y-8">
          {/* HERO */}
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Douce nuit
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-700">
              Deux ambiances à Laz :{" "}
              <span className="font-medium">Ty-Koad Duo</span> —{" "}
              <strong>spa privatif pour 2</strong> — et{" "}
              <span className="font-medium">Ty-Koad</span> (2 chambres / 2 SDB)
              pour venir en famille ou entre amis.
            </p>
          </header>

          {/* TY-KOAD DUO + TY-KOAD */}
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 items-start">
            {/* TY-KOAD DUO */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              {/* Galerie DUO */}
              <PhotoCarousel
                images={photosDuo}
                heightClass="h-56 sm:h-64 md:h-72"
              />

              <div className="p-5 sm:p-6 md:p-7">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-100 text-emerald-900">
                    Spa privatif
                  </span>
                </div>
                <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
                  Ty-Koad Duo — spa privatif pour 2
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-600">
                  Chambre 180 × 200 cm (king)
                </p>

                <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                  <li>
                    <strong>Spa privatif</strong> : jets massants &
                    lumières d’ambiance
                  </li>
                  <li>
                    Lit <strong>180 × 200 cm (king)</strong>, ambiance cocon
                  </li>
                  <li>
                    Grande TV + <strong>Netflix</strong>
                  </li>
                  <li>
                    <strong>Internet</strong> pour télétravail ou streaming
                  </li>
                  <li>Petit jardin privatif</li>
                  <li>Animaux autorisés</li>
                </ul>

                <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm">
                  <div className="font-medium">Infos clés</div>
                  <div className="mt-1">
                    <strong>Accès illimité au spa privatif</strong> •{" "}
                    110 € (dim–jeu) • 130 € (ven–sam) —{" "}
                    <em>min. 1 nuit</em> — caution 500 €
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    href="/reserver"
                    className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm transition"
                  >
                    Réserver le Duo
                  </Link>
                </div>
              </div>
            </div>

            {/* TY-KOAD 2 CH / 2 SDB */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              {/* Galerie FAMILLE */}
              <PhotoCarousel
                images={photosC1}
                heightClass="h-56 sm:h-64 md:h-72"
              />

              <div className="p-5 sm:p-6 md:p-7">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  Ty-Koad — 2 chambres / 2 SDB
                </h2>
                <ul className="mt-3 text-sm text-stone-700 list-disc list-inside space-y-1">
                  <li>
                    <strong>2 chambres</strong> : l’une avec{" "}
                    <strong>2 lits simples</strong>, l’autre avec un{" "}
                    <strong>lit double</strong>
                  </li>
                  <li>
                    Chaque chambre dispose de sa{" "}
                    <strong>salle d’eau</strong> et de ses{" "}
                    <strong>toilettes privatives</strong>
                  </li>
                  <li>Petit jardin privatif</li>
                  <li>Animaux autorisés</li>
                </ul>

                <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm">
                  <div className="font-medium">Infos clés</div>
                  <div className="mt-1">
                    70 € / nuit — <em>min. 2 nuits</em> — caution 150 €
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    href="/reserver"
                    className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm transition"
                  >
                    Réserver Ty-Koad
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARATIF EXPRESS */}
        <section className="mt-10">
          <h3 className="text-lg sm:text-xl font-semibold">
            Comparatif express
          </h3>
          <div className="mt-4 overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-sm">
            <table className="min-w-full text-xs sm:text-sm">
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
                    <strong>Spa privatif</strong>, lit 180×200, TV + Netflix,
                    Internet
                  </td>
                  <td className="p-3">
                    110 € (dim–jeu) • 130 € (ven–sam) — min 1 nuit — caution
                    500 €
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium">Ty-Koad</td>
                  <td className="p-3">
                    Jusqu’à 4 (selon configuration)
                  </td>
                  <td className="p-3">2 chambres • 2 SDB</td>
                  <td className="p-3">
                    2 chambres avec{" "}
                    <strong>salle d’eau + WC privatifs</strong> • petit jardin
                  </td>
                  <td className="p-3">
                    70 € / nuit — min 2 nuits — caution 150 €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
