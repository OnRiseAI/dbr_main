// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { CategoryView } from '@/views/pages/category'
import { getCategories } from '@/app/server/actions'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Collections',
  description: 'Research peptide collections: pens, nasal sprays, blends, bioregulators, fitness, and weight-loss.',
  url: '/category'
})

const CategoryPage = async () => {
  const categories = await getCategories()

  return <CategoryView categories={categories} />
}

export default CategoryPage
