'use client'

// React Imports
import { useMemo, useState } from 'react'

// Third-party Imports
import { CircleCheckIcon, FlagIcon, StarIcon } from 'lucide-react'

// Type Imports
import type { ProductReview } from '@/types/product'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'
import { Rating } from '@/components/ui/rating'
import ContentLayout from '@/components/layout/content-layout'

// Store Imports
import { useProductsStore } from '@/store/products-store'

type Props = {
  productId: string
  reviews: ProductReview[]
  rating: number
  reviewCount: number
}

type FilterKey = 'all' | 'positive' | 'critical'
type SortKey = 'recent' | 'highest' | 'lowest'

const filterItems: { label: string; value: FilterKey }[] = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Positive 4.0+', value: 'positive' },
  { label: 'Critical < 4.0+', value: 'critical' }
]

const sortItems: { label: string; value: SortKey }[] = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Highest Rated', value: 'highest' },
  { label: 'Lowest Rated', value: 'lowest' }
]

const INITIAL_VISIBLE_REVIEWS = 2

const ReviewItem = ({ review }: { review: ProductReview }) => {
  const [isHelpful, setIsHelpful] = useState(false)
  const [reported, setReported] = useState(false)

  return (
    <div className='border-border space-y-9 border-b p-3'>
      <div className='flex flex-col gap-2.5'>
        <div className='flex items-center gap-3'>
          <Rating readOnly variant='yellow' size={16} value={review.rating} precision={0.5} />
          <span className='text-muted-foreground text-sm'>{review.date}</span>
        </div>
        <p className='text-muted-foreground text-lg'>{review.text}</p>
        {review.photos && (
          <div className='flex flex-wrap gap-3.5'>
            {review.photos.map(photo => (
              <img key={photo} src={photo} alt='review' className='size-18 rounded-sm object-cover' />
            ))}
          </div>
        )}
      </div>
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex h-max shrink-0 items-center gap-4'>
          <Avatar className='size-12.5'>
            <AvatarImage src={review.avatar} alt={review.author} />
            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className='mb-0.5 text-base font-semibold'>{review.author}</h4>
            <div className='flex items-center gap-1'>
              <CircleCheckIcon className='size-4.5 text-green-600 dark:text-green-400' />
              <span className='text-muted-foreground text-base'>Verified</span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-1.5 font-medium'>
          <Button
            variant='outline'
            size='lg'
            onClick={() =>
              setIsHelpful(prev => {
                if (!prev) setReported(false)

                return !prev
              })
            }
            className={
              isHelpful
                ? 'text-green-600 shadow-sm hover:text-green-600 dark:text-green-400 dark:hover:text-green-400'
                : 'shadow-sm'
            }
          >
            Helpful ({isHelpful ? '1' : '0'})
          </Button>
          <Button
            variant='ghost'
            size='lg'
            onClick={() =>
              setReported(prev => {
                if (!prev) setIsHelpful(false)

                return !prev
              })
            }
            className={reported ? 'text-destructive hover:text-destructive' : ''}
          >
            <FlagIcon />
            {reported ? 'Reported' : 'Report'}
          </Button>
        </div>
      </div>
    </div>
  )
}

