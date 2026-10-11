"use client";

import { useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CATEGORIES } from "@/lib/homeSamples";

export function CategoryStrip() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-panel border border-edge rounded-xl px-3 py-3">
      <div ref={ref} className="flex gap-2 overflow-x-auto scroll-smooth pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Link href="/" className="flex flex-col items-center gap-1.5 w-[92px] shrink-0 group">
          <span className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white">
            <Icon name="apps" className="w-5 h-5" />
          </span>
          <span className="font-sans text-[11px] text-brand font-medium text-center leading-tight">Tous</span>
        </Link>

        {CATEGORIES.map((c) => (
          <Link
            key={c.label}
            href={`/recherche?q=${encodeURIComponent(c.label)}`}
            className="flex flex-col items-center gap-1.5 w-[92px] shrink-0 group"
          >
            <span className="w-12 h-12 rounded-full bg-card border border-edge flex items-center justify-center text-white group-hover:border-brand group-hover:text-brand">
              <Icon name={c.icon} className="w-5 h-5" />
            </span>
            <span className="font-sans text-[11px] text-white text-center leading-tight">{c.label}</span>
          </Link>
        ))}

        <Link href="/recherche" className="flex flex-col items-center gap-1.5 w-[92px] shrink-0 group">
          <span className="w-12 h-12 rounded-full bg-card border border-edge flex items-center justify-center text-white group-hover:border-brand group-hover:text-brand">
            <Icon name="more" className="w-5 h-5" />
          </span>
          <span className="font-sans text-[11px] text-white text-center leading-tight">Plus</span>
        </Link>
      </div>
      <button
        type="button"
        aria-label="Voir les catégories suivantes"
        onClick={() => ref.current?.scrollBy({ left: 400 })}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-night flex items-center justify-center shadow"
      >
        <Icon name="chevronRight" className="w-4 h-4" />
      </button>
    </section>
  );
}
