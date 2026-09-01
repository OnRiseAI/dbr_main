// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import ProductCard from '@/components/blocks/product-card'
import ContentLayout from '@/components/layout/content-layout'
import { DealsPromotionalCard } from '@/components/blocks/deals-promotional-card'

type Props = {
  products: Product[]
}

const HomeDeals = ({ products }: Props) => {
  const displayProducts = products.slice(0, 3)

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <h3 className='mb-8 text-2xl font-bold sm:text-3xl'>Deals of the Day 🔥</h3>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <DealsPromotionalCard />
          {displayProducts.map(product => {
            const badges = [
              product.isNew ? { label: 'New', variant: 'new' as const } : null,
              product.showDiscountBadge ? { label: `${product.discount}% OFF`, variant: 'destructive' as const } : null
            ].filter((b): b is NonNullable<typeof b> => b !== null)

            return <ProductCard key={product.id} product={product} badges={badges.length > 0 ? badges : undefined} />
          })}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeDeals
