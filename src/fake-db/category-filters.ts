import raw from './dts-category-filters.json'

type CategoryFilterConfig = {
  brands: string[]
  priceMin: number
  priceMax: number
}

export const categoryFilters = raw as Record<string, CategoryFilterConfig>
