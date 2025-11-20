"use client";
import Link from "next/link";
import { Bath, MapPin, UtensilsCrossed } from "lucide-react";

function Card({ icon:Icon, title, desc, href, cta, badge }) {
  return (
    <article className="bg-white rounded-3xl border border-stone-200 p-5 hover:shadow-sm transition">
      {badge && (
        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
          {badge}
        </span>
      )}
      <div className="mt-2 flex items-start gap-3">
        <div className="mt-1 shrink-0">
          <Icon className="w-6 h-6 text-emerald-900" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-stone-600">{desc}</p>
          <div className="mt-3">
            <Link
              href={href}
              className="inline-flex px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function InspirationBlocks() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
      <Card
        icon={Bath}
        title="Spa privatif"
        desc="Jets, lumières & détente rien que pour vous, accès direct depuis le Duo."
        href="/spa"
        cta="Découvrir le spa"
        badge="Bien-être"
      />
      <Card
        icon={MapPin}
        title="Autour de Laz"
        desc="Château de Trévarez à 5 min, randos, vallée de l’Aulne, spots nature & balades."
        href="/autour"
        cta="Découvrir les alentours"
        badge="À proximité"
      />
      <Card
        icon={UtensilsCrossed}
        title="Gourmets & petits-déjeuners"
        desc="Plateaux (charcuterie, fromages, fruits de mer) et petits-déjeuners sur commande."
        href="/gourmets"
        cta="Voir l’offre"
        badge="À la carte"
      />
    </section>
  );
}
