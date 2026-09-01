// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ShopView } from '@/views/pages/shop'

// Data Imports
import { getProducts } from '@/app/server/actions'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Shop',
  description: 'Browse the full Shopix catalog - filter by category, brand, and price.',
  url: '/shop'
})

const ShopPage = async () => {
  const products = await getProducts()

  return <ShopView products={products} />
}

export default ShopPage
