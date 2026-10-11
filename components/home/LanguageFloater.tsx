"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { getLanguageFlag as flag } from "@/lib/languageFlags";

type Lang = { code: string; name_fr: string; name_native: string | null };

export function LanguageFloater({ languages }: { languages: Lang[] }) {
  const [current, setCurrent] = useState<Lang>(
    languages.find((l) => l.code.startsWith("fr")) ?? languages[0]
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 h-12 pl-3 pr-3 rounded-xl border border-edge bg-card font-sans text-sm text-white hover:border-brand/60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-lg leading-none">{flag(current.code)}</span>
        <span className="hidden md:inline">{current.name_native ?? current.name_fr}</span>
        <Icon name="chevronDown" className="w-4 h-4 text-muted" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-44 bg-card border border-edge rounded-xl shadow-2xl py-2 max-h-80 overflow-y-auto z-40">
            {languages.map((l) => {
              const selected = l.code === current.code;
              return (
                <button
                  key={l.code}
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setCurrent(l);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 font-sans text-sm text-white hover:bg-white/5"
                >
                  <span className="text-base leading-none">{flag(l.code)}</span>
                  <span className="flex-1 text-left">{l.name_native ?? l.name_fr}</span>
                  {selected && <Icon name="check" className="w-4 h-4 text-brand" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
