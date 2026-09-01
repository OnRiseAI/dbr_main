'use client'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Component Imports
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { pickupFormSchema, type PickupFormValues } from './pickup-form-schema'

const countryItems = [
  { label: 'United States', value: 'United States' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Canada', value: 'Canada' },
  { label: 'China', value: 'China' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'United Kingdom', value: 'United Kingdom' }
]

const cityItems = [
  { label: 'Santa Anna', value: 'Santa Anna' },
  { label: 'Costa Mesa', value: 'Costa Mesa' },
  { label: 'New York', value: 'New York' },
  { label: 'Los Angeles', value: 'Los Angeles' },
  { label: 'Chicago', value: 'Chicago' },
  { label: 'Houston', value: 'Houston' }
]

const PickupForm = () => {
  const form = useForm<PickupFormValues>({
    resolver: zodResolver(pickupFormSchema),
    defaultValues: {
      country: '',
      streetAddress: '',
      city: '',
      zipCode: ''
    }
  })

  const onSubmit = () => {
    // TODO: persist pickup details
  }

  return (
    <div>
      <h3 className='mb-5 text-xl font-semibold'>Pick up Details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2'>
            <div className='space-y-6'>
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem className='gap-3.5'>
                    <FormLabel className='gap-0 leading-5 font-medium'>
                      Country<span className='text-destructive top-0 text-base'>*</span>
                    </FormLabel>
                    <Select items={countryItems} value={field.value} onValueChange={val => field.onChange(val ?? '')}>
                      <FormControl>
                        <SelectTrigger className='input-lg w-full'>
                          <SelectValue placeholder='Select value' />
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
                name='streetAddress'
                render={({ field }) => (
                  <FormItem className='gap-3.5'>
                    <FormLabel className='gap-0 leading-5 font-medium'>
                      Street Address<span className='text-destructive top-0 text-base'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='13th Street' {...field} className='input-lg' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-6'>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem className='gap-3.5'>
                    <FormLabel className='gap-0 leading-5 font-medium'>
                      City<span className='text-destructive top-0 text-base'>*</span>
                    </FormLabel>
                    <Select items={cityItems} value={field.value} onValueChange={val => field.onChange(val ?? '')}>
                      <FormControl>
                        <SelectTrigger className='input-lg w-full'>
                          <SelectValue placeholder='Select value' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent alignItemWithTrigger={false}>
                        {cityItems.map(item => (
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
                name='zipCode'
                render={({ field }) => (
                  <FormItem className='gap-3.5'>
                    <FormLabel className='gap-0 leading-5 font-medium'>
                      Post Code<span className='text-destructive top-0 text-base'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='63955' {...field} className='input-lg' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <p className='text-base text-green-600 dark:text-green-400'>Your item will be picked up within 2-3 days.</p>
            <Button type='submit'>Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PickupForm
