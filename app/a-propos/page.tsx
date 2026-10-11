export const runtime = "edge";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone px-4 py-10 pb-24">
      <div className="max-w-xl mx-auto flex flex-col gap-4">
        <h1 className="font-display text-2xl text-ink">À propos d'OverLine Africa Hub</h1>
        <p className="font-sans text-sm text-ink/70">
          OverLine Africa Hub connecte entreprises, fournisseurs, distributeurs, transporteurs,
          freelances et commerçants à travers le continent africain — pour faciliter le commerce
          inter-pays, la logistique et les partenariats réels.
        </p>
        <p className="font-sans text-sm text-ink/70">
          Consultez nos <a href="/transparence" className="text-indigo underline">chiffres publics</a> pour
          voir l'activité réelle de la plateforme.
        </p>
      </div>
    </div>
  );
}
