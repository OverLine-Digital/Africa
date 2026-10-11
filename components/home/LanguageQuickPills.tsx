"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getLanguageFlag } from "@/lib/languageFlags";

type Lang = { code: string; name_fr: string; name_native: string | null };

export function LanguageQuickPills({ languages }: { languages: Lang[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("lang") ?? "fr";

  function selectLang(code: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", code);
    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex sm:hidden items-center gap-1.5 px-4 pb-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => selectLang(l.code)}
          className={`flex items-center gap-1 font-sans text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full border transition-colors shrink-0 ${
            current === l.code ? "border-brand text-brand bg-brand/10" : "border-edge text-muted"
          }`}
        >
          <span className="text-sm leading-none">{getLanguageFlag(l.code)}</span>
          {l.name_native ?? l.name_fr}
        </button>
      ))}
    </div>
  );
}
