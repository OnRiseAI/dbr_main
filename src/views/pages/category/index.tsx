import Link from 'next/link'

import type { Category } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'
import CategoryCard from '@/views/pages/home/category-card'
import CategoryBenefits from '@/views/pages/category/category-benefits'

type Props = {
  categories: Category[]
}

const CategoryView = ({ categories }: Props) => {
  return (
    <div>
      <section className='py-10 lg:py-14'>
        <ContentLayout className='space-y-4'>
          <p className='text-primary text-sm font-medium tracking-wide uppercase'>Collections</p>
          <h1 className='max-w-3xl text-4xl font-bold text-balance lg:text-5xl'>Research peptide collections</h1>
          <p className='text-muted-foreground max-w-2xl text-lg'>
            Catalog imported from dtspharmacy.com: pens, nasal sprays, blends, bioregulators, and targeted research
            collections.
          </p>
          <Link href='/shop' className='text-primary text-lg font-medium underline-offset-3 hover:underline'>
            Browse all products
          </Link>
        </ContentLayout>
      </section>
      <section className='pb-12'>
        <ContentLayout>
          <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {categories.map(category => (
              <CategoryCard key={category.handle ?? category.name} category={category} />
            ))}
          </div>
        </ContentLayout>
      </section>
      <CategoryBenefits />
    </div>
  )
}

export { CategoryView }
export default CategoryView
