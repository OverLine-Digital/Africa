// Liste unique des pays de la plateforme — sert au sélecteur de pays de
// l'inscription ET aux coordonnées de la carte (un seul endroit à maintenir).
// Coordonnées = centroïdes approximatifs, suffisants pour placer un marqueur
// par pays sans API de géocodage.

export type Country = { name: string; lat: number; lng: number; africa: boolean };

export const AFRICAN_COUNTRIES: Country[] = [
  { name: "Afrique du Sud", lat: -30.56, lng: 22.94, africa: true },
  { name: "Algérie", lat: 28.03, lng: 1.66, africa: true },
  { name: "Angola", lat: -11.2, lng: 17.87, africa: true },
  { name: "Bénin", lat: 9.31, lng: 2.32, africa: true },
  { name: "Botswana", lat: -22.33, lng: 24.68, africa: true },
  { name: "Burkina Faso", lat: 12.24, lng: -1.56, africa: true },
  { name: "Burundi", lat: -3.37, lng: 29.92, africa: true },
  { name: "Cameroun", lat: 7.37, lng: 12.35, africa: true },
  { name: "Cap-Vert", lat: 16.0, lng: -24.01, africa: true },
  { name: "Centrafrique", lat: 6.61, lng: 20.94, africa: true },
  { name: "Comores", lat: -11.65, lng: 43.33, africa: true },
  { name: "Congo-Brazzaville", lat: -0.23, lng: 15.83, africa: true },
  { name: "RDC", lat: -4.04, lng: 21.76, africa: true },
  { name: "Côte d'Ivoire", lat: 7.54, lng: -5.55, africa: true },
  { name: "Djibouti", lat: 11.83, lng: 42.59, africa: true },
  { name: "Égypte", lat: 26.82, lng: 30.8, africa: true },
  { name: "Érythrée", lat: 15.18, lng: 39.78, africa: true },
  { name: "Eswatini", lat: -26.52, lng: 31.47, africa: true },
  { name: "Éthiopie", lat: 9.15, lng: 40.49, africa: true },
  { name: "Gabon", lat: -0.8, lng: 11.61, africa: true },
  { name: "Gambie", lat: 13.44, lng: -15.31, africa: true },
  { name: "Ghana", lat: 7.95, lng: -1.02, africa: true },
  { name: "Guinée", lat: 9.95, lng: -9.7, africa: true },
  { name: "Guinée-Bissau", lat: 11.8, lng: -15.18, africa: true },
  { name: "Guinée équatoriale", lat: 1.65, lng: 10.27, africa: true },
  { name: "Kenya", lat: -0.02, lng: 37.91, africa: true },
  { name: "Lesotho", lat: -29.61, lng: 28.23, africa: true },
  { name: "Libéria", lat: 6.43, lng: -9.43, africa: true },
  { name: "Libye", lat: 26.34, lng: 17.23, africa: true },
  { name: "Madagascar", lat: -18.77, lng: 46.87, africa: true },
  { name: "Malawi", lat: -13.25, lng: 34.3, africa: true },
  { name: "Mali", lat: 17.57, lng: -3.99, africa: true },
  { name: "Maroc", lat: 31.79, lng: -7.09, africa: true },
  { name: "Maurice", lat: -20.35, lng: 57.55, africa: true },
  { name: "Mauritanie", lat: 21.01, lng: -10.94, africa: true },
  { name: "Mozambique", lat: -18.67, lng: 35.53, africa: true },
  { name: "Namibie", lat: -22.96, lng: 18.49, africa: true },
  { name: "Niger", lat: 17.61, lng: 8.08, africa: true },
  { name: "Nigeria", lat: 9.08, lng: 8.68, africa: true },
  { name: "Ouganda", lat: 1.37, lng: 32.29, africa: true },
  { name: "Rwanda", lat: -1.94, lng: 29.87, africa: true },
  { name: "Sao Tomé-et-Principe", lat: 0.19, lng: 6.61, africa: true },
  { name: "Sénégal", lat: 14.5, lng: -14.45, africa: true },
  { name: "Seychelles", lat: -4.68, lng: 55.49, africa: true },
  { name: "Sierra Leone", lat: 8.46, lng: -11.78, africa: true },
  { name: "Somalie", lat: 5.15, lng: 46.2, africa: true },
  { name: "Soudan", lat: 12.86, lng: 30.22, africa: true },
  { name: "Soudan du Sud", lat: 6.88, lng: 31.31, africa: true },
  { name: "Tanzanie", lat: -6.37, lng: 34.89, africa: true },
  { name: "Tchad", lat: 15.45, lng: 18.73, africa: true },
  { name: "Togo", lat: 8.62, lng: 0.82, africa: true },
  { name: "Tunisie", lat: 33.89, lng: 9.54, africa: true },
  { name: "Zambie", lat: -13.13, lng: 27.85, africa: true },
  { name: "Zimbabwe", lat: -19.02, lng: 29.15, africa: true },
];

// Pays hors Afrique avec lesquels la plateforme travaille (fournisseurs
// vérifiés par les fondateurs).
export const PARTNER_COUNTRIES: Country[] = [
  { name: "Chine", lat: 35.86, lng: 104.2, africa: false },
  { name: "Inde", lat: 20.59, lng: 78.96, africa: false },
  { name: "Émirats arabes unis", lat: 23.42, lng: 53.85, africa: false },
  { name: "Japon", lat: 36.2, lng: 138.25, africa: false },
  { name: "Corée du Sud", lat: 35.91, lng: 127.77, africa: false },
];

export const ALL_COUNTRIES: Country[] = [...AFRICAN_COUNTRIES, ...PARTNER_COUNTRIES];

// Anciennes graphies encore présentes dans des données saisies librement
// avant l'existence du sélecteur — pointent vers le nom canonique.
export const COUNTRY_ALIASES: Record<string, string> = {
  Congo: "Congo-Brazzaville",
  "République du Congo": "Congo-Brazzaville",
  "République démocratique du Congo": "RDC",
  "République Démocratique du Congo": "RDC",
  "Congo-Kinshasa": "RDC",
  Dubaï: "Émirats arabes unis",
  "Émirats Arabes Unis": "Émirats arabes unis",
};
