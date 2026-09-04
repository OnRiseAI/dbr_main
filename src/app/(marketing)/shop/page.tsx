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
  description: 'Browse the Deep Beauty Research range: pre-filled pens and lyophilised vials.',
  url: '/shop'
})

const ShopPage = async () => {
  const products = await getProducts()

  return <ShopView products={products} />
}

export default ShopPage
