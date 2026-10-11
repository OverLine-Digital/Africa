import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Routes accessibles sans session (ou pendant un onboarding incomplet)
const PUBLIC_PATHS = ["/", "/login", "/register", "/transparence", "/marche", "/recherche", "/a-propos"];
const ONBOARDING_PATHS = ["/confirm-email", "/recovery-key", "/pays", "/declarer-compte", "/verification"];

// Réservé aux comptes professionnels déclarés (commercial, freelancer,
// entreprise). Un compte "sans déclaration" voit le feed mélangé mais pas
// ces pages — il est renvoyé vers la déclaration.
const PRO_ONLY_PATHS = ["/map", "/products", "/services", "/logistics", "/partners", "/stats", "/verification"];

function isProOnly(pathname: string) {
  return PRO_ONLY_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/vendor") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(svg|png|jpg|jpeg|webp|css|js)$/)
  );
}

function isPublicCompanyPage(pathname: string) {
  return (
    pathname.startsWith("/entreprise/") ||
    pathname.startsWith("/profil/") ||
    pathname.startsWith("/boutique/") ||
    // /mon-espace/ gère lui-même la redirection vers "/" si non connecté
    // (comportement voulu, différent du reste du dashboard qui va vers /login)
    pathname.startsWith("/mon-espace/")
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAsset(pathname) || isPublicCompanyPage(pathname)) {
    return NextResponse.next();
  }

  const { supabaseResponse, supabase, user } = await updateSession(request);

  // Pas connecté → seules les pages publiques sont accessibles
  if (!user) {
    if (PUBLIC_PATHS.includes(pathname) || pathname === "/recovery-key") {
      return supabaseResponse;
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Connecté mais sur une page publique de type login/register → direction dashboard
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  // Email non confirmé → uniquement l'écran de confirmation est autorisé
  if (!user.email_confirmed_at) {
    if (pathname !== "/confirm-email" && pathname !== "/recovery-key") {
      return NextResponse.redirect(new URL("/confirm-email", request.url));
    }
    return supabaseResponse;
  }

  // Email confirmé : on lit l'étape d'onboarding réelle en base
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_step")
    .eq("id", user.id)
    .single();

  const step = profile?.onboarding_step ?? "qui_etes_vous";

  // Étape "pays" (juste après la confirmation de l'email)
  if (step === "qui_etes_vous") {
    if (pathname !== "/pays") return NextResponse.redirect(new URL("/pays", request.url));
    return supabaseResponse;
  }

  // Connecté, pays choisi, mais aucun compte professionnel déclaré :
  // dashboard générique (feed mélangé), pages pro verrouillées.
  if (step === "sans_declaration") {
    if (isProOnly(pathname) || pathname === "/pays") {
      return NextResponse.redirect(new URL(pathname === "/pays" ? "/feed" : "/declarer-compte", request.url));
    }
    return supabaseResponse;
  }

  // verification_pending et complete : compte déclaré. Accès au dashboard
  // complet ; la vérification n'est bloquante que pour publier/contacter
  // (géré dans les routes concernées, pas ici).
  if (ONBOARDING_PATHS.includes(pathname) && pathname !== "/verification") {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
