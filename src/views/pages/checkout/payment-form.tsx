'use client'

// Third-party Imports
import type { UseFormReturn } from 'react-hook-form'

// Component Imports
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { type CheckoutFormValues, paymentOptions } from './checkout-schema'

type Props = {
  form: UseFormReturn<CheckoutFormValues>
}

const PaymentForm = ({ form }: Props) => {
  return (
    <Form {...form}>
      <form className='space-y-4'>
        <h6 className='text-lg font-semibold'>Payment Method</h6>
        <FormField
          control={form.control}
          name='paymentMethod'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className='gap-4'>
                  {paymentOptions.map(option => (
                    <Label
                      key={option.value}
                      htmlFor={`payment-${option.value}`}
                      className='border-border hover:border-primary/50 flex cursor-pointer items-center gap-4 rounded-xl border p-4'
                    >
                      <RadioGroupItem id={`payment-${option.value}`} value={option.value} />
                      <span className='flex-1'>
                        <span className='block font-medium'>{option.title}</span>
                        <span className='text-muted-foreground block text-sm'>{option.subtitle}</span>
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default PaymentForm
