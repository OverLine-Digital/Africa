export const runtime = "edge";

import { createClient } from "@/lib/supabase/server";

function monthLabel(offset: number): { label: string; start: string; end: string } {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() - offset, 1);
  const start = new Date(target.getFullYear(), target.getMonth(), 1).toISOString();
  const end = new Date(target.getFullYear(), target.getMonth() + 1, 1).toISOString();
  return { label: target.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }), start, end };
}

export default async function MarketCheckInPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const offset = month ? Number(month) : 0;
  const { label, start, end } = monthLabel(offset);

  const supabase = await createClient();

  const { data: postsInRange } = await supabase
    .from("posts")
    .select("type")
    .gte("created_at", start)
    .lt("created_at", end);

  const demandCounts = new Map<string, number>();
  postsInRange?.forEach((p) => demandCounts.set(p.type, (demandCounts.get(p.type) ?? 0) + 1));

  const { data: productsInRange } = await supabase
    .from("products")
    .select("category")
    .gte("created_at", start)
    .lt("created_at", end);

  const productCounts = new Map<string, number>();
  productsInRange?.forEach((p) => {
    if (p.category) productCounts.set(p.category, (productCounts.get(p.category) ?? 0) + 1);
  });

  const { data: freelancersData } = await supabase
    .from("freelancer_profiles")
    .select("profiles:user_id ( country )");

  const freelancersByCountry = new Map<string, number>();
  freelancersData?.forEach((f: any) => {
    const country = f.profiles?.country;
    if (country) freelancersByCountry.set(country, (freelancersByCountry.get(country) ?? 0) + 1);
  });

  const topProducts = Array.from(productCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topDemands = Array.from(demandCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topFreelanceCountries = Array.from(freelancersByCountry.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <div className="min-h-screen bg-stone px-4 py-10 pb-24">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Check-In du marché</h1>
          <p className="font-sans text-sm text-ink/60 mt-1">
            Tendances réelles de la plateforme — {label}
          </p>
          <div className="flex gap-2 mt-3">
            {[0, 1, 2].map((o) => (
              <a
                key={o}
                href={`/marche?month=${o}`}
                className={`font-sans text-xs rounded-full px-3 py-1.5 border ${
                  offset === o ? "border-indigo bg-indigo/10 text-indigo" : "border-line text-ink/60"
                }`}
              >
                {monthLabel(o).label}
              </a>
            ))}
          </div>
        </div>

        <section className="bg-white border border-line rounded-lg p-6">
          <h2 className="font-sans text-sm font-semibold text-ink/70 uppercase tracking-wide mb-4">
            Produits les plus sollicités
          </h2>
          {topProducts.length > 0 ? (
            <div className="flex flex-col gap-2">
              {topProducts.map(([cat, count]) => (
                <div key={cat} className="flex justify-between font-sans text-sm">
                  <span className="text-ink">{cat}</span>
                  <span className="text-ink/60">{count} publication(s)</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-xs text-ink/40">Pas encore assez de données ce mois-ci.</p>
          )}
        </section>

        <section className="bg-white border border-line rounded-lg p-6">
          <h2 className="font-sans text-sm font-semibold text-ink/70 uppercase tracking-wide mb-4">
            Demandes d'entreprise les plus fréquentes
          </h2>
          {topDemands.length > 0 ? (
            <div className="flex flex-col gap-2">
              {topDemands.map(([type, count]) => (
                <div key={type} className="flex justify-between font-sans text-sm">
                  <span className="text-ink">{type.replace(/_/g, " ")}</span>
                  <span className="text-ink/60">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-xs text-ink/40">Pas encore assez de données ce mois-ci.</p>
          )}
        </section>

        <section className="bg-white border border-line rounded-lg p-6">
          <h2 className="font-sans text-sm font-semibold text-ink/70 uppercase tracking-wide mb-4">
            Freelances par pays
          </h2>
          {topFreelanceCountries.length > 0 ? (
            <div className="flex flex-col gap-2">
              {topFreelanceCountries.map(([country, count]) => (
                <div key={country} className="flex justify-between font-sans text-sm">
                  <span className="text-ink">{country}</span>
                  <span className="text-ink/60">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-xs text-ink/40">Pas encore de freelances inscrits.</p>
          )}
        </section>

        <p className="font-sans text-xs text-ink/40">
          Ces chiffres reflètent l'activité réelle de la plateforme sur la période choisie — aucune
          donnée inventée.
        </p>
      </div>
    </div>
  );
}
