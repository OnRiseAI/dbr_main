'use client'

// Third-party Imports
import { ChevronDownIcon } from 'lucide-react'

// Type Imports
import type { FaqItem as FaqItemType } from '@/types/faq'

// Component Imports
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type FaqItemProps = {
  item: FaqItemType
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FaqItem = ({ item, open, onOpenChange }: FaqItemProps) => {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className='group/faq border-border w-full border-b'>
      <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 py-2.5 text-start text-base font-medium outline-none'>
        {item.question}
        <ChevronDownIcon className='text-muted-foreground ml-auto size-4 shrink-0 transition-transform duration-300 group-data-open/faq:-rotate-180' />
      </CollapsibleTrigger>
      <CollapsibleContent className='h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0'>
        <p className='text-muted-foreground pb-2.5 text-sm'>{item.answer}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default FaqItem
