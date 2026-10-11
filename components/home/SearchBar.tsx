"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

// Langue de reconnaissance vocale selon la langue choisie (?lang=). La prise
// en charge dépend du navigateur : si une langue n'est pas reconnue, on le
// dit clairement plutôt que de transcrire n'importe quoi.
const VOICE_LOCALES: Record<string, string> = {
  fr: "fr-FR", en: "en-US", pt: "pt-PT", ar: "ar-EG", ha: "ha-NG", sw: "sw-KE",
  am: "am-ET", pcm: "en-NG", yo: "yo-NG", ig: "ig-NG", zu: "zu-ZA", xh: "xh-ZA",
  af: "af-ZA", so: "so-SO", om: "om-ET", rw: "rw-RW", mg: "mg-MG", ln: "ln-CD",
  wo: "wo-SN", tw: "ak-GH", sn: "sn-ZW", ff: "ff-SN", ti: "ti-ET", kg: "kg-CD",
  tzm: "ber-MA", st: "st-ZA", tn: "tn-ZA", nl: "nl-NL", kea: "pt-CV",
};

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const voiceLocale = VOICE_LOCALES[searchParams.get("lang") ?? "fr"] ?? "fr-FR";
  const [heard, setHeard] = useState<string | null>(null); // texte compris, en attente de confirmation
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
  }

  function handlePhotoSelected(_file: File) {
    // /api/search/photo exige une session : on invite le visiteur à se connecter.
    router.push("/register?next=recherche-photo");
  }

  function handleVoiceClick() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La recherche vocale n'est pas disponible sur ce navigateur.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = voiceLocale;
    setVoiceError(null);
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event: any) => {
      setListening(false);
      setVoiceError(
        event.error === "language-not-supported"
          ? "Cette langue n'est pas reconnue par votre navigateur. Essayez en français."
          : "Je n'ai pas pu vous entendre. Réessayez."
      );
    };
    // On ne lance JAMAIS la recherche directement : la personne confirme
    // (ou corrige) d'abord ce qui a été compris.
    recognition.onresult = (event: any) => {
      setHeard(event.results[0][0].transcript);
    };
    recognition.start();
  }

  function confirmVoice() {
    const text = (heard ?? "").trim();
    if (!text) return;
    setQuery(text);
    setHeard(null);
    router.push(`/recherche?q=${encodeURIComponent(text)}`);
  }

  return (
    <>
    {(heard !== null || voiceError) && (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-panel border border-edge rounded-xl p-5">
          {voiceError ? (
            <>
              <p className="font-sans text-sm text-white mb-4">{voiceError}</p>
              <button
                type="button"
                onClick={() => setVoiceError(null)}
                className="font-sans text-sm text-white bg-card border border-edge rounded-full px-4 py-2"
              >
                Fermer
              </button>
            </>
          ) : (
            <>
              <p className="font-sans text-xs text-muted mb-1">Voici ce que j&apos;ai compris</p>
              <input
                value={heard ?? ""}
                onChange={(e) => setHeard(e.target.value)}
                className="w-full font-sans text-base text-white bg-card border border-edge rounded-lg px-3 py-2.5 mb-4 focus:outline-none focus:border-brand"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setHeard(null)}
                  className="font-sans text-sm text-muted px-4 py-2"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => { setHeard(null); handleVoiceClick(); }}
                  className="font-sans text-sm text-white bg-card border border-edge rounded-full px-4 py-2"
                >
                  Réessayer
                </button>
                <button
                  type="button"
                  onClick={confirmVoice}
                  disabled={!(heard ?? "").trim()}
                  className="font-sans text-sm font-medium text-white bg-brand rounded-full px-4 py-2 disabled:opacity-50"
                >
                  Rechercher
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )}
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch flex-1 min-w-0 max-w-3xl h-12 bg-white rounded-full border border-white/20 overflow-hidden"
    >
      <Icon name="search" className="w-5 h-5 text-night/70 self-center ml-4 shrink-0" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit, une entreprise, un service, un freelance…"
        className="flex-1 min-w-0 font-sans text-sm text-night placeholder:text-night/40 px-3 focus:outline-none bg-transparent"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handlePhotoSelected(file);
        }}
      />
      <div className="flex shrink-0 bg-night border-l border-edge">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-0.5 px-4 text-white hover:bg-card border-r border-edge"
          title="Recherche par photo"
        >
          <Icon name="camera" className="w-4 h-4" />
          <span className="font-sans text-[11px]">Photo</span>
        </button>
        <button
          type="button"
          onClick={handleVoiceClick}
          className={`flex flex-col items-center justify-center gap-0.5 px-4 text-white hover:bg-card ${listening ? "animate-pulse text-sun" : ""}`}
          title="Recherche vocale"
        >
          <Icon name="mic" className="w-4 h-4" />
          <span className="font-sans text-[11px]">Vocal</span>
        </button>
      </div>
    </form>
    </>
  );
}
