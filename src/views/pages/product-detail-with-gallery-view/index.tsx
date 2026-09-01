// Next Imports
import Link from 'next/link'

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
import ProductGallery from '@/views/pages/product/product-gallery'
import ProductInfo from '@/views/pages/product/product-info'
import ProductHighlights from '@/views/pages/product/product-highlights'
import ProductReviews from '@/views/pages/product/product-reviews'
import RelatedProductsStatic from '@/views/pages/product/related-products-static'
import CategoryBenefits from '@/views/pages/category/category-benefits'

// Data Imports
import { staticProduct, staticRelatedProducts } from '@/views/pages/product-detail-with-gallery-view/data'

const ProductDetailWithGalleryView = () => {
  const product = staticProduct

  return (
    <main className='flex-1'>
      <section className='py-8 lg:py-14'>
        <ContentLayout>
          <Breadcrumb className='mb-3.5'>
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
            <ProductGallery images={product.images} alt={product.name} />
            <div className='sticky top-40 self-start'>
              <ProductInfo product={product} />
            </div>
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
      <RelatedProductsStatic products={staticRelatedProducts} galleryView={true} />
      <CategoryBenefits />
    </main>
  )
}

export { ProductDetailWithGalleryView }
export default ProductDetailWithGalleryView
