import type { MetadataRoute } from 'next';
import { restaurantConfig } from '@/data/restaurant';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${restaurantConfig.siteUrl}/sitemap.xml`,
    host: restaurantConfig.siteUrl,
  };
}
