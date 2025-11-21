"use client";
import { useState } from "react";
import Link from "next/link";
import Brand from "./Brand";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/nuit", label: "Douce nuit", hover: "hover:text-emerald-800" },
  { href: "/spa", label: "Spa privatif", hover: "hover:text-rose-700" },
  { href: "/autour", label: "Autour", hover: "hover:text-sky-700" },
  { href: "/gourmets", label: "Gourmets", hover: "hover:text-emerald-800" },
  {
    href: "/infos-pratiques",
    label: "Infos pratiques",
    hover: "hover:text-emerald-800",
  },
  { href: "/cadeau", label: "Chèque cadeau", hover: "hover:text-rose-700" },
  { href: "/contact", label: "Contact", hover: "hover:text-sky-700" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header
      id="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2147483647,
      }}
      className="bg-white/90 backdrop-blur border-b border-emerald-100 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Brand />

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-stone-700">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={l.hover + " transition-colors"}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reserver"
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm text-sm font-medium"
          >
            Réserver
          </Link>
        </nav>

        {/* BOUTON MOBILE (burger) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white/80 px-2.5 py-1.5 text-emerald-900 shadow-sm"
          aria-label="Ouvrir le menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <nav className="md:hidden border-t border-emerald-100 bg-white/95">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm text-stone-800">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="py-1.5 flex items-center justify-between"
              >
                <span>{l.label}</span>
              </Link>
            ))}

            <div className="pt-2 mt-1 border-t border-stone-100">
              <Link
                href="/reserver"
                onClick={closeMenu}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-sm"
              >
                Réserver
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
