import Link from "next/link";

type SponsoredCompany = { id: string; name: string; country: string | null; verification_status: string };

export function SponsoredBlock({ companies }: { companies: SponsoredCompany[] }) {
  return (
    <div className="bg-white border border-line rounded-lg p-4 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-1.5">
        <span className="font-sans text-xs font-medium text-gold bg-gold/10 rounded-full px-2.5 py-1">
          Patrociné
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {companies.map((c) => (
          <Link
            key={c.id}
            href={`/entreprise/${c.id}`}
            className="flex items-center justify-between border border-line rounded-md px-3 py-2.5 hover:bg-stone-dim transition-colors"
          >
            <div>
              <p className="font-sans text-sm font-medium text-ink">{c.name}</p>
              <p className="font-sans text-xs text-ink/50">{c.country}</p>
            </div>
            {c.verification_status === "verified" && (
              <span className="text-teal text-sm" title="Vérifié">✓</span>
            )}
          </Link>
        ))}

        {companies.length === 0 && (
          <p className="font-sans text-xs text-ink/40 text-center py-6">
            Aucune mise en avant pour l'instant.
          </p>
        )}
      </div>
    </div>
  );
}
