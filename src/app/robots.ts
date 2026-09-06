// Next Imports
import type { MetadataRoute } from 'next'

// Config Imports
import { siteConfig } from '@/configs/site'

/** Staging hosts (vercel.app) must never be indexed; the real domain gets the normal rules. */
export const isStagingHost = () => /vercel\.app|localhost/.test(siteConfig.url)

export default function robots(): MetadataRoute.Robots {
  if (isStagingHost()) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',

      // Keep filtered and paginated shop URLs out of the index, but let the category
      // landing pages the navigation links to be crawled.
      disallow: ['/private/', '/account', '/checkout', '/shop?*sort=*', '/shop?*page=*']
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  }
}
