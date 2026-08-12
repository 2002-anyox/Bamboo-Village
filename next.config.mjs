/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Bambo-Village',
  
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
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
