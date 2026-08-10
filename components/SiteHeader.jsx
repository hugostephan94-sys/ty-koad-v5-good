"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import { Menu, X } from "lucide-react";

const links = [
  {
    href: "/nuit",
    label: "Nos chalets",
  },
  {
    href: "/spa",
    label: "Spa privatif",
  },
  {
    href: "/autour",
    label: "Autour",
  },
  {
    href: "/gourmets",
    label: "Gourmets",
  },
  {
    href: "/infos-pratiques",
    label: "Infos pratiques",
  },
  {
    href: "/cadeau",
    label: "Chèque cadeau",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  const isActive = (href) => {
    if (!pathname) return false;

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-[100] border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 sm:h-[72px] flex items-center justify-between gap-5">
          {/* LOGO */}
          <div className="shrink-0">
            <Brand />
          </div>

          {/* NAV DESKTOP */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-5 text-sm"
            aria-label="Navigation principale"
          >
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative whitespace-nowrap py-2 transition-colors",
                    active
                      ? "font-semibold text-emerald-900"
                      : "font-medium text-stone-600 hover:text-emerald-800",
                  ].join(" ")}
                >
                  {link.label}

                  {active && (
                    <span className="absolute inset-x-0 -bottom-[17px] h-0.5 rounded-full bg-emerald-700" />
                  )}
                </Link>
              );
            })}

            {/* CTA RÉSERVER */}
            <Link
              href="/reserver"
              className={[
                "ml-1 inline-flex items-center justify-center rounded-xl px-4 py-2.5",
                "text-sm font-semibold shadow-sm transition",
                pathname?.startsWith("/reserver")
                  ? "bg-emerald-900 text-white"
                  : "bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-md",
              ].join(" ")}
            >
              Voir les disponibilités
            </Link>
          </nav>

          {/* BOUTON MOBILE */}
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-900 shadow-sm transition hover:bg-emerald-50"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-emerald-100 bg-white"
          aria-label="Navigation mobile"
        >
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col">
              {links.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={[
                      "flex items-center justify-between rounded-xl px-3 py-3 text-sm transition",
                      active
                        ? "bg-emerald-50 font-semibold text-emerald-900"
                        : "font-medium text-stone-700 hover:bg-stone-50 hover:text-emerald-900",
                    ].join(" ")}
                  >
                    <span>{link.label}</span>

                    <span
                      className={
                        active
                          ? "text-emerald-700"
                          : "text-stone-300"
                      }
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* CTA MOBILE */}
            <div className="mt-3 border-t border-stone-100 pt-4">
              <Link
                href="/reserver"
                onClick={closeMenu}
                className="inline-flex w-full items-center justify-between rounded-xl bg-emerald-700 px-5 py-3.5 text-white shadow-sm transition hover:bg-emerald-800"
              >
                <span className="font-semibold">
                  Voir les disponibilités
                </span>

                <span className="text-sm text-emerald-100">
                  dès 70 € →
                </span>
              </Link>
            </div>

            {/* LIEN CADEAU MOBILE */}
            <div className="mt-3 text-center">
              <Link
                href="/cadeau"
                onClick={closeMenu}
                className="text-xs font-medium text-stone-500 hover:text-emerald-800 transition"
              >
                🎁 Offrir un séjour aux Chalets Ty-Koad
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
