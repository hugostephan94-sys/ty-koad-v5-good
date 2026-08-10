import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* COPYRIGHT */}
          <div className="text-xs sm:text-sm text-stone-500">
            © {new Date().getFullYear()} Chalets Ty-Koad — Tous droits réservés.
          </div>

          {/* LIENS */}
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-stone-600"
            aria-label="Liens du pied de page"
          >
            <Link
              href="/infos-pratiques"
              className="hover:text-emerald-800 transition"
            >
              Infos pratiques
            </Link>

            <Link
              href="/caution"
              className="hover:text-emerald-800 transition"
            >
              Caution
            </Link>

            <Link
              href="/cgv"
              className="hover:text-emerald-800 transition"
            >
              CGV
            </Link>

            <Link
              href="/confidentialite"
              className="hover:text-emerald-800 transition"
            >
              Confidentialité & cookies
            </Link>

            <Link
              href="/contact"
              className="hover:text-emerald-800 transition"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* PETITE LIGNE DE RÉASSURANCE */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap gap-x-4 gap-y-2 text-[11px] sm:text-xs text-stone-500">
          <span>📍 Laz · Finistère</span>
          <span>🔒 Paiement sécurisé via Stripe</span>
          <span>🔑 Arrivée autonome</span>
        </div>
      </div>
    </footer>
  );
}
