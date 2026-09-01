// Type Imports
import type { Brand } from '@/types/product'

// Component Imports
import { Marquee } from '@/components/ui/marquee'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  brands: Brand[]
}

const HomeBrands = ({ brands }: Props) => {
  return (
    <section className='py-6 md:py-10 lg:py-14'>
      <ContentLayout>
        <div className='space-y-8'>
          <h2 className='text-center text-2xl font-bold sm:text-3xl'>Shop By Brands</h2>

          <div className='relative mx-auto w-8/9 overflow-hidden'>
            <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-35 bg-linear-to-r to-transparent' />
            <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-35 bg-linear-to-l to-transparent' />
            <Marquee pauseOnHover gap={2} duration={25}>
              {brands.map((brand, index) => (
                <div key={index} className='flex w-34 items-center justify-center rounded-xl border py-6'>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className='text-muted-foreground h-7 w-auto max-w-none object-contain dark:invert'
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeBrands
