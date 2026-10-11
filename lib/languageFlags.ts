// Un drapeau par langue réellement présente dans la table `languages`
// (29 langues — voir la migration create_languages_table). Le drapeau
// représente un pays emblématique de la langue, pas une revendication
// politique d'exclusivité.
export const LANGUAGE_FLAGS: Record<string, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  pt: "🇵🇹",
  ar: "🇪🇬",
  ha: "🇳🇬",
  sw: "🇹🇿",
  am: "🇪🇹",
  pcm: "🇳🇬",
  yo: "🇳🇬",
  ig: "🇳🇬",
  zu: "🇿🇦",
  xh: "🇿🇦",
  af: "🇿🇦",
  so: "🇸🇴",
  om: "🇪🇹",
  rw: "🇷🇼",
  mg: "🇲🇬",
  ln: "🇨🇩",
  wo: "🇸🇳",
  tw: "🇬🇭",
  sn: "🇿🇼",
  ff: "🇸🇳",
  ti: "🇪🇷",
  kg: "🇨🇩",
  tzm: "🇲🇦",
  st: "🇱🇸",
  tn: "🇧🇼",
  nl: "🇳🇱",
  kea: "🇨🇻",
};

export function getLanguageFlag(code: string): string {
  return LANGUAGE_FLAGS[code.toLowerCase().split("-")[0]] ?? "🌐";
}
