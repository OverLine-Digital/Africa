import Link from "next/link";

// Silhouette simplifiée de l'Afrique (dégradé doré). Approximation vectorielle —
// à remplacer par le logo officiel dès que le fichier SVG/PNG existe.
export function AfricaMark({ className = "w-11 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 92 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="afrikahub-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD37A" />
          <stop offset="0.55" stopColor="#F5A524" />
          <stop offset="1" stopColor="#C4691A" />
        </linearGradient>
      </defs>
      <path
        d="M11 2.2 36.4 0.3 49.4 6.5 65 8.2 67.6 13.7 71.5 21.5 74.1 28.6 79.3 33.2 89.7 33.4 85.8 42.2 76.7 51.4 74.8 57.2 76 68.3 68.9 80 65.7 85.8 58.5 92.6 47.3 93.6 42.9 83.9 39 70.9 40.3 60.5 39 55.3 35.1 48.8 35.8 43.6 31.2 43.2 20.8 42.3 13 43 6.5 38.4 3.9 34.5 0.7 29.6 2 22.8 6.5 13 10.8 9.8Z"
        fill="url(#afrikahub-gold)"
        stroke="#FFD37A"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <AfricaMark />
      <div className="leading-tight">
        <p className="font-sans text-[28px] font-bold tracking-tight text-white">AfrikaHub</p>
        {showTagline && (
          <p className="font-sans text-[12px] text-white/80 hidden sm:block">
            Connecter l&apos;Afrique, créer des opportunités
          </p>
        )}
      </div>
    </Link>
  );
}
