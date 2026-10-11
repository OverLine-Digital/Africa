export const runtime = "edge";

import { createClient } from "@/lib/supabase/server";
import AfricaBusinessMap, { type MapMarker } from "@/components/map/AfricaBusinessMap";
import { getCountryCoordinates, jitter } from "@/lib/countryCoordinates";

export default async function AfricaBusinessMapPage() {
  const supabase = await createClient();

  // Entreprises vérifiées, groupées par pays
  const { data: companies } = await supabase
    .from("companies")
    .select("id, name, country")
    .eq("verification_status", "verified")
    .limit(200);

  // Capacités transport disponibles = corridors actifs
  const { data: capacities } = await supabase
    .from("capacities")
    .select("id, origin_country, destination_country, origin_city, destination_city")
    .eq("type", "transport")
    .eq("status", "disponible")
    .limit(100);

  // Demandes de partenaire ouvertes = opportunités
  const { data: partnerRequests } = await supabase
    .from("business_partner_requests")
    .select("id, target_country, partner_type")
    .eq("status", "open")
    .limit(100);

  // Tendances des 30 derniers jours — uniquement des mesures réelles et
  // étiquetées pour ce qu'elles sont : ce qui est PUBLIÉ ou DEMANDÉ sur la
  // plateforme. Aucune vente n'est suivie (pas de système de commande), donc
  // on ne parle jamais de "plus vendu".
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [{ data: recentProducts }, { data: recentServices }, { data: recentPosts }] = await Promise.all([
    supabase.from("products").select("category").gte("created_at", since),
    supabase.from("services").select("category").gte("created_at", since),
    supabase.from("posts").select("type").gte("created_at", since),
  ]);

  function top(rows: { [k: string]: string | null }[] | null, key: string, n = 5) {
    const counts = new Map<string, number>();
    rows?.forEach((r) => {
      const v = r[key];
      if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, n);
  }

  const topProductCategories = top(recentProducts, "category");
  const topServiceCategories = top(recentServices, "category");
  const topRequestTypes = top(recentPosts, "type");

  const markers: MapMarker[] = [];

  companies?.forEach((c, i) => {
    const coords = getCountryCoordinates(c.country);
    if (!coords) return;
    markers.push({
      id: `company-${c.id}`,
      lat: jitter(coords, i)[0],
      lng: jitter(coords, i)[1],
      label: `${c.name} — Entreprise vérifiée`,
      kind: "entreprise",
    });
  });

  capacities?.forEach((cap, i) => {
    const coords = getCountryCoordinates(cap.origin_country);
    if (!coords) return;
    markers.push({
      id: `capacity-${cap.id}`,
      lat: jitter(coords, i + 50)[0],
      lng: jitter(coords, i + 50)[1],
      label: `Transport ${cap.origin_city ?? cap.origin_country} → ${cap.destination_city ?? cap.destination_country}`,
      kind: "corridor",
    });
  });

  partnerRequests?.forEach((r, i) => {
    const coords = getCountryCoordinates(r.target_country);
    if (!coords) return;
    markers.push({
      id: `partner-${r.id}`,
      lat: jitter(coords, i + 100)[0],
      lng: jitter(coords, i + 100)[1],
      label: `Recherche ${r.partner_type} — ${r.target_country}`,
      kind: "opportunite",
    });
  });

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="font-display text-2xl text-ink">Africa Business Map</h1>
        <p className="font-sans text-sm text-ink/60 mt-1">
          {companies?.length ?? 0} entreprises vérifiées · {capacities?.length ?? 0} capacités de
          transport disponibles · {partnerRequests?.length ?? 0} opportunités ouvertes.
        </p>
      </div>
      <div className="flex-1">
        <AfricaBusinessMap markers={markers} />
      </div>

      <section className="mt-6">
        <h2 className="font-display text-lg text-ink">Tendances du marché — 30 derniers jours</h2>
        <p className="font-sans text-xs text-ink/50 mt-1 mb-3">
          Ce qui est publié et demandé sur la plateforme. Les ventes ne sont pas encore suivies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TrendList title="Produits les plus publiés" unit="produit(s)" rows={topProductCategories} />
          <TrendList title="Services les plus publiés" unit="service(s)" rows={topServiceCategories} />
          <TrendList
            title="Demandes les plus fréquentes"
            unit="publication(s)"
            rows={topRequestTypes.map(([t, n]) => [t.replace(/_/g, " "), n] as [string, number])}
          />
        </div>
      </section>
    </div>
  );
}

function TrendList({ title, unit, rows }: { title: string; unit: string; rows: [string, number][] }) {
  return (
    <div className="bg-white border border-line rounded-lg p-4">
      <h3 className="font-sans text-xs font-semibold text-ink/60 uppercase tracking-wide mb-3">{title}</h3>
      {rows.length === 0 ? (
        <p className="font-sans text-xs text-ink/40">Pas encore assez de données.</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {rows.map(([label, count]) => (
            <div key={label} className="flex justify-between font-sans text-sm">
              <span className="text-ink">{label}</span>
              <span className="text-ink/50">
                {count} {unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
