// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ProductListView } from '@/views/pages/product-list'

// Data Imports
import { getProducts } from '@/app/server/actions'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Product Listing',
  description: 'Browse products with attribute-based filters.',
  url: '/product-list-with-banner'
})

const ProductListPage = async () => {
  const products = await getProducts()

  return <ProductListView products={products} />
}

export default ProductListPage
