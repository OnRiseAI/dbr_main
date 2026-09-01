'use client'

// React Imports
import { useState } from 'react'

// Type Imports
import type { HelpFaqItem } from '@/types/help'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import FaqItem from '@/views/pages/faq/faq-item'

type HelpFaqProps = {
  helpFaqs: HelpFaqItem[]
}

const HelpFaq = ({ helpFaqs }: HelpFaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout>
        <div className='mb-6 space-y-4 text-center md:mb-8 lg:mb-24'>
          <h2 className='text-2xl font-bold sm:text-3xl'>Need Help? We&apos;ve Got Answers</h2>
          <p className='text-muted-foreground text-base sm:text-xl'>
            Explore our most commonly asked questions and find the information you need.
          </p>
        </div>
        <div className='w-full space-y-4'>
          {helpFaqs.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              open={openIndex === index}
              onOpenChange={isOpen => setOpenIndex(isOpen ? index : null)}
            />
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HelpFaq
