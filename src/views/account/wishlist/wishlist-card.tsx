'use client'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import ProductCard from '@/components/blocks/product-card'

// Store Imports
import { useWishlist } from '@/store/use-products-store'

type BadgeData = {
  label: string
  variant?: 'default' | 'new' | 'destructive'
}

type Props = {
  product: Product
  badges?: BadgeData[]
}

const WishlistCard = ({ product, badges }: Props) => {
  const { removeFromWishlist } = useWishlist()

  return <ProductCard product={product} badges={badges} onWishlistClick={removeFromWishlist} />
}

export default WishlistCard
