// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ContentCard from '@/components/layout/content-card'
import { WriteReviewView } from '@/views/pages/write-review'

// Data Imports
import { getProductById, getSampleProduct } from '@/app/server/actions'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Write a Review',
  description: 'Share your experience with this product. Rate the quality, fit, delivery, and value for money.',
  url: '/write-review'
})

type Props = {
  searchParams: Promise<{ product?: string }>
}

const WriteReviewPage = async ({ searchParams }: Props) => {
  const { product: productId } = await searchParams

  const product =
    (productId ? await getProductById(productId) : null) ??
    (await getProductById('nike-drifit-tshirt')) ??
    (await getSampleProduct())

  return (
    <ContentCard>
      <WriteReviewView product={product} />
    </ContentCard>
  )
}

export default WriteReviewPage
