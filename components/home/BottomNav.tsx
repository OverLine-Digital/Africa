import Link from "next/link";

const BOTTOM_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/feed", label: "Feed", icon: "📰" },
  { href: "/messages", label: "Messagerie", icon: "💬" },
  { href: "/marche", label: "Check-In marché", icon: "📊" },
  { href: "/mon-espace", label: "Mon espace", icon: "👤" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-line flex justify-around items-center py-2 z-30 md:hidden">
      {BOTTOM_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 px-3 py-1 font-sans text-[10px] text-ink/60">
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
