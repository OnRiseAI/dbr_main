// Next Imports
import type { MetadataRoute } from 'next'

// Server action Imports
import { getPages, getProductIds } from '@/app/server/actions'

// Config Imports
import { siteConfig } from '@/configs/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productIds = await getProductIds()
  const pages = await getPages()

  const routes = [
    '',
    '/shop',
    '/category',
    ...pages.map(page => `/pages/${page.handle}`),
    ...productIds.map(id => `/product/${id}`)
  ]

  return routes.map(route => ({
    url: `${siteConfig.url}${route}`
  }))
}
