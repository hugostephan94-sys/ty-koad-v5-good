"use client";
import Link from "next/link";
import Brand from "./Brand";

export default function SiteHeader() {
  return (
    <header
      id="site-header"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2147483647 }}
      className="bg-white/90 backdrop-blur border-b border-emerald-100 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Brand />
        <nav className="hidden md:flex items-center gap-6 text-sm text-stone-700">
          <Link href="/nuit" className="hover:text-emerald-800">Douce nuit</Link>
          <Link href="/spa" className="hover:text-rose-700">Spa privatif</Link>
          <Link href="/autour" className="hover:text-sky-700">Autour</Link>
          <Link href="/gourmets" className="hover:text-emerald-800">Gourmets</Link>
          <Link href="/infos-pratiques" className="hover:text-emerald-800">Infos pratiques</Link>
          <Link href="/cadeau" className="hover:text-rose-700">Chèque cadeau</Link>
          <Link href="/contact" className="hover:text-sky-700">Contact</Link>
          <Link
            href="/reserver"
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
          >
            Réserver
          </Link>
        </nav>
        <Link
          href="/reserver"
          className="md:hidden px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm shadow-sm"
        >
          Réserver
        </Link>
      </div>
    </header>
  );
}
