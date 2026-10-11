import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

export type SectorCount = { role: string; label: string; count: number };

const SECTOR_ICONS: Record<string, IconName> = {
  fournisseur: "bag",
  distributeur: "truck",
  fabricant: "home",
  grossiste: "bag",
  importateur: "plane",
};

export function SectorsStrip({ sectors }: { sectors: SectorCount[] }) {
  const withCompanies = sectors.filter((s) => s.count > 0);

  return (
    <section className="bg-panel border border-edge rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-lg font-semibold text-white">Entreprises par secteur</h2>
        <Link href="/?tab=entreprises" className="font-sans text-xs text-brand hover:underline flex items-center gap-1">
          Voir tout <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>

      {withCompanies.length === 0 ? (
        <p className="font-sans text-sm text-muted text-center py-6">Aucune entreprise pour l&apos;instant.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {withCompanies.map((s) => (
            <Link
              key={s.role}
              href={`/?tab=entreprises&role=${s.role}`}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card border border-edge hover:border-brand/50"
            >
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                <Icon name={SECTOR_ICONS[s.role] ?? "bag"} className="w-5 h-5 text-brand" />
              </div>
              <span className="font-sans text-xs font-medium text-white text-center">{s.label}</span>
              <span className="font-sans text-[10px] text-muted">+{s.count} entreprise{s.count > 1 ? "s" : ""}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
