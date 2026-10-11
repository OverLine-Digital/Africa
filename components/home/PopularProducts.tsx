"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatPrice, type HomeProduct } from "@/lib/homeSamples";

const TABS = ["Tout", "Électronique", "Mode", "Maison & Jardin"];

export function PopularProducts({ products }: { products: HomeProduct[] }) {
  const [tab, setTab] = useState(TABS[0]);

  const shown = useMemo(() => {
    if (tab === TABS[0]) return products;
    return products.filter((p) => p.category?.toLowerCase().includes(tab.toLowerCase().split(" ")[0]));
  }, [products, tab]);

  return (
    <section className="bg-panel border border-edge rounded-xl p-4">
      <h2 className="font-sans text-lg font-semibold text-white mb-3">Produits populaires</h2>
      <div className="flex items-center justify-between border-b border-edge mb-4 gap-3">
        <div className="flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-sans text-[13px] pb-2.5 border-b-2 whitespace-nowrap ${
                tab === t ? "border-brand text-white font-medium" : "border-transparent text-muted hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Link href="/recherche" className="font-sans text-xs text-brand hover:underline shrink-0 pb-2.5 flex items-center gap-1">
          Voir tout <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {shown.map((p) => (
          <Link key={p.id} href={p.href} className="rounded-lg bg-card border border-edge overflow-hidden hover:border-brand/50 flex flex-col">
            <div className="relative h-[120px] bg-gradient-to-br from-[#1B2A45] to-[#0D1729] flex items-center justify-center">
              <Icon name="bag" className="w-10 h-10 text-white/25" />
              <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-night/70 flex items-center justify-center">
                <Icon name="heart" className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="p-2.5 flex flex-col gap-0.5">
              <p className="font-sans text-[13px] font-medium text-white leading-snug">{p.name}</p>
              {p.category && <p className="font-sans text-[11px] text-muted">{p.category}</p>}
              {p.price != null && (
                <p className="font-sans text-sm font-bold text-white mt-1">{formatPrice(p.price, p.currency)}</p>
              )}
            </div>
          </Link>
        ))}
        {shown.length === 0 && (
          <p className="col-span-full text-center font-sans text-sm text-muted py-10">Aucun produit pour l&apos;instant.</p>
        )}
      </div>
    </section>
  );
}
