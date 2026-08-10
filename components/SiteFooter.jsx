"use client";

import Link from "next/link";

const OPEN_COOKIE_SETTINGS_EVENT = "tykoad:open-cookie-settings";

export default function SiteFooter() {
  function openCookieSettings() {
    window.dispatchEvent(
      new Event(OPEN_COOKIE_SETTINGS_EVENT)
    );
  }

  return (
    <footer className="mt-10 border-t border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* COPYRIGHT */}
          <div className="text-xs sm:text-sm text-stone-500">
            © {new Date().getFullYear()} Chalets Ty-Koad — Tous droits
            réservés.
          </div>

          {/* LIENS */}
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-stone-600"
            aria-label="Liens du pied de page"
          >
            <Link
              href="/infos-pratiques"
              className="transition hover:text-emerald-800"
            >
              Infos pratiques
            </Link>

            <Link
              href="/caution"
              className="transition hover:text-emerald-800"
            >
              Caution
            </Link>

            <Link
              href="/cgv"
              className="transition hover:text-emerald-800"
            >
              CGV
            </Link>

            <Link
              href="/confidentialite"
              className="transition hover:text-emerald-800"
            >
              Confidentialité
            </Link>

            <button
              type="button"
              onClick={openCookieSettings}
              className="text-left transition hover:text-emerald-800"
            >
              Gérer mes cookies
            </button>

            <Link
              href="/contact"
              className="transition hover:text-emerald-800"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* RÉASSURANCE */}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-stone-100 pt-4 text-[11px] sm:text-xs text-stone-500">
          <span>📍 Laz · Finistère</span>
          <span>🔒 Paiement sécurisé via Stripe</span>
          <span>🔑 Arrivée autonome</span>
        </div>
      </div>
    </footer>
  );
}
