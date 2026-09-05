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

  /** What the selector chooses between: Strength by default, Type for MT1 and MT2. */
  variantAxis?: string
  variantOrder?: number
  variantCount?: number
  hiddenVariant?: boolean

  /** Plain paragraphs for the Overview tab (bodyHtml is the same content as HTML). */
  overview?: string[]

  /** What ships in the box. */
  contents?: string[]

  /** Label facts. Concentration and units per mg derive from strengthMg and fillMl. */
  specs?: ProductSpecs

  /** Hand-picked companions, shown as Pairs with. */
  pairsWith?: string[]

  /** Close crop of the pen's dial end (knob, dial ring, dose window). Pens only. */
  dialImage?: string

  /** Optional short clip (mp4 path). Rendered in the gallery when present. */
  video?: string
}

export type ProductSpecs = {
  compound: string
  form: 'pen' | 'vial'
  strengthMg: number
  fillMl?: number
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
