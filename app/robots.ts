import type { MetadataRoute } from 'next';
import { restaurantConfig } from '@/data/restaurant';

/** Emitted as a file at build time — required for the static Pages export. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${restaurantConfig.siteUrl}/sitemap.xml`,
    host: restaurantConfig.siteUrl,
  };
}
