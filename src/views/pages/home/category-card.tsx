import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import type { Category } from '@/types/product'

type Props = {
  category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Link href={category.href} className='group block focus-visible:outline-none'>
      <div className='bg-muted aspect-[4/3] overflow-hidden rounded-xl'>
        <img
          src={category.image}
          alt={category.name}
          className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>
      <p className='mt-3 flex items-center gap-1.5 text-base font-medium'>
        <span>{category.name}</span>
        <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
      </p>
    </Link>
  )
}

export default CategoryCard
