export const runtime = "edge";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MonEspaceIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: boutique } = await supabase
    .from("boutiques")
    .select("slug")
    .eq("owner_id", user.id)
    .single();

  if (boutique) {
    redirect(`/mon-espace/${boutique.slug}`);
  }

  // Pas encore de boutique créée
  redirect("/profile");
}
