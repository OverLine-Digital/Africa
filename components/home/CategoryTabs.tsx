"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PriceWithConversion } from "@/components/ui/PriceWithConversion";
import type { SupportedCurrency } from "@/lib/currency";

type Product = { id: string; name: string; category: string | null; price: number | null; currency: string; company_id: string };
type Company = { id: string; name: string; country: string | null; verification_status: string; role: string | null };
type Boutique = { id: string; name: string; slug: string; category: string };
type Freelancer = { id: string; headline: string | null; service_categories: string[]; full_name: string };

type Tab = "produits" | "entreprises" | "boutique" | "freelancer" | "commercant";

const TABS: { key: Tab; label: string }[] = [
  { key: "produits", label: "Produits" },
  { key: "entreprises", label: "Entreprises" },
  { key: "boutique", label: "Boutique" },
  { key: "freelancer", label: "Freelancer" },
  { key: "commercant", label: "Commerçant" },
];

const PRODUCT_FILTERS = ["Électronique", "Beauté & Cosmétique", "Alimentation", "Vêtements", "Maison & Décoration"];
const ENTREPRISE_FILTERS = ["fournisseur", "grossiste", "distributeur", "fabricant", "importateur"];
const FREELANCER_FILTERS = ["Traduction", "Agent indépendant", "Comptabilité", "Design graphique", "Conseil"];

export function CategoryTabs({
  products,
  companies,
  boutiques,
  freelancers,
}: {
  products: Product[];
  companies: Company[];
  boutiques: Boutique[];
  freelancers: Freelancer[];
}) {
  const [tab, setTab] = useState<Tab>("produits");
  const [filter, setFilter] = useState<string | null>(null);

  const filters = tab === "produits" ? PRODUCT_FILTERS : tab === "entreprises" ? ENTREPRISE_FILTERS : tab === "freelancer" ? FREELANCER_FILTERS : [];

  const filteredProducts = useMemo(
    () => (filter ? products.filter((p) => p.category?.toLowerCase().includes(filter.toLowerCase())) : products),
    [products, filter]
  );
  const filteredCompanies = useMemo(
    () => (filter ? companies.filter((c) => c.role === filter) : companies),
    [companies, filter]
  );
  const filteredFreelancers = useMemo(
    () => (filter ? freelancers.filter((f) => f.service_categories?.some((c) => c.toLowerCase().includes(filter.toLowerCase()))) : freelancers),
    [freelancers, filter]
  );
  const commercants = useMemo(() => companies.filter((c) => c.role === "commercant" || c.role === "vendeur"), [companies]);

  return (
    <div>
      <div className="flex gap-1 border-b border-line mb-4 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key);
              setFilter(null);
            }}
            className={`font-sans text-sm px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
              tab === t.key ? "border-indigo text-indigo font-medium" : "border-transparent text-ink/60 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filters.length > 0 && (
        <div className="flex gap-2 mb-5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(filter === f ? null : f)}
              className={`font-sans text-xs rounded-full px-3 py-1.5 border transition-colors ${
                filter === f ? "border-indigo bg-indigo/10 text-indigo" : "border-line text-ink/60 hover:border-ink/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {tab === "produits" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredProducts.map((p) => (
            <Link key={p.id} href={`/entreprise/${p.company_id}`} className="bg-white border border-line rounded-lg p-4 hover:shadow-sm transition-shadow">
              <p className="font-sans text-sm font-medium text-ink mb-1">{p.name}</p>
              {p.price && <PriceWithConversion amount={p.price} currency={(p.currency as SupportedCurrency) ?? "USD"} />}
            </Link>
          ))}
          {filteredProducts.length === 0 && <EmptyState label="Aucun produit pour l'instant." />}
        </div>
      )}

      {tab === "entreprises" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredCompanies.map((c) => (
            <Link key={c.id} href={`/entreprise/${c.id}`} className="bg-white border border-line rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
              <div>
                <p className="font-sans text-sm font-medium text-ink">{c.name}</p>
                <p className="font-sans text-xs text-ink/50">{c.country} · {c.role}</p>
              </div>
              {c.verification_status === "verified" && <span className="text-teal text-sm">✓</span>}
            </Link>
          ))}
          {filteredCompanies.length === 0 && <EmptyState label="Aucune entreprise pour l'instant." />}
        </div>
      )}

      {tab === "boutique" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {boutiques.map((b) => (
            <Link key={b.id} href={`/boutique/${b.slug}`} className="bg-white border border-line rounded-lg p-4 hover:shadow-sm transition-shadow">
              <p className="font-sans text-sm font-medium text-ink mb-1">{b.name}</p>
              <p className="font-sans text-xs text-ink/50">{b.category}</p>
            </Link>
          ))}
          {boutiques.length === 0 && <EmptyState label="Aucune boutique pour l'instant." />}
        </div>
      )}

      {tab === "freelancer" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredFreelancers.map((f) => (
            <Link key={f.id} href={`/profil/${f.id}`} className="bg-white border border-line rounded-lg p-4 hover:shadow-sm transition-shadow">
              <p className="font-sans text-sm font-medium text-ink">{f.headline ?? f.full_name}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {f.service_categories?.slice(0, 3).map((c) => (
                  <span key={c} className="font-sans text-[10px] text-indigo bg-indigo/10 rounded-full px-2 py-0.5">{c}</span>
                ))}
              </div>
            </Link>
          ))}
          {filteredFreelancers.length === 0 && <EmptyState label="Aucun freelance pour l'instant." />}
        </div>
      )}

      {tab === "commercant" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commercants.map((c) => (
            <Link key={c.id} href={`/entreprise/${c.id}`} className="bg-white border border-line rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
              <div>
                <p className="font-sans text-sm font-medium text-ink">{c.name}</p>
                <p className="font-sans text-xs text-ink/50">{c.country}</p>
              </div>
              {c.verification_status === "verified" && <span className="text-teal text-sm">✓</span>}
            </Link>
          ))}
          {commercants.length === 0 && <EmptyState label="Aucun commerçant pour l'instant." />}
        </div>
      )}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="font-sans text-sm text-ink/40 text-center py-10 col-span-full">{label}</p>;
}
