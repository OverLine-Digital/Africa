"use client";

import { useState } from "react";
import Link from "next/link";

const MENU_ITEMS = [
  { href: "/profile", label: "Mon profil" },
  { href: "/verification", label: "Vérification de mon compte" },
  { href: "/transparence", label: "Transparence OverLine" },
  { href: "/a-propos", label: "À propos d'OverLine Africa Hub" },
];

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-1 p-2.5 rounded-md hover:bg-stone-dim"
        aria-label="Menu"
      >
        <span className="w-5 h-0.5 bg-ink" />
        <span className="w-5 h-0.5 bg-ink" />
        <span className="w-5 h-0.5 bg-ink" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-1 bg-white border border-line rounded-lg shadow-lg py-2 w-64 z-20">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-sans text-sm px-4 py-2.5 text-ink hover:bg-stone-dim"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-line my-1" />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block font-sans text-sm px-4 py-2.5 text-clay hover:bg-stone-dim"
            >
              Se connecter / Se déconnecter
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
