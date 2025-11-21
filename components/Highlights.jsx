import Link from "next/link";

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-900">
      {children}
    </span>
  );
}

function IconWrap({ children }) {
  return (
    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-900 inline-flex items-center justify-center shadow-sm">
      {children}
    </div>
  );
}

export default function Highlights() {
  return (
    <>
      {/* 3 tuiles : Spa + Autour + Gourmets */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-10 sm:pt-10 sm:pb-12 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {/* SPA PRIVATIF */}
          <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl transition">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-50/70 via-transparent to-stone-50" />
            <div className="relative">
              <IconWrap>
                {/* icône bulles */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="7" cy="6" r="2" />
                  <circle cx="14" cy="4" r="2" />
                  <circle cx="18" cy="9" r="2" />
                  <path d="M3 18c2.5-2 6.5-2 9 0s6.5 2 9 0" />
                </svg>
              </IconWrap>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold">
                Spa privatif
              </h3>
              <p className="mt-1 text-stone-600 text-sm">
                Jets massants, lumières d’ambiance — accessible depuis la
                chambre du Duo.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>Moment détente</Chip>
                <Chip>Romance</Chip>
                <Chip>Ambiance</Chip>
              </div>
              <div className="mt-5">
                <Link
                  href="/spa"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-3 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
                >
                  Découvrir
                </Link>
              </div>
            </div>
          </div>

          {/* QUE FAIRE AUX ALENTOURS */}
          <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl transition">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-50/70 via-transparent to-stone-50" />
            <div className="relative">
              <IconWrap>
                {/* icône boussole */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 8-4 8-4-4 8-4Z" />
                </svg>
              </IconWrap>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold">
                Que faire aux alentours
              </h3>
              <p className="mt-1 text-stone-600 text-sm">
                Château de Trévarez (5 min), Huelgoat, Monts d’Arrée, Locronan,
                Douarnenez…
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>Nature</Chip>
                <Chip>Balades</Chip>
                <Chip>Patrimoine</Chip>
              </div>
              <div className="mt-5">
                <Link
                  href="/autour"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-3 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
                >
                  Toutes les idées
                </Link>
              </div>
            </div>
          </div>

          {/* GOURMETS (plateaux + petits-déjeuners) */}
          <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl transition">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50/70 via-transparent to-stone-50" />
            <div className="relative">
              <IconWrap>
                {/* icône cloche / service */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 7a5 5 0 0 1 5 5h-10a5 5 0 0 1 5-5Z" />
                  <path d="M3 18h18" />
                  <path d="M12 3v2" />
                </svg>
              </IconWrap>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold">
                Gourmets
              </h3>
              <p className="mt-1 text-stone-600 text-sm">
                Plateaux <em>et</em> petits-déjeuners au chalet. Commande la
                veille (fruits de mer J-5).
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>Charcuterie 30€</Chip>
                <Chip>Fromage 28€</Chip>
                <Chip>Mixte 35€</Chip>
                <Chip>Fruits de mer 65€</Chip>
                <Chip>Petit-déj</Chip>
              </div>

              {/* Boutons : les 2 “Commander …” alignés & sans couleur, “Voir les détails” en vert */}
              <div className="mt-5 space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://forms.gle/gJFHo7V5pjmBAnFL7"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center px-3 py-2 rounded-xl border border-stone-300 text-sm text-stone-800 bg-white hover:bg-stone-50 transition"
                  >
                    Commander un plateau
                  </a>
                  <a
                    href="https://forms.gle/axNTTBQz54aiGeQS7"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center px-3 py-2 rounded-xl border border-stone-300 text-sm text-stone-800 bg-white hover:bg-stone-50 transition"
                  >
                    Commander un petit déjeuner
                  </a>
                </div>
                <div>
                  <Link
                    href="/gourmets"
                    className="inline-flex w-full sm:w-auto items-center justify-center px-3 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau chèque cadeau — uniquement “Créer un cadeau” */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-sky-50 p-5 sm:p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="max-w-xl">
              <div className="text-[11px] sm:text-xs font-semibold text-emerald-900 uppercase tracking-wide">
                Nouveau
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1">
                Offrir un chèque cadeau
              </h3>
              <p className="text-stone-700 text-sm mt-1">
                Choix du chalet, options (fruits de mer, champagne, pétales)… PDF
                prêt à imprimer.
              </p>
            </div>
            <div className="w-full md:w-auto flex gap-3">
              <Link
                href="/cadeau"
                className="inline-flex w-full md:w-auto items-center justify-center px-4 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
              >
                Créer un cadeau
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
