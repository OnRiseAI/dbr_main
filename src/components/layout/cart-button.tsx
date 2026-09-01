'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ShoppingBagIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Store Imports
import { useCartCount } from '@/store/use-products-store'

// Utils Imports
import { cn } from '@/lib/utils'

const CartButton = () => {
  const count = useCartCount()

  return (
    <Button variant='ghost' size='icon-lg' className='relative' render={<Link href='/checkout' />} nativeButton={false}>
      <ShoppingBagIcon className='size-5.5' />
      {count > 0 && (
        <Badge
          className={cn(
            'bg-destructive absolute top-1 justify-center rounded-full text-xs text-white',
            count > 9 ? '-right-1.5 h-3.5 py-0 pr-0.5 pl-1' : 'right-0.5 size-3.5 p-0'
          )}
        >
          {count > 9 ? '9+' : count}
        </Badge>
      )}
      <span className='sr-only'>Cart</span>
    </Button>
  )
}

export default CartButton
