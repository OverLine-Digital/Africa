const PATHS = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  camera: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM6 11a6 6 0 0 0 12 0M12 17v4",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  bag: "M6 8h12l1 12H5zM9 8V6a3 3 0 0 1 6 0v2",
  building: "M4 21V4h9v17M13 9h7v12M4 21h16M8 8h1M8 12h1M8 16h1",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  store: "M4 9l1-5h14l1 5M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 6 0 2.5 2.5 0 0 0 5 0M5 11v9h14v-9M10 20v-5h4v5",
  truck: "M2 6h11v10H2zM13 9h4l3 3v4h-7M6 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  network: "M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 23a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 23a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 5v6M12 11l-7 8M12 11l7 8",
  gear: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  gavel: "M14 4l6 6-3 3-6-6zM8 10l6 6M4 20l7-7",
  apps: "M5.5 5.5h3v3h-3zM15.5 5.5h3v3h-3zM5.5 15.5h3v3h-3zM15.5 15.5h3v3h-3z",
  feed: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  chat: "M4 5h16v11H9l-5 4z",
  scan: "M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 12h8",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  pin: "M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  heart: "M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  check: "M5 12.5l4.5 4.5L19 7.5",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  phone: "M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2",
  cart: "M3 4h2l2.4 11h10l2-8H6.5M9 20h.01M17 20h.01",
  car: "M5 17v-5l2-5h10l2 5v5M3 17h18M7.5 14h.01M16.5 14h.01M5 17v2M19 17v2",
  health: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  ball: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM5.5 6.5c3 2 3 9 0 11M18.5 6.5c-3 2-3 9 0 11",
  leaf: "M5 19c0-9 5-14 15-14 0 10-5 15-14 15zM5 19l8-8",
  hardhat: "M3 18h18M5 18v-2a7 7 0 0 1 14 0v2M12 9v4",
  translate: "M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 4-3 7-7 8M12 21l4-9 4 9M13.5 18h5",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  palette: "M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3c0-5-4-11-8-11zM7.5 11h.01M10 7.5h.01M15 7.5h.01",
  handshake: "M2 12l4-4 4 2 3-2 5 3 4-3M6 8l-4 4M9 17l2 2 2-1M12 14l3 3M18 8l4 4",
  megaphone: "M4 10v4h3l8 4V6L7 10zM18 9a4 4 0 0 1 0 6",
  headset: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3zM20 19c0 1.5-2 2-5 2",
  plane: "M2 16l8-3V6l2-3 2 3v7l8 3v2l-8-1v3l2 1v1l-4-.5L8 22v-1l2-1v-3l-8 1z",
  more: "M5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM19 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className = "w-5 h-5",
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function VerifiedBadge({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-brand shrink-0`} aria-label="Vérifié">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
