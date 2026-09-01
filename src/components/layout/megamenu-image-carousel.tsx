'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import Autoplay from 'embla-carousel-autoplay'

// Component Imports
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

// Utils Imports
import { cn } from '@/lib/utils'

interface MegamenuImageCarouselProps {
  images: string[]
}

export const MegamenuImageCarousel = ({ images }: MegamenuImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())

    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // With align: 'start' and 3 slides visible per viewport, the middle
  // visible slide is always one position ahead of the leftmost selected one.
  const centerIndex = (selectedIndex + 1) % images.length

  return (
    <Carousel
      opts={{ loop: true, align: 'start' }}
      plugins={[Autoplay({ delay: 2200, stopOnInteraction: false })]}
      setApi={setApi}
      className='w-full'
    >
      <CarouselContent className='-ml-1 py-1 pr-0.75'>
        {images.map((src, index) => (
          <CarouselItem key={src} className='flex basis-1/3 items-center justify-center'>
            <Link href='/shop' className='flex h-40 w-24 items-center justify-center'>
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className={cn(
                  'ring-primary/10 w-24 rounded-xl object-cover ring-4 transition-all duration-500',
                  index === centerIndex ? 'h-40' : 'h-28'
                )}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
