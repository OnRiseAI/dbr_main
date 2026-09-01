'use client'

// React Imports
import { useEffect, useState } from 'react'

// Type Imports
import type { AnnouncementItem } from '@/fake-db/announcement'

// Component Imports
import { Marquee } from '@/components/ui/marquee'

// Server action Imports
import { getAnnouncements } from '@/app/server/actions'

const StarIcon = ({ color }: { color: string }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 25 25' fill='none' className='shrink-0'>
    <path
      d='M12 0L14.5456 9.45442L24 12L14.5456 14.5456L12 24L9.45442 14.5456L0 12L9.45442 9.45442L12 0Z'
      className={color}
    />
  </svg>
)

const AnnouncementBanner = () => {
  const [items, setItems] = useState<AnnouncementItem[]>([])

  useEffect(() => {
    getAnnouncements().then(setItems)
  }, [])

  if (items.length === 0) return null

  // Create multiple copies for seamless looping
  const loopedItems = [...items, ...items, ...items]

  return (
    <div className='w-full bg-black'>
      <div className='relative mx-auto'>
        <div className='scrollbar-hide flex items-center justify-center overflow-hidden'>
          <Marquee pauseOnHover duration={300} gap={1.5} className='px-0 py-1.5 *:gap-7'>
            {loopedItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className='flex items-center gap-4'>
                <p className='text-sm font-semibold whitespace-nowrap text-white'>{item.name}</p>
                <StarIcon color={item.color} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBanner
