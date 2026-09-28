export const runtime = "edge";

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const supabase = await createClient();

  const [{ data: products }, { data: companies }, { data: boutiques }] = query
    ? await Promise.all([
        supabase.from("products").select("id, name, category, company_id").ilike("name", `%${query}%`).limit(20),
        supabase.from("companies").select("id, name, country, verification_status").ilike("name", `%${query}%`).limit(20),
        supabase.from("boutiques").select("id, name, slug, category").ilike("name", `%${query}%`).limit(20),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }];

  return (
    <div className="min-h-screen bg-stone px-4 py-10 pb-24">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <h1 className="font-display text-2xl text-ink">Résultats pour « {query} »</h1>

        {companies && companies.length > 0 && (
          <section>
            <h2 className="font-sans text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2">Entreprises</h2>
            <div className="flex flex-col gap-2">
              {companies.map((c) => (
                <Link key={c.id} href={`/entreprise/${c.id}`} className="bg-white border border-line rounded-lg p-3 font-sans text-sm text-ink">
                  {c.name} <span className="text-ink/40">— {c.country}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {products && products.length > 0 && (
          <section>
            <h2 className="font-sans text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2">Produits</h2>
            <div className="flex flex-col gap-2">
              {products.map((p) => (
                <Link key={p.id} href={`/entreprise/${p.company_id}`} className="bg-white border border-line rounded-lg p-3 font-sans text-sm text-ink">
                  {p.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {boutiques && boutiques.length > 0 && (
          <section>
            <h2 className="font-sans text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2">Boutiques</h2>
            <div className="flex flex-col gap-2">
              {boutiques.map((b) => (
                <Link key={b.id} href={`/boutique/${b.slug}`} className="bg-white border border-line rounded-lg p-3 font-sans text-sm text-ink">
                  {b.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {(!companies?.length && !products?.length && !boutiques?.length) && (
          <p className="font-sans text-sm text-ink/50">Aucun résultat pour cette recherche.</p>
        )}
      </div>
    </div>
  );
}
