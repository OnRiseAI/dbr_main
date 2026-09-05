'use client'

// React Imports
import { useState } from 'react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import OptionGroup from './option-group'
import PickupForm from './pickup-form'
import PriceSummary from './price-summary'
import VariantSelector from './variant-selector'

const reasonOptions = [
  { label: 'Wrong size', value: 'wrong-size' },
  { label: 'Defective/damaged item', value: 'defective' },
  { label: 'Wrong item received', value: 'wrong-item' },
  { label: "Don't like the product", value: 'dislike' },
  { label: 'Other', value: 'other' }
]

const refundOptions = [
  { label: 'Original payment method', value: 'original' },
  { label: 'Gift card', value: 'gift-card' },
  { label: 'Credit or Debit card', value: 'card' }
]

const ExchangeTab = () => {
  const [reason, setReason] = useState('wrong-size')
  const [reasonDescription, setReasonDescription] = useState('')
  const [refund, setRefund] = useState('original')

  const onConfirm = () => {
    // TODO: submit exchange request
  }

  return (
    <div className='space-y-6'>
      <div className='rounded-xl border p-4'>
        <h4 className='mb-4 text-xl font-semibold'>Why do you want to exchange this item?</h4>
        <OptionGroup name='Exchange reason' options={reasonOptions} value={reason} onChange={setReason} />
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='reason-description' className='gap-0 text-xl font-semibold'>
          Reason for Exchange<span className='text-destructive'>*</span>
        </Label>
        <Textarea
          id='reason-description'
          placeholder='Briefly describe the reason for exchange'
          value={reasonDescription}
          onChange={e => setReasonDescription(e.target.value)}
          className='min-h-24 rounded-md'
        />
      </div>

      <VariantSelector />

      <PickupForm />

      <PriceSummary />

      <p className='text-base'>You&apos;ll get $200 refunded after your returned item is picked up and verified.</p>

      <div className='mb-4'>
        <h4 className='mb-4 text-xl font-semibold'>How do you want to be refunded?</h4>
        <OptionGroup name='Refund method' options={refundOptions} value={refund} onChange={setRefund} />
      </div>

      <Button className='w-full' onClick={onConfirm}>
        Confirm Exchange
      </Button>
    </div>
  )
}

export default ExchangeTab
