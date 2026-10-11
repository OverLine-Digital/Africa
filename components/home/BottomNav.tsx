"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

const BOTTOM_ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/feed", label: "Feed", icon: "feed" },
  { href: "/messages", label: "Messagerie", icon: "chat" },
  { href: "/marche", label: "Chek-In du marché", icon: "scan" },
  { href: "/mon-espace", label: "Mon espace", icon: "user" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-night border-t border-edge h-16 grid grid-cols-5">
      {BOTTOM_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 font-sans text-[12px] ${
              active ? "text-brand" : "text-white hover:text-white/80"
            }`}
          >
            <Icon name={item.icon} className="w-6 h-6" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
