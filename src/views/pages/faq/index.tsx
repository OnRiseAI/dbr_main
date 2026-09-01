'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import { parseAsString, useQueryState } from 'nuqs'

// Type Imports
import type { FaqCategory } from '@/types/faq'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'
import FaqItem from './faq-item'

// Utils Imports
import { cn } from '@/lib/utils'
import { getIcon } from '@/lib/icon-map'

type FaqViewProps = {
  faqCategories: FaqCategory[]
}

const FaqView = ({ faqCategories }: FaqViewProps) => {
  const [selectedCategory, setSelectedCategory] = useQueryState(
    'category',
    parseAsString.withDefault(faqCategories[0]?.value || '').withOptions({
      history: 'push',
      shallow: true,
      clearOnDefault: false
    })
  )

  useEffect(() => {
    setSelectedCategory(selectedCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const activeCategory = faqCategories.find(cat => cat.value === selectedCategory)

  return (
    <ContentLayout className='h-full min-h-screen py-8 sm:py-10 lg:py-14'>
      <div className='grid h-full gap-6 lg:grid-cols-[280px_1fr]'>
        {/* Sidebar */}
        <div className='bg-muted rounded-xl p-4'>
          <div className='flex flex-col gap-2'>
            {faqCategories.map(category => {
              const Icon = getIcon(category.icon)
              const isActive = selectedCategory === category.value

              return (
                <Button
                  key={category.value}
                  variant={isActive ? 'default' : 'secondary'}
                  onClick={() => {
                    setSelectedCategory(category.value)
                    setOpenIndex(0)
                  }}
                  className={cn(
                    'h-10 w-full justify-start gap-2 px-4 py-2 text-base font-normal',
                    isActive && 'hover:bg-primary shadow-sm'
                  )}
                >
                  <Icon className='size-5 shrink-0' />
                  <span>{category.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        {activeCategory && (
          <div className='flex-1'>
            <h2 className='mb-4 text-2xl font-bold sm:text-3xl'>{activeCategory.heading}</h2>
            <div className='w-full space-y-4'>
              {activeCategory.items.map((item, index) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  open={openIndex === index}
                  onOpenChange={isOpen => setOpenIndex(isOpen ? index : null)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  )
}

export { FaqView }
export default FaqView
