"use client";

import Link from "next/link";
import { Marcellus } from "next/font/google";

const brand = Marcellus({ subsets: ["latin"], weight: "400" });

export default function Brand({ className = "" }) {
  return (
    <Link
      href="/"
      aria-label="Accueil — Les Chalets Ty-Koad"
      className={`
        group inline-flex items-center gap-2.5 sm:gap-3
        rounded-full
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-50
        transition
        ${className}
      `}
    >
      <Triskell className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-900 transition-transform group-hover:scale-105" />
      <span
        className={`
          ${brand.className}
          text-base sm:text-lg md:text-xl
          leading-none tracking-wide
          text-stone-900
        `}
      >
        Les Chalets{" "}
        <span className="text-emerald-900">
          Ty-Koad
        </span>
      </span>
    </Link>
  );
}

/** Triskell stylisé (SVG) */
function Triskell({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform="translate(12 12)">
        {/* bras 1 */}
        <g>
          <path d="M0 -6a6 6 0 1 1 -4.24 1.76" />
          <circle cx="0" cy="-6" r="1.4" fill="currentColor" stroke="none" />
        </g>
        {/* bras 2 */}
        <g transform="rotate(120)">
          <path d="M0 -6a6 6 0 1 1 -4.24 1.76" />
          <circle cx="0" cy="-6" r="1.4" fill="currentColor" stroke="none" />
        </g>
        {/* bras 3 */}
        <g transform="rotate(240)">
          <path d="M0 -6a6 6 0 1 1 -4.24 1.76" />
          <circle cx="0" cy="-6" r="1.4" fill="currentColor" stroke="none" />
        </g>
      </g>
    </svg>
  );
}
