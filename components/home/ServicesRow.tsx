import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SERVICES } from "@/lib/homeSamples";

export function ServicesRow() {
  return (
    <section className="bg-panel border border-edge rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-base font-semibold text-white">Services &amp; Freelances</h2>
        <Link href="/recherche?type=services" className="font-sans text-xs text-brand hover:underline flex items-center gap-1">
          Voir tout <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {SERVICES.map((s) => (
          <Link
            key={s.title}
            href={`/recherche?q=${encodeURIComponent(s.q)}`}
            className="rounded-lg bg-card border border-edge p-3 flex gap-2.5 hover:border-brand/50"
          >
            <span className="w-9 h-9 rounded-lg bg-brand/15 text-brand flex items-center justify-center shrink-0">
              <Icon name={s.icon} className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-xs font-semibold text-white leading-tight">{s.title}</p>
              <p className="font-sans text-[10px] text-muted mt-0.5">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
