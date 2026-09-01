// React Imports
import React from 'react'

// Third-party Imports
import { ArrowLeftRightIcon, TruckIcon, WalletIcon } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'

const benefits = [
  {
    icon: TruckIcon,
    title: 'Free Delivery',
    description: 'Get your orders delivered to your doorstep for free.'
  },
  {
    icon: WalletIcon,
    title: 'Online Payment',
    description: 'Experience hassle-free online payments with secure.'
  },
  {
    icon: ArrowLeftRightIcon,
    title: 'Easy Return',
    description: 'Enjoy easy returns within 30 days of purchase.'
  }
]

const CategoryBenefits = () => {
  return (
    <section className='pb-8'>
      <ContentLayout className='space-y-6'>
        <div className='grid gap-6 md:grid-cols-3'>
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className='border-border flex flex-col gap-6 rounded-xl border p-4 lg:flex-row'>
              <span className='bg-muted text-primary flex size-12 shrink-0 items-center justify-center rounded-full'>
                <Icon className='size-6' />
              </span>
              <div className='space-y-1.5'>
                <h3 className='text-xl font-semibold'>{title}</h3>
                <p className='text-muted-foreground text-lg'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default CategoryBenefits
