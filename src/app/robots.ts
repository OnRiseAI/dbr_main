// Next Imports
import type { MetadataRoute } from 'next'

// Config Imports
import { siteConfig } from '@/configs/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',

      // Exclude auth pages, private paths, and URLs with query strings
      disallow: ['/private/', '/*?*']
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  }
}
