export const runtime = "edge";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NewProductForm } from "@/components/products/NewProductForm";

export default async function BoutiqueAdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pas connecté → retour direct à l'accueil, comme demandé, pas vers /login
  if (!user) redirect("/");

  const { data: boutique } = await supabase
    .from("boutiques")
    .select("id, name, category, owner_id")
    .eq("slug", slug)
    .single();

  // Boutique inexistante OU connecté mais pas le propriétaire → accueil
  if (!boutique || boutique.owner_id !== user.id) redirect("/");

  const { data: company } = await supabase
    .from("companies")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const { data: products } = company
    ? await supabase.from("products").select("id, name, price, currency").eq("company_id", company.id)
    : { data: null };

  return (
    <div className="min-h-screen bg-stone px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Gestion — {boutique.name}</h1>
          <p className="font-sans text-sm text-ink/60 mt-1">
            Lien public à partager : overline-africa-hub.com/boutique/{slug}
          </p>
        </div>

        {company && <NewProductForm companyId={company.id} />}

        <div className="flex flex-col gap-2">
          {products?.map((p) => (
            <div key={p.id} className="bg-white border border-line rounded-lg p-4 flex justify-between">
              <span className="font-sans text-sm text-ink">{p.name}</span>
              {p.price && <span className="font-sans text-sm text-ink/60">{p.price} {p.currency}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
