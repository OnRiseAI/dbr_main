// Next Imports
import Link from 'next/link'

// Type Imports
import type { Category } from '@/types/product'

type Props = {
  category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      href={category.href}
      className='group flex flex-col items-center gap-4 p-0 focus-visible:outline-none max-sm:mx-auto max-sm:w-fit'
    >
      <div className='bg-muted group-hover:bg-primary/10 flex size-31 items-center justify-center overflow-hidden rounded-full transition-colors'>
        <img
          src={category.image}
          alt={category.name}
          className='object-cover object-bottom transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <h3 className='text-center text-lg font-medium text-nowrap'>{category.name}</h3>
    </Link>
  )
}

export default CategoryCard
