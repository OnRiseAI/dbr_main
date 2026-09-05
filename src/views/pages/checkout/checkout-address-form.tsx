'use client'

// Third-party Imports
import type { UseFormReturn } from 'react-hook-form'

// Component Imports
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type CheckoutFormValues, countryItems, deliveryOptions } from './checkout-schema'

type Props = {
  form: UseFormReturn<CheckoutFormValues>
}

const CheckoutAddressForm = ({ form }: Props) => {
  return (
    <Form {...form}>
      <form className='space-y-8'>
        <div className='space-y-6'>
          <h6 className='text-lg font-semibold'>Shipping Address</h6>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='+1 555 000 0000' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='street'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder='12 Business Road' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='Los Angeles' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select items={countryItems} value={field.value} onValueChange={val => field.onChange(val ?? 'us')}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Country' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent alignItemWithTrigger={false}>
                      {countryItems.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='zip'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder='000000' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='space-y-4'>
          <h6 className='text-lg font-semibold'>Delivery Speed</h6>
          <FormField
            control={form.control}
            name='deliverySpeed'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup value={field.value} onValueChange={field.onChange} className='gap-4'>
                    {deliveryOptions.map(option => (
                      <Label
                        key={option.value}
                        htmlFor={`delivery-${option.value}`}
                        className='border-border hover:border-primary/50 flex cursor-pointer items-center gap-4 rounded-xl border p-4'
                      >
                        <RadioGroupItem id={`delivery-${option.value}`} value={option.value} />
                        <span className='flex-1'>
                          <span className='block font-medium'>{option.title}</span>
                          <span className='text-muted-foreground block text-sm'>{option.subtitle}</span>
                        </span>
                        <span className='font-semibold text-green-600 dark:text-green-400'>{option.price}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default CheckoutAddressForm
