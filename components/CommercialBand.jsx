// components/CommercialBand.jsx
import Link from "next/link";

export default function CommercialBand({ compact = false }) {
  return (
    <section
      className={`rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-4 sm:p-5 shadow-sm ${
        compact ? "" : "mt-4"
      }`}
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/80 border border-stone-200 p-4">
          <div className="text-sm font-semibold text-emerald-900">
            💚 Meilleur prix en direct
          </div>
          <div className="mt-1 text-xs sm:text-sm text-stone-700">
            Remises auto : <b>−10%</b> dès <b>2 nuits</b> (Duo) / dès <b>5 nuits</b> (Ty-Koad).
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 border border-stone-200 p-4">
          <div className="text-sm font-semibold text-emerald-900">
            🔒 Paiement sécurisé
          </div>
          <div className="mt-1 text-xs sm:text-sm text-stone-700">
            Paiement en ligne via <b>Stripe</b> + e-mail de confirmation immédiat.
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 border border-stone-200 p-4">
          <div className="text-sm font-semibold text-emerald-900">
            🧾 Caution simplifiée
          </div>
          <div className="mt-1 text-xs sm:text-sm text-stone-700">
            <b>Empreinte bancaire</b> (aucun débit) — lien envoyé <b>24h avant l’arrivée</b>.
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/reserver"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-sm transition"
          >
            Réserver maintenant
          </Link>
          <Link
            href="/cadeau"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
          >
            Offrir un chèque cadeau 🎁
          </Link>
          <Link
            href="/infos-pratiques"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
          >
            Infos pratiques
          </Link>
        </div>
      )}
    </section>
  );
}
