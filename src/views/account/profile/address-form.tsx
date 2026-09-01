'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PlusIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'
import AddAddressForm from '@/views/account/addresses/address-form'

// Store Imports
import { useAddressesStore } from '@/store/addresses-store'

const countries = [
  'United States',
  'Australia',
  'Bangladesh',
  'Brazil',
  'Canada',
  'China',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Mexico',
  'South Africa',
  'United Arab Emirates',
  'United Kingdom'
]

const cities = ['Santa Anna', 'Costa Mesa', 'New York', 'Los Angeles', 'Chicago', 'Houston']

const regions = [
  'Alabama',
  'Alaska',
  'Arizona',
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Illinois',
  'New York',
  'Ohio',
  'Texas',
  'Washington'
]

const countryItems = countries.map(value => ({ label: value, value }))
const cityItems = cities.map(value => ({ label: value, value }))
const regionItems = regions.map(value => ({ label: value, value }))

const addressSchema = z.object({
  country: z.string().min(1, 'Please enter your Country.'),
  city: z.string().min(1, 'Please enter your City.'),
  region: z.string().min(1, 'Please select your Region/State.'),
  zipCode: z.string().min(1, 'Please enter your Zip-code.')
})

type AddressValues = z.infer<typeof addressSchema>

const AddressForm = () => {
  const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false)
  const addOrUpdateAddress = useAddressesStore(state => state.addOrUpdateAddress)

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { country: 'United States', city: 'New York', region: 'Arizona', zipCode: '' }
  })

  const onSubmit = () => {
    // TODO: persist address
  }

  const handleSaveNewAddress = (addressData: any) => {
    addOrUpdateAddress({
      id: crypto.randomUUID(),
      isDefault: false,
      ...addressData
    })
    setAddAddressDialogOpen(false)
  }

  return (
    <div>
      <h3 className='mb-3.5 text-xl font-semibold'>Address Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-4 grid items-start gap-x-5 gap-y-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Country <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select items={countryItems} value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='input-lg w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {countryItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='region'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Region/State <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select items={regionItems} value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='input-lg w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {regionItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    City <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select items={cityItems} value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='input-lg w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {cityItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
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
                  <FormLabel className='gap-0 leading-5'>
                    Zip-code <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='63955' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-end gap-2.5'>
            <Dialog open={addAddressDialogOpen} onOpenChange={setAddAddressDialogOpen}>
              <DialogTrigger render={<Button type='button' variant='outline' size='lg' />}>
                <PlusIcon />
                Add New
              </DialogTrigger>
              <AddAddressForm open={addAddressDialogOpen} onSave={handleSaveNewAddress} />
            </Dialog>
            <Button type='submit' size='lg'>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddressForm
