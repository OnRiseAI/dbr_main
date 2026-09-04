'use client'

// React Imports
import { useEffect, useState } from 'react'

// Component Imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

// Utils Imports
import { cn } from '@/lib/utils'

type Props = {
  images: string[]
  video?: string
  alt: string
}

const ProductCarousel = ({ images, video, alt }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelected(api.selectedScrollSnap())

    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className='w-full'>
      <Carousel
        setApi={setApi}
        opts={{ align: 'start' }}
        className='group bg-white ring-1 ring-border relative overflow-hidden rounded-xl'
      >
        <CarouselContent className='ml-0'>
          {images.map((src, index) => (
            <CarouselItem key={index} className='basis-full pl-0'>
              <div className='flex h-80 items-center justify-center py-5 sm:h-112 sm:py-6 lg:h-140 lg:py-8'>
                <img
                  src={src}
                  alt={alt}
                  className='max-h-full object-contain transition-transform duration-300 hover:scale-105'
                />
              </div>
            </CarouselItem>
          ))}
          {video ? (
            <CarouselItem className='basis-full pl-0'>
              <div className='flex h-80 items-center justify-center bg-black sm:h-112 lg:h-140'>
                <video src={video} controls playsInline preload='metadata' className='max-h-full max-w-full' />
              </div>
            </CarouselItem>
          ) : null}
        </CarouselContent>
        <CarouselPrevious className='left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 disabled:opacity-0 group-hover:disabled:opacity-50' />
        <CarouselNext className='right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 disabled:opacity-0 group-hover:disabled:opacity-50' />
      </Carousel>
      <div className='mt-2.5 flex gap-2.5 overflow-x-auto'>
        {images.map((src, index) => (
          <Button
            key={index}
            type='button'
            variant='outline'
            aria-label={`View image ${index + 1}`}
            aria-pressed={selected === index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'border-border h-auto grow items-center justify-center rounded-xl border p-1 active:not-aria-[haspopup]:translate-y-0 md:h-30',
              selected === index && 'border-primary dark:border-primary/70'
            )}
          >
            <img src={src} alt={alt} className='max-h-20 object-contain' />
          </Button>
        ))}
        {video ? (
          <Button
            type='button'
            variant='outline'
            aria-label='Play video'
            aria-pressed={selected === images.length}
            onClick={() => api?.scrollTo(images.length)}
            className={cn(
              'border-border h-auto grow items-center justify-center gap-2 rounded-xl border p-1 text-xs font-semibold md:h-30',
              selected === images.length && 'border-primary dark:border-primary/70'
            )}
          >
            <span className='bg-foreground text-background flex size-8 items-center justify-center rounded-full'>
              <span className='ms-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-current' />
            </span>
            Watch
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default ProductCarousel
