// Third-party Imports
import { TruckIcon, DollarSignIcon, ArrowRightLeftIcon } from 'lucide-react'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import ContentLayout from '@/components/layout/content-layout'

const benefits = [
  {
    icon: TruckIcon,
    title: 'Free Delivery',
    description: 'Get your orders delivered to your doorstep for free.'
  },
  {
    icon: DollarSignIcon,
    title: 'Online Payment',
    description: 'Experience hassle-free online payments with secure.'
  },
  {
    icon: ArrowRightLeftIcon,
    title: 'Easy Return',
    description: 'Enjoy easy returns within 30 days of purchase.'
  }
]

const HomeBenefits = () => {
  return (
    <section className='pb-8'>
      <ContentLayout>
        <div className='grid gap-4 md:grid-cols-3 lg:gap-6'>
          {benefits.map(benefit => (
            <Card key={benefit.title}>
              <CardContent className='flex gap-4 max-lg:flex-col lg:gap-6'>
                <span className='bg-muted text-primary flex size-12 shrink-0 items-center justify-center rounded-full'>
                  <benefit.icon className='size-6' />
                </span>
                <div className='space-y-1.5'>
                  <h3 className='text-xl font-semibold'>{benefit.title}</h3>
                  <p className='text-muted-foreground text-lg'>{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeBenefits
