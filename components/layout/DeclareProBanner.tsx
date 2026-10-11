import Link from "next/link";

// Affiché tout en haut du dashboard tant qu'aucun compte professionnel n'a
// été déclaré (état onboarding "sans_declaration").
export function DeclareProBanner() {
  return (
    <div className="bg-brand px-6 py-3 flex items-center justify-between gap-4">
      <p className="font-sans text-sm text-white">
        Vous n&apos;avez pas encore de compte professionnel. Déclarez-en un pour vendre, proposer vos
        services ou accéder à la carte et aux tendances du marché.
      </p>
      <Link
        href="/declarer-compte"
        className="font-sans text-sm font-semibold text-brand bg-white rounded-full px-4 py-2 shrink-0 hover:bg-white/90"
      >
        Déclarer un compte professionnel
      </Link>
    </div>
  );
}
