// Third-party Imports
import { ShoppingBagIcon } from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

type BadgeData = {
  label: string
  variant?: 'default' | 'new' | 'destructive'
}

type Props = {
  product: Product
  badges?: BadgeData[]
  variant?: 'deals' | 'new-arrivals' | 'popular' | 'default'
  galleryView?: boolean
}

const ProductCardStatic = ({ product, badges, variant = 'default', galleryView = false }: Props) => {
  return (
    <Card
      className={cn(
        'group border pt-0 ring-0 transition-colors',
        variant === 'new-arrivals' && 'shadow-lg hover:shadow-xl',
        variant === 'deals' && 'border-destructive/20',
        variant === 'popular' && 'dark:ring-amber-700'
      )}
    >
      <div className='bg-white relative h-70 overflow-hidden rounded-t-xl border-b border-border'>
        <div
          className={cn(
            'flex h-full items-center justify-center p-5 pb-0',
            variant === 'new-arrivals' && 'pt-2',
            variant === 'deals' && 'pt-0',
            galleryView === true && 'pb-0'
          )}
        >
          <img src={product.image} alt={product.name} className='mt-auto max-h-full object-contain py-4' />
          {badges && badges.length > 0 && (
            <div className='absolute top-4.75 left-3 flex flex-col'>
              {badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  className={cn(
                    'inline-block h-5 rounded-full px-2 py-0 text-xs font-semibold',
                    badge.variant === 'new' && 'bg-green-600 text-white dark:bg-green-400',
                    badge.variant === 'destructive' && 'bg-destructive text-white'
                  )}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <CardContent className='flex flex-col'>
        <h5 className='mb-0.5 overflow-hidden text-lg font-semibold text-nowrap text-ellipsis'>{product.familyName ?? product.name}</h5>
        <p className='text-muted-foreground mb-1.5 text-xs font-medium tracking-wide uppercase'>{product.brand}</p>
        <div className='flex items-center gap-1.5 text-sm'>
          <span className='font-semibold'>
            {(product.variantCount ?? 1) > 1 ? 'From ' : ''}
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <span className='text-muted-foreground line-through'>{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <Button size='lg' className='border-border hover:bg-primary hover:text-primary-foreground mt-3 w-full'>
          Add to Cart
          <ShoppingBagIcon className='size-4' />
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCardStatic
