export const runtime = "edge";

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PriceWithConversion } from "@/components/ui/PriceWithConversion";
import type { SupportedCurrency } from "@/lib/currency";

export default async function BoutiquePublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: boutique } = await supabase
    .from("boutiques")
    .select("id, name, category, description, owner_id")
    .eq("slug", slug)
    .single();

  if (!boutique) notFound();

  const { data: company } = await supabase
    .from("companies")
    .select("id, verification_status")
    .eq("user_id", boutique.owner_id)
    .single();

  const { data: products } = company
    ? await supabase
        .from("products")
        .select("id, name, category, price, currency")
        .eq("company_id", company.id)
    : { data: null };

  return (
    <div className="min-h-screen bg-stone px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl text-ink">{boutique.name}</h1>
            {company?.verification_status === "verified" && (
              <span className="text-teal text-sm" title="Vérifié">✓</span>
            )}
          </div>
          <p className="font-sans text-sm text-ink/60 mt-1">{boutique.category}</p>
          {boutique.description && <p className="font-sans text-sm text-ink/70 mt-3">{boutique.description}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {products?.map((p) => (
            <div key={p.id} className="bg-white border border-line rounded-lg p-4">
              <p className="font-sans text-sm font-medium text-ink mb-1">{p.name}</p>
              {p.price && <PriceWithConversion amount={p.price} currency={(p.currency as SupportedCurrency) ?? "USD"} />}
            </div>
          ))}
          {(!products || products.length === 0) && (
            <p className="font-sans text-sm text-ink/50 col-span-full text-center py-8">
              Aucun produit publié pour l'instant.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
