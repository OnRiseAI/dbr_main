// Component Imports
import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import ContentLayout from '@/components/layout/content-layout'

type GalleryMedia = {
  type: 'image' | 'video'
  src: string
}

const communityVideos: GalleryMedia[] = [
  { type: 'video', src: '/videos/community-01.webm' },
  { type: 'video', src: '/videos/community-03.webm' },
  { type: 'image', src: '/images/landing-page/community-02.webp' },
  { type: 'video', src: '/videos/community-04.webm' },
  { type: 'image', src: '/images/landing-page/community-03.webp' },
  { type: 'video', src: '/videos/community-02.webm' }
]

const HomeCarousel = () => {
  const galleryMedia: GalleryMedia[] = [...communityVideos]

  return (
    <section className='py-8 sm:py-16 lg:py-24' id='community'>
      <ContentLayout>
        <h2 className='text-center text-2xl font-bold lg:text-3xl'>Inspired by Our Community</h2>
      </ContentLayout>

      <div className='relative'>
        <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-15 bg-linear-to-r to-transparent max-sm:hidden' />
        <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-10 bg-linear-to-l to-transparent max-sm:hidden' />
        <div className='w-full overflow-hidden'>
          <Marquee className='flex gap-4 py-8' pauseOnHover>
            {galleryMedia.map((media, index) => (
              <div key={`${media.type}-${media.src}`} className='h-63.5 w-63.5 shrink-0 overflow-hidden rounded-lg'>
                {media.type === 'image' ? (
                  <img src={media.src} alt={`Gallery ${index + 1}`} className='size-full object-cover' />
                ) : (
                  <video
                    src={media.src}
                    aria-label={`Community video ${index + 1}`}
                    className='size-full object-cover object-top'
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <ContentLayout className='text-center'>
        <Button variant='outline' size='lg' className='gap-1.5 shadow-sm' render={<a href='#' />} nativeButton={false}>
          <img src='/images/landing-page/instagram-icon.webp' alt='instagram icon' className='size-4' />
          Follow Us @shopix
        </Button>
      </ContentLayout>
    </section>
  )
}

export default HomeCarousel
