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
  collections?: string[]
  description: string
  bodyHtml?: string
  images: string[]
  colors: ProductColor[]
  sizes?: ProductSize[]
  highlights: ProductHighlight[]
  reviews: ProductReview[]
  /**
   * Variant family. Members are separate SKUs (own id, price, cart line) that
   * share one product page name. One member is listed in grids; the rest are
   * hiddenVariant and reached through the strength selector.
   */
  family?: string
  familyName?: string
  variantLabel?: string
  variantOrder?: number
  variantCount?: number
  hiddenVariant?: boolean
}

export type ProductCollection = 'deals' | 'new-arrivals'

export type Category = {
  name: string
  image: string
  href: string
  handle?: string
  description?: string
  productsCount?: number
}

export type ContentPage = {
  handle: string
  title: string
  html: string
}

export type Brand = {
  name: string
  logo: string
}
