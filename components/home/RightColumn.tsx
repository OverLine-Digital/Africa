import Link from "next/link";
import { Icon, VerifiedBadge, type IconName } from "@/components/ui/Icon";
import type { HomeCompany } from "@/lib/homeSamples";

function PromoCard({
  icon, title, text, cta, href,
}: { icon: IconName; title: string; text: string; cta: string; href: string }) {
  return (
    <div className="bg-panel border border-edge rounded-xl p-4 flex gap-3">
      <span className="w-12 h-12 rounded-lg bg-card border border-edge flex items-center justify-center text-white shrink-0">
        <Icon name={icon} className="w-6 h-6" />
      </span>
      <div className="min-w-0">
        <p className="font-sans text-sm font-semibold text-white">{title}</p>
        <p className="font-sans text-[11px] text-muted mt-0.5">{text}</p>
        <Link
          href={href}
          className="mt-2 inline-flex items-center gap-1.5 font-sans text-[11px] text-white border border-edge bg-card rounded-full px-3 py-1 hover:border-brand"
        >
          {cta} <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export function RightColumn({ latest }: { latest: HomeCompany[] }) {
  return (
    <aside className="flex flex-col gap-3 w-full xl:w-[262px] shrink-0">
      <div className="rounded-xl border border-edge p-4 bg-gradient-to-br from-[#1B3F9E] to-[#0D1729]">
        <p className="font-sans text-sm font-semibold text-white leading-snug">
          Importez depuis la Chine, Turkey, Europe et plus !
        </p>
        <p className="font-sans text-[10px] text-white/80 mt-1.5">
          Logistique fiable • Prix compétitifs • Suivi en temps réel
        </p>
        <Link
          href="/logistics"
          className="mt-3 inline-flex items-center gap-1.5 bg-white text-night rounded-full px-4 py-1.5 font-sans text-xs font-semibold"
        >
          Découvrir <Icon name="arrowRight" className="w-3.5 h-3.5" />
        </Link>
      </div>

      <PromoCard icon="store" title="Créer votre boutique" text="Vendez vos produits en toute simplicité" cta="Commencer maintenant" href="/register" />
      <PromoCard icon="truck" title="Devenir fournisseur" text="Touchez des acheteurs partout en Afrique" cta="Rejoindre maintenant" href="/register" />

      <div className="rounded-xl border border-edge p-4 bg-gradient-to-br from-[#12203A] to-[#3A2A1C]">
        <p className="font-sans text-sm font-semibold text-white">Trouvez des freelances qualifiés</p>
        <p className="font-sans text-[11px] text-white/80 mt-1">Traduction, design, dev, marketing…</p>
        <Link
          href="/recherche?type=freelances"
          className="mt-3 inline-flex items-center gap-1.5 bg-sun text-night rounded-full px-4 py-1.5 font-sans text-xs font-semibold hover:bg-sun-dark"
        >
          Découvrir <Icon name="arrowRight" className="w-3.5 h-3.5" />
        </Link>
      </div>

      <section className="bg-panel border border-edge rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-sans text-sm font-semibold text-white">Dernières entreprises ajoutées</h3>
          <Link href="/recherche?type=entreprises" className="font-sans text-[11px] text-brand hover:underline">Voir tout →</Link>
        </div>
        <ul className="flex flex-col gap-3">
          {latest.map((c) => (
            <li key={c.id}>
              <Link href={c.href} className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-brand/20 text-brand flex items-center justify-center font-sans font-bold shrink-0">
                  {c.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-xs font-semibold text-white flex items-center gap-1">
                    <span className="truncate">{c.name}</span>
                    {c.verified && <VerifiedBadge className="w-3 h-3" />}
                  </p>
                  <p className="font-sans text-[10px] text-muted truncate">
                    {[c.sector, c.country].filter(Boolean).join(" • ")}
                  </p>
                </div>
                {c.ago && <span className="font-sans text-[10px] text-muted shrink-0">{c.ago}</span>}
              </Link>
            </li>
          ))}
          {latest.length === 0 && <li className="font-sans text-xs text-muted text-center py-4">Aucune entreprise pour l&apos;instant.</li>}
        </ul>
      </section>
    </aside>
  );
}
