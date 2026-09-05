import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import type { Category } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'
import CategoryCard from '@/views/pages/home/category-card'

type Props = {
  categories: Category[]
}

/** The four goals, as portrait photo tiles in one row. */
const GOAL_HANDLES = ['weight-management', 'skin-glow', 'tanning', 'calm-focus']

/** The two formats, as wide cards with the product render on the right. */
const FORMAT_HANDLES = ['pens', 'vials']

const FORMAT_CTA: Record<string, string> = { pens: 'Explore pens', vials: 'Explore vials' }

const pick = (categories: Category[], handles: string[]) =>
  handles
    .map(handle => categories.find(category => category.handle === handle))
    .filter((category): category is Category => Boolean(category))

const HomeCategories = ({ categories }: Props) => {
  const goals = pick(categories, GOAL_HANDLES)
  const formats = pick(categories, FORMAT_HANDLES)

  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout className='space-y-12'>
        <div className='space-y-6'>
          <div className='flex items-end justify-between gap-4'>
            <h3 className='text-2xl font-bold sm:text-3xl'>Shop by category</h3>
            <Link
              href='/shop'
              className='group text-foreground flex items-center gap-2 text-base font-medium'
            >
              Explore the collection
              <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4'>
            {goals.map(category => (
              <CategoryCard key={category.handle ?? category.name} category={category} aspect='portrait' />
            ))}
          </div>
        </div>

        {formats.length > 0 && (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold sm:text-3xl'>Shop by format</h3>

            <div className='grid gap-4 sm:gap-6 md:grid-cols-2'>
              {formats.map(category => (
                <Link
                  key={category.handle ?? category.name}
                  href={category.href}
                  className='group bg-muted/60 ring-border/60 flex min-h-40 items-stretch justify-between gap-4 overflow-hidden rounded-xl ring-1 focus-visible:outline-none sm:min-h-44'
                >
                  <div className='flex flex-col justify-center gap-2 p-6 sm:p-7'>
                    <span className='text-xl font-semibold sm:text-2xl'>{category.name}</span>
                    <span className='text-muted-foreground flex items-center gap-1.5 text-sm font-medium group-hover:text-foreground'>
                      {FORMAT_CTA[category.handle ?? ''] ?? `Explore ${category.name.toLowerCase()}`}
                      <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
                    </span>
                  </div>
                  <div className='flex w-1/2 items-center justify-center p-4 sm:p-5'>
                    <img
                      src={category.image}
                      alt={category.name}
                      className='max-h-36 w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 sm:max-h-40'
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </ContentLayout>
    </section>
  )
}

export default HomeCategories
