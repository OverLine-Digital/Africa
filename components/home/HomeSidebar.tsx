import Link from "next/link";
import { Icon, VerifiedBadge, type IconName } from "@/components/ui/Icon";
import type { HomeCompany } from "@/lib/homeSamples";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Accueil", icon: "home" },
  { href: "/recherche?type=produits", label: "Produits", icon: "bag" },
  { href: "/recherche?type=entreprises", label: "Entreprises", icon: "building" },
  { href: "/recherche?type=freelances", label: "Boutique Freelancer", icon: "user" },
  { href: "/recherche?type=commercants", label: "Commerçants", icon: "store" },
  { href: "/recherche?type=fournisseurs", label: "Fournisseurs", icon: "truck" },
  { href: "/recherche?type=distributeurs", label: "Distributeurs", icon: "network" },
  { href: "/recherche?type=services", label: "Services", icon: "gear" },
  { href: "/logistics", label: "Logistique & Transport", icon: "truck" },
  { href: "/map", label: "Plus", icon: "apps" },
];

export function HomeSidebar({ featured }: { featured: HomeCompany | null }) {
  return (
    <aside className="hidden lg:flex flex-col gap-3 w-[248px] shrink-0">
      <nav className="bg-panel border border-edge rounded-xl p-2.5 flex flex-col gap-0.5">
        {NAV.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-[15px] text-white ${
              i === 0 ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5" />
            <span className="flex-1">{item.label}</span>
            {item.label === "Plus" && <Icon name="chevronRight" className="w-4 h-4 text-muted" />}
          </Link>
        ))}
      </nav>

      <section className="bg-panel border border-edge rounded-xl p-3.5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-sans text-sm font-semibold text-white">Entreprises en vedette</h3>
          <Link href="/recherche?type=entreprises" className="font-sans text-xs text-muted hover:text-white flex items-center gap-1">
            Voir tout <Icon name="arrowRight" className="w-3 h-3" />
          </Link>
        </div>

        <div className="rounded-lg border border-edge bg-gradient-to-b from-card to-panel p-3.5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-[11px] font-medium text-sun bg-sun/10 border border-sun/30 rounded-md px-2 py-0.5">
              Sponsorisé
            </span>
            {featured?.verified && (
              <span className="flex items-center gap-1 font-sans text-xs text-white">
                <VerifiedBadge className="w-4 h-4" /> Vérifié
              </span>
            )}
          </div>

          {featured ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-brand/20 text-brand flex items-center justify-center font-sans font-bold shrink-0">
                  {featured.name.charAt(0)}
                </span>
                <p className="font-sans text-lg font-semibold text-white leading-tight">{featured.name}</p>
              </div>
              {featured.country && <p className="font-sans text-xs text-muted mt-2">{featured.country}</p>}
              <Link
                href={featured.href}
                className="mt-3 inline-flex items-center gap-2 bg-white text-night rounded-full px-4 py-1.5 font-sans text-xs font-semibold hover:bg-white/90"
              >
                Voir le profil <Icon name="arrowRight" className="w-3.5 h-3.5" />
              </Link>
            </>
          ) : (
            <p className="font-sans text-xs text-muted text-center py-6">Aucune mise en avant pour l&apos;instant.</p>
          )}
        </div>
      </section>
    </aside>
  );
}
