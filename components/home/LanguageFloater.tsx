"use client";

import { useEffect, useState } from "react";

type Lang = { code: string; name_fr: string; name_native: string | null };

export function LanguageFloater({ languages }: { languages: Lang[] }) {
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState<Lang | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (locked || languages.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % languages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [locked, languages.length]);

  const displayed = locked ?? languages[index];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 font-sans text-sm text-ink px-3 py-2 rounded-full hover:bg-stone-dim"
      >
        🌐
        <span key={displayed?.code} className="animate-[fadeIn_0.4s_ease-in-out] min-w-[70px] text-left">
          {displayed?.name_native ?? displayed?.name_fr ?? "Français"}
        </span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-line rounded-lg shadow-lg py-2 max-h-72 overflow-y-auto w-56 z-20">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocked(l);
                setOpen(false);
              }}
              className="w-full text-left font-sans text-sm px-4 py-2 hover:bg-stone-dim flex justify-between"
            >
              <span>{l.name_fr}</span>
              {l.name_native && <span className="text-ink/40">{l.name_native}</span>}
            </button>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
