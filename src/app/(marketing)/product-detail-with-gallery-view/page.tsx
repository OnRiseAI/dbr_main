// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ProductDetailWithGalleryView } from '@/views/pages/product-detail-with-gallery-view'
import { staticProduct } from '@/views/pages/product-detail-with-gallery-view/data'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const generateMetadata = async (): Promise<Metadata> => {
  return generateSEOMetadata({
    title: staticProduct.name,
    description: staticProduct.description,
    url: '/product-detail-with-gallery-view'
  })
}

const ProductDetailWithGalleryPage = () => {
  return <ProductDetailWithGalleryView />
}

export default ProductDetailWithGalleryPage
