"use client";

import Image from "next/image";
import Link from "next/link";

export default function Brand({ className = "" }) {
  return (
    <Link
      href="/"
      aria-label="Accueil — Les Chalets Ty-Koad"
      className={`
        inline-flex items-center
        rounded-xl
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-500
        focus-visible:ring-offset-2
        focus-visible:ring-offset-white
        transition
        ${className}
      `}
    >
      <div className="relative h-[52px] w-[200px] sm:h-[58px] sm:w-[230px] md:h-[62px] md:w-[250px]">
        <Image
          src="/images/logo-tykoad-header.png"
          alt="Les Chalets Ty-Koad"
          fill
          priority
          sizes="(max-width: 640px) 200px, (max-width: 768px) 230px, 250px"
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
