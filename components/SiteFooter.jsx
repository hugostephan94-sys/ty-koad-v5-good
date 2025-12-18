import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-[11px] sm:text-xs text-stone-500 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Chalets Ty-Koad — Tous droits réservés.
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/infos-pratiques" className="hover:text-emerald-800 underline">
              Infos pratiques
            </Link>
            <Link href="/caution" className="hover:text-emerald-800 underline">
              Caution
            </Link>
            <Link href="/cgv" className="hover:text-emerald-800 underline">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
