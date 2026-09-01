// Component Imports
import ContentLayout from '@/components/layout/content-layout'

type DealCard = {
  id: string
  icon: string
  percentage: string
  label: string
}

const deals: DealCard[] = [
  {
    id: 'up-to',
    icon: '⚡',
    percentage: '70%',
    label: 'Up To'
  },
  {
    id: 'minimum',
    icon: '📊',
    percentage: '50%',
    label: 'Minimum'
  },
  {
    id: 'flat',
    icon: '🎯',
    percentage: '60%',
    label: 'Flat'
  },
  {
    id: 'cashback',
    icon: '💰',
    percentage: '20%',
    label: 'Cash Back'
  }
]

const CategoryDeals = () => {
  return (
    <section className='py-8 sm:py-12 lg:py-14'>
      <ContentLayout>
        <div className='mb-8 flex items-center gap-2'>
          <h2 className='text-3xl font-bold sm:text-3xl'>⚡ Deals on Electronics</h2>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {deals.map(deal => (
            <div
              key={deal.id}
              className='bg-muted flex h-57.5 flex-col items-center justify-center overflow-hidden rounded-xl border p-4'
            >
              <p className='text-2xl font-bold'>{deal.label}</p>
              <p className='text-muted text-center text-7xl leading-normal font-semibold not-italic [-webkit-text-stroke:3px_var(--foreground)] [text-shadow:-5px_1px_0_var(--foreground)]'>
                {deal.percentage}
              </p>
              <p className='text-2xl font-bold'>off</p>
            </div>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default CategoryDeals
