// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { CategoryView } from '@/views/pages/category'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Categories',
  description: 'Explore Shopix product categories - fashion, devices, groceries, personal care, and more.',
  url: '/category'
})

const CategoryPage = () => {
  return <CategoryView />
}

export default CategoryPage
