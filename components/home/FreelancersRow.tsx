import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export type HomeFreelancer = {
  id: string;
  fullName: string;
  headline: string | null;
  hourlyRate: number | null;
  currency: string;
  availability: string;
};

export function FreelancersRow({ freelancers }: { freelancers: HomeFreelancer[] }) {
  return (
    <section className="bg-panel border border-edge rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-lg font-semibold text-white">Freelancers populaires</h2>
        <Link href="/?tab=freelancer" className="font-sans text-xs text-brand hover:underline flex items-center gap-1">
          Voir tout <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>

      {freelancers.length === 0 ? (
        <p className="font-sans text-sm text-muted text-center py-6">Aucun freelance pour l&apos;instant.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {freelancers.map((f) => (
            <Link
              key={f.id}
              href={`/profil/${f.id}`}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg bg-card border border-edge hover:border-brand/50"
            >
              <div className="w-11 h-11 rounded-full bg-brand/15 flex items-center justify-center font-sans text-sm font-semibold text-brand">
                {f.fullName.charAt(0).toUpperCase()}
              </div>
              <p className="font-sans text-xs font-medium text-white leading-tight">{f.fullName}</p>
              {f.headline && <p className="font-sans text-[10px] text-muted leading-tight">{f.headline}</p>}
              {f.hourlyRate != null && (
                <p className="font-sans text-[11px] font-semibold text-white">
                  À partir de {f.hourlyRate} {f.currency}/h
                </p>
              )}
              <span
                className={`font-sans text-[9px] px-1.5 py-0.5 rounded-full ${
                  f.availability === "disponible" ? "bg-teal/15 text-teal" : "bg-white/10 text-muted"
                }`}
              >
                {f.availability === "disponible" ? "Disponible" : "Occupé"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
