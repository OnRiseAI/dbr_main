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
import ProductIncluded from '@/views/pages/product/product-included'
import ProductSpecs from '@/views/pages/product/product-specs'
import ProductDetailsTabs from '@/views/pages/product/product-details-tabs'
import ProductFormatExplainer from '@/views/pages/product/product-format-explainer'
import ProductFaq from '@/views/pages/product/product-faq'
import ProductReviews from '@/views/pages/product/product-reviews'
import RelatedProducts from '@/views/pages/product/related-products'
import HomeCalculator from '@/views/pages/home/home-calculator'

// Store Imports
import { useProductsStore } from '@/store/products-store'

type Props = {
  product: Product
  variants?: Product[]
  pairsWith?: Product[]
  relatedProducts: Product[]
}

const ProductDetailView = ({ product, variants = [product], pairsWith = [], relatedProducts }: Props) => {
  const initializeProducts = useProductsStore(state => state.initializeProducts)

  useEffect(() => {
    const state = useProductsStore.getState()
    const existingProduct = state.products.get(product.id)

    if (!existingProduct) {
      initializeProducts([product])
    }
  }, [product.id, product, initializeProducts])

  const companions = pairsWith.length > 0 ? pairsWith : relatedProducts

  return (
    <main className='flex-1'>
      <section className='py-8 lg:py-12'>
        <ContentLayout>
          <Breadcrumb className='mb-4'>
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

          <div className='grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12'>
            <ProductCarousel images={product.images} video={product.video} alt={product.name} />
            <ProductInfo product={product} variants={variants} />
          </div>
        </ContentLayout>
      </section>

      <ProductIncluded product={product} />
      <ProductSpecs product={product} />
      <ProductDetailsTabs product={product} />
      <HomeCalculator
        defaultFormat={product.specs?.form}
        defaultProductId={product.id}
        title='Work out your units'
        subtitle='This product is preselected. Enter the amount you use and see the units on the dial or syringe.'
      />
      <ProductFormatExplainer product={product} />
      <ProductFaq product={product} variants={variants} />
      {product.reviewCount > 0 ? (
        <ProductReviews
          productId={product.id}
          reviews={product.reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      ) : null}
      {companions.length > 0 ? <RelatedProducts products={companions} title='Pairs with' /> : null}
    </main>
  )
}

export { ProductDetailView }
export default ProductDetailView
