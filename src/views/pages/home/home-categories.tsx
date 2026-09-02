import Link from 'next/link'

import type { Category } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'
import CategoryCard from '@/views/pages/home/category-card'

type Props = {
  categories: Category[]
}

const HOME_HANDLES = [
  'peptides',
  'peptides-for-fitness',
  'peptides-for-weight-loss',
  'peptides-for-muscle-mass',
  'bioregulator-peptides',
  'immunostimulants'
]

const HomeCategories = ({ categories }: Props) => {
  const featured = HOME_HANDLES.map(handle => categories.find(category => category.handle === handle)).filter(
    (category): category is Category => Boolean(category)
  )

  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout className='space-y-8'>
        <div className='flex items-end justify-between gap-4'>
          <h3 className='text-2xl font-bold sm:text-3xl'>Shop by categories</h3>
          <Link href='/category' className='text-muted-foreground hover:text-foreground text-base font-medium'>
            View All
          </Link>
        </div>

        <div className='grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
          {featured.map(category => (
            <CategoryCard key={category.handle ?? category.name} category={category} />
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeCategories
