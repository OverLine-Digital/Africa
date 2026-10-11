import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SearchBar } from "./SearchBar";
import { LanguageFloater } from "./LanguageFloater";
import { LanguageQuickPills } from "./LanguageQuickPills";
import { HamburgerMenu } from "./HamburgerMenu";
import { Icon } from "@/components/ui/Icon";

type Lang = { code: string; name_fr: string; name_native: string | null };

export function Header({ languages }: { languages: Lang[] }) {
  return (
    <header className="sticky top-0 z-30 bg-night border-b border-edge">
      <div className="px-4 lg:px-6 h-[76px] flex items-center gap-4">
        <Logo />
        <div className="flex-1 flex justify-center min-w-0">
          <Suspense fallback={<div className="flex-1 max-w-3xl h-12 rounded-full bg-white/10" />}>
            <SearchBar />
          </Suspense>
        </div>
        <Link
          href="/register?next=ai-mode"
          className="hidden sm:flex items-center gap-2 h-12 px-5 rounded-full border border-brand bg-brand/10 font-sans text-sm font-medium text-white hover:bg-brand/20 shrink-0"
        >
          <Icon name="sparkle" className="w-4 h-4 text-brand" />
          AI Mode
        </Link>
        <LanguageFloater languages={languages} />
        <HamburgerMenu />
      </div>
      <Suspense fallback={null}>
        <LanguageQuickPills languages={languages} />
      </Suspense>
    </header>
  );
}
