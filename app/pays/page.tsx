"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { AFRICAN_COUNTRIES, PARTNER_COUNTRIES } from "@/lib/countries";

const OTHER = "Autre pays (diaspora)";

export default function PaysPage() {
  const router = useRouter();
  const supabase = createClient();

  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleContinue() {
    if (!country) return;
    setSubmitting(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Session expirée, reconnectez-vous.");
      setSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        country: country === OTHER ? "Autre" : country,
        onboarding_step: "sans_declaration",
      })
      .eq("id", user.id);

    if (updateError) {
      setError("Une erreur est survenue. Réessayez.");
      setSubmitting(false);
      return;
    }

    router.push("/feed");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone px-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-line p-8">
        <h1 className="font-display text-2xl text-ink mb-1">Dans quel pays êtes-vous ?</h1>
        <p className="font-sans text-sm text-ink/60 mb-6">
          Cela nous permet de vous montrer les opportunités les plus proches de vous.
        </p>

        <label className="font-sans text-sm font-medium text-ink block mb-1.5">Pays</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full font-sans text-sm rounded-md border border-line bg-white px-3.5 py-2.5 mb-2"
        >
          <option value="">Choisir un pays…</option>
          <optgroup label="Afrique">
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Partenaires hors Afrique">
            {PARTNER_COUNTRIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </optgroup>
          <option value={OTHER}>{OTHER}</option>
        </select>

        {error && <p className="font-sans text-sm text-clay mt-2">{error}</p>}

        <Button type="button" className="w-full mt-6" disabled={!country} loading={submitting} onClick={handleContinue}>
          Continuer
        </Button>
      </div>
    </div>
  );
}
