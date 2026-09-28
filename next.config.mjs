/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // L'API d'optimisation d'images de Next.js (serveur) n'est pas supportée
    // par Cloudflare Pages — désactivée par précaution même si aucun
    // composant <Image> n'est utilisé actuellement dans le projet.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
