// Third-party Imports
import { StarIcon, StarHalfIcon } from 'lucide-react'

// Utils Imports
import { cn } from '@/lib/utils'

type Props = {
  value: number
  max?: number
  className?: string
}

const StarRatingDisplay = ({ value, max = 5, className }: Props) => {
  const filledClass = 'fill-amber-600 text-amber-600'

  return (
    <div className='flex'>
      {Array.from({ length: max }).map((_, index) => {
        if (index + 1 <= value) {
          return <StarIcon key={index} className={cn('size-4', filledClass, className)} />
        }

        if (index < value) {
          return <StarHalfIcon key={index} className={cn('size-4', filledClass, className)} />
        }

        return <StarIcon key={index} className={cn('text-muted-foreground size-4 fill-amber-200', className)} />
      })}
    </div>
  )
}

export default StarRatingDisplay
