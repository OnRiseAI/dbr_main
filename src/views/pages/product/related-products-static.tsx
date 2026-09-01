// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ProductCardStatic from '@/components/blocks/product-card-static'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  products: Product[]
  galleryView?: boolean
}

const RelatedProductsStatic = ({ products, galleryView = false }: Props) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <Carousel opts={{ align: 'start', slidesToScroll: 1 }}>
          <div className='mb-6 flex justify-between gap-4 sm:gap-8 md:items-end md:gap-16'>
            <h3 className='text-2xl font-bold lg:text-3xl'>You May Also Like</h3>
            <div className='flex gap-1'>
              <CarouselPrevious variant='ghost' size='icon' className='static size-7.5 translate-y-0 [&_svg]:size-6!' />
              <CarouselNext variant='ghost' size='icon' className='static size-7.5 translate-y-0 [&_svg]:size-6!' />
            </div>
          </div>
          <CarouselContent>
            {products.map(product => (
              <CarouselItem key={product.id} className='basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4'>
                <ProductCardStatic product={product} galleryView={galleryView} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </ContentLayout>
    </section>
  )
}

export default RelatedProductsStatic
