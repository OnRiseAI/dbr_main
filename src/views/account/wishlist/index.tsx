'use client'

// Component Imports
import WishlistCard from '@/views/account/wishlist/wishlist-card'

// Store Imports
import { useWishlistProducts } from '@/store/use-products-store'

const WishlistView = () => {
  const products = useWishlistProducts()

  return (
    <div>
      <h3 className='mb-5.5 text-xl font-semibold'>My Wishlist</h3>

      {products.length > 0 ? (
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          {products.map(product => {
            const badges = [
              product.isNew ? { label: 'New', variant: 'new' as const } : null,
              product.showDiscountBadge ? { label: `${product.discount}% OFF`, variant: 'destructive' as const } : null
            ].filter((b): b is NonNullable<typeof b> => b !== null)

            return <WishlistCard key={product.id} product={product} badges={badges.length > 0 ? badges : undefined} />
          })}
        </div>
      ) : (
        <p className='text-muted-foreground py-10 text-center'>Your wishlist is empty.</p>
      )}
    </div>
  )
}

export { WishlistView }
