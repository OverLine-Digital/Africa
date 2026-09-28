export const runtime = "edge";

import { createClient } from "@/lib/supabase/server";
import { NewPostForm } from "@/components/feed/NewPostForm";
import { PostCard, type FeedPost } from "@/components/feed/PostCard";
import { PhotoSearch } from "@/components/search/PhotoSearch";
import type { UserRole } from "@/lib/types";

// Types de publication mis en avant en premier selon le rôle du visiteur —
// le feed reste le même pour tous (même RLS, même contenu disponible),
// seul l'ORDRE change pour montrer d'abord ce qui concerne chacun.
const PRIORITY_BY_ROLE: Partial<Record<UserRole, string[]>> = {
  freelance: ["offre_emploi", "offre_freelance"],
  commercant: ["annonce", "rfq", "recherche_fournisseur"],
  vendeur: ["annonce", "rfq", "recherche_fournisseur"],
  fournisseur: ["rfq", "recherche_fournisseur", "recherche_partenaire_business", "capacite_disponible"],
  fabricant: ["rfq", "recherche_fournisseur", "recherche_partenaire_business", "capacite_disponible"],
  distributeur: ["recherche_distributeur", "recherche_partenaire_business", "rfq"],
  grossiste: ["recherche_distributeur", "rfq", "recherche_partenaire_business"],
  importateur: ["rfq", "recherche_partenaire_business", "capacite_disponible"],
  transporteur: ["capacite_disponible", "rfq"],
  investisseur: ["recherche_partenaire_business", "annonce"],
  prestataire_service: ["offre_emploi", "recherche_partenaire_business"],
};

export default async function FeedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: viewerProfile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).single()
    : { data: null };

  // RLS (posts_select_selon_audience) filtre déjà automatiquement les
  // publications entreprises_uniquement selon le rôle de l'utilisateur
  // connecté — aucun filtrage supplémentaire à faire côté application.
  const { data: posts } = await supabase
    .from("posts")
    .select(
      `id, type, content, created_at,
       profiles:author_id ( id, full_name, role, companies ( id, name, verification_status ) )`
    )
    .order("created_at", { ascending: false })
    .limit(30);

  const priorityTypes = viewerProfile?.role ? PRIORITY_BY_ROLE[viewerProfile.role as UserRole] ?? [] : [];

  const sortedPosts = posts
    ? [...(posts as unknown as FeedPost[])].sort((a, b) => {
        const aPriority = priorityTypes.includes(a.type) ? 0 : 1;
        const bPriority = priorityTypes.includes(b.type) ? 0 : 1;
        return aPriority - bPriority; // tri stable : la date reste l'ordre secondaire
      })
    : null;

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl text-ink">Feed</h1>
        <p className="font-sans text-sm text-ink/60 mt-1">
          Les demandes et opportunités pertinentes pour votre profil.
        </p>
      </div>

      <PhotoSearch />

      <NewPostForm />

      <div className="flex flex-col gap-4">
        {sortedPosts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {posts?.length === 0 && (
          <p className="font-sans text-sm text-ink/50 text-center py-8">
            Aucune publication pour l'instant. Soyez le premier à publier.
          </p>
        )}
      </div>
    </div>
  );
}
