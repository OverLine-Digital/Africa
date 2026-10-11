"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const MENU_ITEMS = [
  { href: "/profile", label: "Mon profil" },
  { href: "/verification", label: "Vérification de mon compte" },
  { href: "/transparence", label: "Transparence AfrikaHub" },
  { href: "/a-propos", label: "À propos d'AfrikaHub" },
];

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-2.5 rounded-lg text-white hover:bg-white/10"
        aria-label="Menu"
      >
        <Icon name="menu" className="w-7 h-7" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-card border border-edge rounded-xl shadow-2xl py-2 w-64 z-40">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-sans text-sm px-4 py-2.5 text-white hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-edge my-1" />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block font-sans text-sm px-4 py-2.5 text-sun hover:bg-white/5"
            >
              Se connecter / Se déconnecter
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
