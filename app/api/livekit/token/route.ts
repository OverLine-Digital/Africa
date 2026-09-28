import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { createClient } from "@/lib/supabase/server";

// Runtime Edge requis pour un déploiement Cloudflare Pages. livekit-server-sdk
// v2+ signe ses tokens avec la librairie "jose" (Web Crypto), pas le module
// Node "crypto" — compatible en théorie, mais à tester en premier après
// déploiement : c'est la route la plus à risque du projet.
export const runtime = "edge";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { conversationId } = await request.json();
  if (!conversationId) {
    return NextResponse.json({ error: "conversationId manquant" }, { status: 400 });
  }

  // On ne délivre un token que si l'utilisateur participe réellement à
  // cette conversation — jamais faire confiance à la room passée par le client.
  const { data: isParticipant } = await supabase.rpc("is_conversation_participant", {
    target_conversation_id: conversationId,
  });

  if (!isParticipant) {
    return NextResponse.json({ error: "Accès refusé à cette conversation" }, { status: 403 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const roomName = `conversation-${conversationId}`;

  const token = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
    identity: user.id,
    name: profile?.full_name ?? "Utilisateur OverLine",
  });

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return NextResponse.json({
    token: await token.toJwt(),
    url: process.env.LIVEKIT_URL,
    roomName,
  });
}
