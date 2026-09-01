// Next Imports
import type { MetadataRoute } from 'next'

// Server action Imports
import { getProductIds } from '@/app/server/actions'

// Config Imports
import { siteConfig } from '@/configs/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productIds = await getProductIds()

  const routes = [
    '' /* This is equivalent to / */,
    '/shop',
    '/category',
    '/checkout',
    '/compare',
    '/faq',
    '/help',
    '/write-review',
    '/return-policy',
    '/privacy-policy',
    '/contact',
    ...productIds.map(id => `/product/${id}`)
  ]

  return routes.map(route => ({
    url: `${siteConfig.url}${route}`
  }))
}
