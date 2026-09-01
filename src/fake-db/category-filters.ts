/**
 * Category-specific filter options (brands and price ranges)
 * Maps each category to the valid filters available within that category.
 * This ensures users only see relevant brand options and price ranges per category.
 */

type CategoryFilterConfig = {
  brands: string[]
  priceMin: number
  priceMax: number
}

export const categoryFilters: Record<string, CategoryFilterConfig> = {
  'Beauty & Skincare': {
    brands: ['Bellavita', 'Garnier', 'Lakme', 'Mamaearth', 'Nivea'],
    priceMin: 8.99,
    priceMax: 39.99
  },
  Clothing: {
    brands: ['H&M', 'Nike', 'Tagdo Apparel', 'Zara'],
    priceMin: 44.99,
    priceMax: 64.99
  },
  Electronics: {
    brands: ['Apple', 'JBL', 'Noise', 'PowerA'],
    priceMin: 79.99,
    priceMax: 549.99
  },
  'Home Decor': {
    brands: ['Boat', 'Hosley', 'IKEA', 'Urban Ladder', 'Yankee Candle'],
    priceMin: 15.99,
    priceMax: 69.99
  },
  'Kitchen Appliances': {
    brands: ['Bajaj', 'Milton', 'Philips', 'Prestige', 'Summer Dress Home'],
    priceMin: 24.99,
    priceMax: 129.99
  },
  Mobile: {
    brands: ['Apple', 'Redmi', 'Samsung', 'Spigen', 'Vivo'],
    priceMin: 29.99,
    priceMax: 1199.99
  },
  'Toys & Games': {
    brands: ['Barbie', 'Funskool', 'Hot Wheels', 'LEGO', 'Nerf'],
    priceMin: 17.99,
    priceMax: 89.99
  },
  Watches: {
    brands: ['Apple', 'Boult Audio', 'Fastrack', 'Garmin', 'Titan'],
    priceMin: 39.99,
    priceMax: 349.99
  }
}