const ProductReviews = ({ productId, reviews: initialReviews, rating, reviewCount: initialReviewCount }: Props) => {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [sort, setSort] = useState<SortKey>('recent')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const storedProduct = useProductsStore(state => {
    const product = state.products.get(productId)

    return product
  })

  const reviews = storedProduct?.reviews ?? initialReviews
  const reviewCount = storedProduct?.reviewCount ?? initialReviewCount

  const visibleReviews = useMemo(() => {
    const filtered = reviews.filter(review => {
      if (filter === 'positive') return review.rating >= 4
      if (filter === 'critical') return review.rating < 4

      return true
    })

    if (sort === 'highest') return [...filtered].sort((a, b) => b.rating - a.rating)
    if (sort === 'lowest') return [...filtered].sort((a, b) => a.rating - b.rating)

    return filtered
  }, [reviews, filter, sort])

  const displayedReviews = showAllReviews ? visibleReviews : visibleReviews.slice(0, INITIAL_VISIBLE_REVIEWS)

  return (
    <section className='py-8 lg:py-14'>
      <ContentLayout className='space-y-6'>
        <h3 className='text-2xl font-semibold'>Reviews</h3>

        <div className='grid gap-8 lg:grid-cols-3 lg:gap-12'>
          {/* Summary */}
          <div>
            <div className='bg-muted rounded-xl p-6 max-lg:flex max-lg:gap-10 max-md:flex-wrap max-md:justify-center lg:space-y-6'>
              <div className='shrink-0 space-y-3'>
                <h5 className='flex items-baseline justify-center text-4xl font-semibold'>
                  <span className='text-6xl font-semibold'>{rating}</span>
                  <span>/5</span>
                </h5>
                <div className='flex flex-col items-center gap-2'>
                  <Rating readOnly variant='yellow' size={24} value={4.5} precision={0.5} />
                  <p className='text-center text-base font-medium'>Based on {reviewCount} verified reviews</p>
                </div>
              </div>
              <div className='flex w-full flex-col gap-2.5'>
                <div className='flex w-full items-center gap-3'>
                  <div className='flex items-center gap-0.5'>
                    <span className='text-sm font-semibold'>5</span>
                    <StarIcon className='size-4 fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' />
                  </div>
                  <Progress
                    value={100}
                    className='*:data-[slot=progress-track]:bg-primary/10 w-full **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-2.5 dark:**:data-[slot=progress-indicator]:bg-amber-400'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-0.5'>
                    <span className='text-sm font-semibold'>4</span>
                    <StarIcon className='size-4 fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' />
                  </div>
                  <Progress
                    value={75}
                    className='*:data-[slot=progress-track]:bg-primary/10 w-full **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-2.5 dark:**:data-[slot=progress-indicator]:bg-amber-400'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-0.5'>
                    <span className='text-sm font-semibold'>3</span>
                    <StarIcon className='size-4 fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' />
                  </div>
                  <Progress
                    value={50}
                    className='*:data-[slot=progress-track]:bg-primary/10 w-full **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-2.5 dark:**:data-[slot=progress-indicator]:bg-amber-400'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-0.5'>
                    <span className='text-sm font-semibold'>2</span>
                    <StarIcon className='size-4 fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' />
                  </div>
                  <Progress
                    value={25}
                    className='*:data-[slot=progress-track]:bg-primary/10 w-full **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-2.5 dark:**:data-[slot=progress-indicator]:bg-amber-400'
                  />
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-0.5'>
                    <span className='text-sm font-semibold'>1</span>
                    <StarIcon className='size-4 fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400' />
                  </div>
                  <Progress
                    value={0}
                    className='*:data-[slot=progress-track]:bg-primary/10 w-full **:data-[slot=progress-indicator]:bg-amber-600 **:data-[slot=progress-track]:h-2.5 dark:**:data-[slot=progress-indicator]:bg-amber-400'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Review list */}
          <div className='space-y-5 lg:col-span-2'>
            <div className='border-border mb-0 flex justify-between gap-5 border-b pb-5 max-md:flex-col md:items-center'>
              <p className='text-muted-foreground text-base font-medium'>
                Showing <span className='font-semibold'>{visibleReviews.length}</span> Customer Reviews
              </p>
              <div className='flex justify-end gap-5 max-md:flex-col md:items-center'>
                <Select
                  items={filterItems}
                  value={filter}
                  onValueChange={value => setFilter((value as FilterKey) ?? 'all')}
                >
                  <SelectTrigger className='input-lg w-fit px-4 text-sm font-medium'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {filterItems.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select items={sortItems} value={sort} onValueChange={value => setSort((value as SortKey) ?? 'recent')}>
                  <SelectTrigger className='input-lg w-fit px-4 text-sm font-medium'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {sortItems.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {displayedReviews.length > 0 ? (
              displayedReviews.map((review, index) => <ReviewItem key={index} review={review} />)
            ) : (
              <p className='text-muted-foreground py-10 text-center'>No reviews match this filter.</p>
            )}

            {visibleReviews.length > INITIAL_VISIBLE_REVIEWS && (
              <div className='flex justify-end'>
                <Button variant='secondary' size='lg' onClick={() => setShowAllReviews(show => !show)}>
                  {showAllReviews ? 'View Less Reviews' : 'View All Reviews'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductReviews
