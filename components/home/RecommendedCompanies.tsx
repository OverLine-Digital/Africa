import Link from "next/link";
import { Icon, VerifiedBadge } from "@/components/ui/Icon";
import type { HomeCompany } from "@/lib/homeSamples";

export function RecommendedCompanies({ companies }: { companies: HomeCompany[] }) {
  return (
    <section className="bg-panel border border-edge rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-base font-semibold text-white">Entreprises recommandées</h2>
        <Link href="/recherche?type=entreprises" className="font-sans text-xs text-brand hover:underline flex items-center gap-1">
          Voir tout <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {companies.map((c) => (
          <div key={c.id} className="rounded-lg bg-card border border-edge p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-lg bg-brand/20 text-brand flex items-center justify-center font-sans font-bold text-lg shrink-0">
                {c.name.charAt(0)}
              </span>
              <p className="font-sans text-[13px] font-semibold text-white leading-tight flex items-center gap-1 min-w-0">
                <span className="truncate">{c.name}</span>
                {c.verified && <VerifiedBadge className="w-3.5 h-3.5" />}
              </p>
            </div>
            {c.sector && <p className="font-sans text-[11px] text-muted">{c.sector}</p>}
            {c.country && (
              <p className="font-sans text-[11px] text-muted flex items-center gap-1">
                <Icon name="pin" className="w-3 h-3" /> {c.country}
              </p>
            )}
            <div className="flex flex-wrap gap-1">
              {c.tags.map((t) => (
                <span key={t} className="font-sans text-[10px] text-brand bg-brand/10 rounded px-1.5 py-0.5">{t}</span>
              ))}
            </div>
            <Link
              href={c.href}
              className="mt-auto text-center font-sans text-xs text-brand border border-brand/60 rounded-full py-1.5 hover:bg-brand/10"
            >
              Voir profil
            </Link>
          </div>
        ))}
        {companies.length === 0 && (
          <p className="col-span-full text-center font-sans text-sm text-muted py-8">Aucune entreprise pour l&apos;instant.</p>
        )}
      </div>
    </section>
  );
}
