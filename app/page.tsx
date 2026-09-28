export const runtime = "edge";

import { createClient } from "@/lib/supabase/server";
import { SearchBar } from "@/components/home/SearchBar";
import { LanguageFloater } from "@/components/home/LanguageFloater";
import { HamburgerMenu } from "@/components/home/HamburgerMenu";
import { SponsoredBlock } from "@/components/home/SponsoredBlock";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { BottomNav } from "@/components/home/BottomNav";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: languages }, { data: products }, { data: companiesRaw }, { data: boutiques }, { data: freelancers }] =
    await Promise.all([
      supabase.from("languages").select("code, name_fr, name_native").eq("is_active", true).limit(12),
      supabase.from("products").select("id, name, category, price, currency, company_id").limit(30),
      supabase.from("companies").select("id, name, country, verification_status, user_id").limit(50),
      supabase.from("boutiques").select("id, name, slug, category").limit(30),
      supabase.from("freelancer_profiles").select("id, headline, service_categories, profiles:user_id ( full_name )").limit(30),
    ]);

  // Le rôle vit sur profiles, pas companies — on le rattache ici pour les
  // filtres de l'onglet Entreprises (fournisseur/grossiste/distributeur...)
  const userIds = companiesRaw?.map((c) => c.user_id) ?? [];
  const { data: profilesRoles } = userIds.length
    ? await supabase.from("profiles").select("id, role").in("id", userIds)
    : { data: [] };
  const roleByUserId = new Map(profilesRoles?.map((p) => [p.id, p.role]));
  const companies = (companiesRaw ?? []).map((c) => ({ ...c, role: roleByUserId.get(c.user_id) ?? null }));

  const sponsoredCompanies = companies.filter((c) => c.verification_status === "verified").slice(0, 4);
  const freelancersFlat = (freelancers ?? []).map((f: any) => ({
    id: f.id,
    headline: f.headline,
    service_categories: f.service_categories ?? [],
    full_name: f.profiles?.full_name ?? "Freelance",
  }));

  return (
    <div className="min-h-screen bg-stone pb-20 md:pb-8">
      <header className="sticky top-0 z-20 bg-white border-b border-line">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="font-display text-xl text-indigo shrink-0">
            AfrikaHub
          </Link>
          <SearchBar />
          <Link
            href="/register?next=ai-mode"
            className="font-sans text-sm font-medium text-stone bg-indigo rounded-full px-4 py-2 shrink-0 hover:bg-indigo-dark"
          >
            AI Mode
          </Link>
          <LanguageFloater languages={languages ?? []} />
          <HamburgerMenu />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
          <div className="hidden lg:block">
            <SponsoredBlock companies={sponsoredCompanies} />
          </div>

          <div>
            <div className="lg:hidden mb-5">
              <SponsoredBlock companies={sponsoredCompanies} />
            </div>

            <CategoryTabs
              products={products ?? []}
              companies={companies}
              boutiques={boutiques ?? []}
              freelancers={freelancersFlat}
            />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
