'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Component Imports
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// Utils Imports
import { cn } from '@/lib/utils'

const giftCardSchema = z.object({
  deliveryMethod: z.enum(['email', 'payment']),
  amount: z.string().min(1, 'Please select an amount.'),
  sendMethod: z.enum(['immediately', 'schedule']),
  recipientName: z.string().min(1, 'Please enter recipient name.'),
  recipientEmail: z.string().email('Please enter valid email address.'),
  message: z.string().optional()
})

type GiftCardValues = z.infer<typeof giftCardSchema>

const PresetAmounts = ['50', '100', '200', '300']

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£'
}

const GiftCardsForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>('50')
  const [currency, setCurrency] = useState<string>('USD')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const form = useForm<GiftCardValues>({
    resolver: zodResolver(giftCardSchema),
    defaultValues: {
      deliveryMethod: 'email',
      amount: '50',
      sendMethod: 'immediately',
      recipientName: '',
      recipientEmail: '',
      message: ''
    }
  })

  const onSubmit = (values: GiftCardValues) => {
    // TODO: add the gift card to the cart
    console.log(values)
  }

  const handleAmountChange = (amount: string) => {
    setSelectedAmount(amount)

    if (amount === 'custom') {
      form.setValue('amount', customAmount || '')
    } else {
      form.setValue('amount', amount)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* Choose a delivery method */}
        <div>
          <h4 className='mb-4 text-xl font-semibold'>Choose a delivery method</h4>
          <FormField
            control={form.control}
            name='deliveryMethod'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup value={field.value} onValueChange={field.onChange} className='flex flex-row gap-6'>
                    <div className='flex items-center gap-2.5'>
                      <RadioGroupItem
                        value='email'
                        id='delivery-email'
                        className='size-6 [&_[data-slot=radio-group-indicator]>span]:size-3.5'
                      />
                      <Label htmlFor='delivery-email' className='leading-6 font-normal'>
                        Email
                      </Label>
                    </div>
                    <div className='flex items-center gap-2.5'>
                      <RadioGroupItem
                        value='payment'
                        id='delivery-payment'
                        className='size-6 [&_[data-slot=radio-group-indicator]>span]:size-3.5'
                      />
                      <Label htmlFor='delivery-payment' className='leading-6 font-normal'>
                        Payment
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Choose your amount */}
        <div>
          <div className='mb-4 flex items-center gap-2 max-sm:flex-col max-sm:items-start'>
            <h4 className='text-xl font-semibold'>Choose your amount</h4>
            <Select value={currency} onValueChange={val => val && setCurrency(val)}>
              <SelectTrigger className='h-8! w-18 px-2 py-1 text-xs leading-4' size='sm'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align='start'>
                <SelectGroup>
                  <SelectItem value='USD'>USD</SelectItem>
                  <SelectItem value='EUR'>EUR</SelectItem>
                  <SelectItem value='GBP'>GBP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-wrap gap-3'>
            {PresetAmounts.map(amount => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? 'default' : 'secondary'}
                className={cn(
                  'rounded-lg px-3! text-sm font-medium',
                  selectedAmount !== amount && 'bg-primary/10',
                  selectedAmount === amount && 'hover:bg-primary'
                )}
                onClick={() => handleAmountChange(amount)}
              >
                {currencySymbols[currency as keyof typeof currencySymbols]} {amount}
              </Button>
            ))}
            <Button
              variant={selectedAmount === 'custom' ? 'default' : 'secondary'}
              className={cn('rounded-lg px-3! text-sm font-medium', selectedAmount !== 'custom' && 'bg-primary/10')}
              onClick={() => handleAmountChange('custom')}
            >
              Custom
            </Button>
          </div>
          {selectedAmount === 'custom' && (
            <div className='mt-3'>
              <Input
                type='number'
                placeholder='Enter custom amount'
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                className='input-lg max-w-82'
              />
            </div>
          )}
        </div>

        {/* Send the giftcard */}
        <div className='mb-3.5'>
          <h4 className='mb-4 text-xl font-semibold'>Send the giftcard</h4>
          <FormField
            control={form.control}
            name='sendMethod'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={e => {
                      e.preventDefault?.()
                      field.onChange(e)
                    }}
                    className='flex gap-3'
                  >
                    <Label
                      htmlFor='send-immediately'
                      onClick={e => {
                        e.preventDefault()
                        field.onChange('immediately')
                      }}
                      className={cn(
                        'flex h-8 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-1 transition-colors',
                        field.value === 'immediately' ? 'border-primary' : 'border-input bg-background hover:bg-accent'
                      )}
                    >
                      <RadioGroupItem value='immediately' id='send-immediately' className='sr-only absolute inset-0' />
                      <span className='text-sm font-medium'>Immediately</span>
                    </Label>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger
                        render={
                          <Label
                            htmlFor='send-schedule'
                            onClick={e => {
                              e.preventDefault()
                              field.onChange('schedule')
                            }}
                            className={cn(
                              'flex h-8 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-1.5 transition-colors',
                              field.value === 'schedule'
                                ? 'border-primary'
                                : 'border-input bg-background hover:bg-accent'
                            )}
                          />
                        }
                        nativeButton={false}
                      >
                        <RadioGroupItem value='schedule' id='send-schedule' className='sr-only absolute inset-0' />
                        <span className='text-sm font-medium'>
                          {field.value === 'schedule' && scheduledDate
                            ? scheduledDate.toLocaleDateString()
                            : 'Schedule'}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='center'>
                        <Calendar
                          mode='single'
                          selected={scheduledDate}
                          onSelect={date => {
                            setScheduledDate(date)
                            setIsCalendarOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Recipient Information */}
        <div className='mb-6'>
          <h4 className='mb-4 text-xl font-semibold'>Recipient Information</h4>
          <div className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='recipientName'
              render={({ field }) => (
                <FormItem className='gap-1.5'>
                  <FormLabel className='gap-0 text-base font-medium'>
                    Recipient name<span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='recipientEmail'
              render={({ field }) => (
                <FormItem className='gap-1.5'>
                  <FormLabel className='gap-0 text-base font-medium'>
                    Email Address<span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='john@gmail.com' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Add Message */}
        <div className='mb-4'>
          <h4 className='mb-1.5 text-base font-medium'>Add Message</h4>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder='Type here' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className='flex justify-center'>
          <Button type='submit' className='w-full'>
            Buy now
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default GiftCardsForm
