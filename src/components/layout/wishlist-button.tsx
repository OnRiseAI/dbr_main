'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { HeartIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Store Imports
import { useWishlistCount } from '@/store/use-products-store'

// Utils Imports
import { cn } from '@/lib/utils'

const WishlistButton = () => {
  const count = useWishlistCount()

  return (
    <Button
      variant='ghost'
      size='icon-lg'
      className='relative'
      render={<Link href='/account/wishlist' />}
      nativeButton={false}
    >
      <HeartIcon className='size-5.5' />
      {count > 0 && (
        <Badge
          className={cn(
            'bg-destructive absolute top-1 right-0.5 justify-center rounded-full text-[10px] text-white',
            count > 9 ? '-right-1.5 h-3.5 min-w-3.5 px-1 py-0' : 'right-0.5 size-3.5 p-0'
          )}
        >
          {count > 9 ? '9+' : count}
        </Badge>
      )}
      <span className='sr-only'>Wishlist</span>
    </Button>
  )
}

export default WishlistButton
