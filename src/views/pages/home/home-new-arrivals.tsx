// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import ProductCard from '@/components/blocks/product-card'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  products: Product[]
}

const HomeNewArrivals = ({ products }: Props) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-8'>
        <h3 className='text-2xl font-bold sm:text-3xl'>New Arrival Products</h3>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} variant='new-arrivals' />
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeNewArrivals
