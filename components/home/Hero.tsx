import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const TRUST = [
  { icon: "check", label: "Paiements sécurisés" },
  { icon: "truck", label: "Livraison internationale" },
  { icon: "shield", label: "Partenaires vérifiés" },
  { icon: "clock", label: "Assistance 24/7" },
] as const;

const COUNTRIES = [
  { flag: "🇦🇴", name: "Angola" },
  { flag: "🇨🇬", name: "Congo" },
  { flag: "🇨🇩", name: "RDC" },
  { flag: "🇨🇲", name: "Cameroun" },
  { flag: "🇳🇬", name: "Nigeria" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-xl border border-edge min-h-[246px] p-7 flex flex-col justify-between"
      // Dépose une vraie photo dans /public/hero.jpg : elle passe par-dessus le dégradé.
      style={{
        backgroundImage:
          "url(/hero.jpg), radial-gradient(ellipse at 85% 30%, rgba(245,165,36,0.55), transparent 55%), linear-gradient(100deg, #0A1526 0%, #12203A 45%, #6B4A2E 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/50 to-transparent pointer-events-none" />

      <div className="relative max-w-xl">
        <p className="font-sans text-xs font-semibold tracking-wider text-white/90 mb-2">AFRIKAHUB</p>
        <h1 className="font-sans text-[34px] leading-[1.1] font-bold text-white">
          La plus grande marketplace B2B &amp; B2C d&apos;Afrique
        </h1>
        <p className="font-sans text-[15px] text-white/90 mt-3">
          Produits, entreprises, services, freelances et plus encore.
          <br />
          Des opportunités réelles, dans tous les pays africains.
        </p>
      </div>

      <div className="relative">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 mb-4 font-sans text-xs text-white">
          {TRUST.map((t) => (
            <li key={t.label} className="flex items-center gap-1.5">
              <Icon name={t.icon} className="w-3.5 h-3.5" />
              {t.label}
            </li>
          ))}
        </ul>
        <Link
          href="/marche"
          className="inline-flex items-center gap-2 bg-white text-night rounded-full px-6 py-3 font-sans text-sm font-semibold hover:bg-white/90"
        >
          Explorer maintenant <Icon name="arrowRight" className="w-4 h-4" />
        </Link>
      </div>

      <div className="xl:hidden relative mt-5 bg-night/85 backdrop-blur border border-edge rounded-xl px-5 py-3">
        <div className="flex items-center gap-3">
          <Icon name="globe" className="w-8 h-8 text-white/80 shrink-0" />
          <p className="font-sans text-sm font-semibold text-white leading-tight">
            Des opportunités sans frontières
          </p>
        </div>
        <div className="flex justify-between mt-2.5">
          {COUNTRIES.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-0.5">
              <span className="text-lg leading-none">{c.flag}</span>
              <span className="font-sans text-[9px] text-white/80">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden xl:block absolute right-0 bottom-0 bg-night/85 backdrop-blur border-t border-l border-edge rounded-tl-xl px-5 py-3 w-[255px]">
        <div className="flex items-center gap-3">
          <Icon name="globe" className="w-9 h-9 text-white/80" />
          <p className="font-sans text-[15px] font-semibold text-white leading-tight">
            Des opportunités
            <br />
            sans frontières
          </p>
        </div>
        <div className="flex justify-between mt-2.5">
          {COUNTRIES.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-0.5">
              <span className="text-lg leading-none">{c.flag}</span>
              <span className="font-sans text-[9px] text-white/80">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
