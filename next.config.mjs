/**
 * Two build modes:
 *
 *   Default        — a normal Next.js app. Use this for `npm run dev`, and for
 *                    hosts with native Next.js support (Vercel, Netlify, a Node
 *                    server). Nothing special required.
 *
 *   GITHUB_PAGES=true — a fully static export written to `out/`, served from
 *                    https://<user>.github.io/<repo>/. GitHub Pages only serves
 *                    static files, so this mode adds the repository sub-path and
 *                    turns off anything that needs a server at request time.
 *                    Driven by .github/workflows/deploy-pages.yml.
 *
 * Every page in this site is statically prerenderable, so the export is
 * feature-complete: cart, ordering, WhatsApp messages, forms, gallery and
 * lightbox all run client-side and work identically either way.
 */

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

/**
 * Repository name, used as the URL sub-path on GitHub Pages.
 * Rename the repo? Change this. Using a custom domain instead? Set
 * PAGES_BASE_PATH to an empty string in the workflow.
 */
const basePath =
  process.env.PAGES_BASE_PATH !== undefined
    ? process.env.PAGES_BASE_PATH
    : '/Bamboo-Village';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Only needed if you migrate <SmartImage /> to next/image.
    // See README → "Replacing photography".
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    // The optimizer needs a server, which Pages does not provide.
    unoptimized: isGitHubPages,
  },

  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  ...(isGitHubPages
    ? {
        output: 'export',
        basePath: basePath || undefined,
        assetPrefix: basePath ? `${basePath}/` : undefined,
        // Emits /menu/index.html rather than /menu.html, which is what static
        // hosts need in order to resolve /menu without a redirect.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
