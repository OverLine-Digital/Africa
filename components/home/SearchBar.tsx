"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
  }

  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  async function handlePhotoSelected(file: File) {
    // La recherche par photo elle-même (/api/search/photo) exige une session
    // — un visiteur non connecté est invité à se créer un compte pour aller
    // plus loin, plutôt que de faire échouer silencieusement l'appel.
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
    recognition.lang = "fr-FR";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      router.push(`/recherche?q=${encodeURIComponent(transcript)}`);
    };
    recognition.start();
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-1 max-w-2xl bg-white rounded-full border border-line overflow-hidden">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit, une entreprise, un service…"
        className="flex-1 font-sans text-sm px-5 py-3 focus:outline-none"
      />
      <button
        type="button"
        onClick={handlePhotoClick}
        className="px-3 py-2 text-lg hover:bg-stone-dim shrink-0"
        title="Recherche par photo"
      >
        📷
      </button>
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
      <button
        type="button"
        onClick={handleVoiceClick}
        className={`px-3 py-2 text-lg hover:bg-stone-dim shrink-0 ${listening ? "animate-pulse text-clay" : ""}`}
        title="Recherche vocale"
      >
        🎙️
      </button>
      <button type="submit" className="bg-indigo text-stone px-5 py-3 font-sans text-sm font-medium shrink-0">
        Rechercher
      </button>
    </form>
  );
}
