// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { MegamenuImageCarousel } from '@/components/layout/megamenu-image-carousel'

export const MegamenuPromotionalCard1 = () => {
  return (
    <div className='w-full shrink-0 overflow-hidden lg:w-87.5'>
      <div className='from-0 flex h-104 flex-col items-center justify-between rounded-lg bg-linear-to-b from-green-600/15 via-green-500/10 via-50% to-green-300/10 to-100% p-4 pt-10 text-center'>
        <div>
          <h3 className='text-foreground text-2xl font-bold'>
            Enjoy Flat <span className='text-destructive'>50% OFF</span>
          </h3>
          <h4 className='text-foreground mb-2.5 text-2xl font-bold'>Across All Categories</h4>
          <p className='mb-2 text-lg'>Grab Your Favorites Now.</p>
          <Button size='lg' className='group mx-auto flex items-center'>
            Shop Now
            <ArrowRightIcon className='transition-transform duration-300 group-hover:translate-x-1/4' />
          </Button>
        </div>

        <MegamenuImageCarousel
          images={[
            '/images/mega-menu/image-06.webp',
            '/images/mega-menu/image-04.webp',
            '/images/mega-menu/image-08.webp',
            '/images/mega-menu/image-05.webp',
            '/images/mega-menu/image-07.webp'
          ]}
        />
      </div>
    </div>
  )
}
