// Next Imports
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Component Imports
import { ProductDetailView } from '@/views/pages/product'

// Data Imports
import {
  getProductById,
  getProductIds,
  getProductsByCategory,
  getProductsByIds,
  getProductVariants
} from '@/app/server/actions'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

type Params = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const ids = await getProductIds()

  return ids.map(slug => ({ slug }))
}

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params
  const product = await getProductById(slug)

  if (!product) {
    return generateSEOMetadata({ title: 'Product Not Found', url: `/product/${slug}` })
  }

  return generateSEOMetadata({
    title: product.name,
    description: product.description,
    url: `/product/${product.id}`
  })
}

const RELATED_PRODUCTS_LIMIT = 4

const ProductPage = async ({ params }: Params) => {
  const { slug } = await params
  const product = await getProductById(slug)

  if (!product) notFound()

  const sameCategory = await getProductsByCategory(product.category)

  const relatedProducts = sameCategory
    .filter(item => item.id !== product.id && (!product.family || item.family !== product.family))
    .slice(0, RELATED_PRODUCTS_LIMIT)

  const variants = await getProductVariants(product)
  const pairsWith = product.pairsWith?.length ? await getProductsByIds(product.pairsWith) : []

  return (
    <ProductDetailView product={product} variants={variants} pairsWith={pairsWith} relatedProducts={relatedProducts} />
  )
}

export default ProductPage
