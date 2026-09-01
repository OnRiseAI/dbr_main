// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ProductCard from '@/components/blocks/product-card'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  products: Product[]
}

const HomePopularProducts = ({ products }: Props) => {
  const popularProducts = products.filter(product => product.isPopular)

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <Carousel opts={{ align: 'start', slidesToScroll: 1 }} className='space-y-8'>
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-bold sm:text-3xl'>Popular Products</h3>
            <div className='flex gap-1'>
              <CarouselPrevious variant='ghost' size='icon-sm' className='static translate-y-0 [&_svg]:size-6!' />
              <CarouselNext variant='ghost' size='icon-sm' className='static translate-y-0 [&_svg]:size-6!' />
            </div>
          </div>

          <CarouselContent>
            {popularProducts.map(product => (
              <CarouselItem key={product.id} className='basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4'>
                <ProductCard
                  product={product}
                  variant='popular'
                  badges={[
                    product.isNew ? { label: 'New', variant: 'new' as const } : null,
                    product.showDiscountBadge
                      ? { label: `${product.discount}% OFF`, variant: 'destructive' as const }
                      : null
                  ].filter((b): b is NonNullable<typeof b> => b !== null)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </ContentLayout>
    </section>
  )
}

export default HomePopularProducts
