export type ProductColor = {
  name: string

  /** CSS colour for the swatch + the value the shop colour filter matches on. */
  value: string
}

export type ProductSize = {
  label: string
  note?: string
  disabled?: boolean
}

export type ProductHighlight = {
  category: string
  manufacture: string
  material: string
  compatibility: string
  features: string[]
}

export type ProductReview = {
  rating: number
  date: string
  text: string
  photos?: string[]
  author: string
  avatar: string
}

/**
 * A catalog product owns ALL of its own data - basics (shown on cards) plus the
 * full detail payload (images, colours, sizes, specs, reviews) used by its detail
 * page. Nothing is shared between products, so every product renders its own info.
 */
export type Product = {
  id: string
  brand: string
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  isNew?: boolean
  showDiscountBadge?: boolean
  isPopular?: boolean
  href: string
  rating: number
  reviewCount: number
  category: string
  description: string
  images: string[]
  colors: ProductColor[]
  sizes?: ProductSize[]
  highlights: ProductHighlight[]
  reviews: ProductReview[]
}

export type ProductCollection = 'deals' | 'new-arrivals'

export type Category = {
  name: string
  image: string
  href: string
}

export type Brand = {
  name: string
  logo: string
}
