'use client'

// React Imports
import { useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import ContentLayout from '@/components/layout/content-layout'
import ProductCarousel from '@/views/pages/product/product-carousel'
import ProductInfo from '@/views/pages/product/product-info'
import ProductHighlights from '@/views/pages/product/product-highlights'
import ProductReviews from '@/views/pages/product/product-reviews'
import RelatedProducts from '@/views/pages/product/related-products'
import CategoryBenefits from '@/views/pages/category/category-benefits'

// Store Imports
import { useProductsStore } from '@/store/products-store'

type Props = {
  product: Product
  relatedProducts: Product[]
}

const ProductDetailView = ({ product, relatedProducts }: Props) => {
  const initializeProducts = useProductsStore(state => state.initializeProducts)

  useEffect(() => {
    const state = useProductsStore.getState()
    const existingProduct = state.products.get(product.id)

    if (!existingProduct) {
      initializeProducts([product])
    }
  }, [product.id, product, initializeProducts])

  return (
    <main className='flex-1'>
      <section className='py-8 lg:py-14'>
        <ContentLayout>
          <Breadcrumb className='mb-1.5'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href='/' />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href='/shop' />}>Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-primary'>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className='grid gap-6 lg:grid-cols-2 lg:gap-8'>
            <ProductCarousel images={product.images} alt={product.name} />
            <ProductInfo product={product} />
          </div>
        </ContentLayout>
      </section>

      <ProductHighlights rows={product.highlights} />
      <ProductReviews
        productId={product.id}
        reviews={product.reviews}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />
      <RelatedProducts products={relatedProducts} />
      <CategoryBenefits />
    </main>
  )
}

export { ProductDetailView }
export default ProductDetailView
