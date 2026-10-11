import { ALL_COUNTRIES, COUNTRY_ALIASES } from "@/lib/countries";

// Dérivé de la liste unique lib/countries.ts — ne plus éditer à la main ici.
export const COUNTRY_COORDINATES: Record<string, [number, number]> = Object.fromEntries(
  ALL_COUNTRIES.map((c) => [c.name, [c.lat, c.lng] as [number, number]])
);

export function getCountryCoordinates(country: string | null): [number, number] | null {
  if (!country) return null;
  const canonical = COUNTRY_ALIASES[country] ?? country;
  return COUNTRY_COORDINATES[canonical] ?? null;
}

// Léger décalage pour éviter que plusieurs marqueurs d'un même pays se
// superposent exactement.
export function jitter([lat, lng]: [number, number], seed: number): [number, number] {
  const offset = ((seed % 10) - 5) * 0.15;
  return [lat + offset, lng + offset * 1.3];
}
