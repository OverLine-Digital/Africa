export const BOUTIQUE_CATEGORIES = [
  "Vêtements",
  "Alimentation",
  "Électronique",
  "Beauté & Cosmétique",
  "Maison & Décoration",
  "Artisanat",
  "Chaussures & Accessoires",
  "Bijoux",
  "Sport & Loisirs",
  "Autre",
] as const;

export type BoutiqueCategory = (typeof BOUTIQUE_CATEGORIES)[number];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
