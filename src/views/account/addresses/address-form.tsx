'use client'

// React Imports
import { useEffect } from 'react'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HouseIcon, BuildingIcon } from 'lucide-react'

// Type Imports
import type { Address } from '@/types/addresses'

// Component Imports
import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { addressFormSchema, type AddressFormValues } from './address-form-schema'

// Utils Imports
import { cn } from '@/lib/utils'

const countryItems = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' }
]

const stateItems = [
  { label: 'California', value: 'ca' },
  { label: 'New York', value: 'ny' },
  { label: 'Texas', value: 'tx' },
  { label: 'Florida', value: 'fl' }
]

const defaultFormValues: AddressFormValues = {
  deliveryType: 'office',
  firstName: '',
  lastName: '',
  country: 'us',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  city: '',
  state: 'ca',
  zipCode: '',
  billingAddress: false
}

type AddressFormProps = {
  open: boolean
  editingAddress?: Address
  onSave: (data: any) => void
}

const AddressForm = ({ open, editingAddress, onSave }: AddressFormProps) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: defaultFormValues
  })

  useEffect(() => {
    if (!open) return

    if (editingAddress) {
      form.reset({
        deliveryType: editingAddress.title.toLowerCase() === 'home' ? 'home' : 'office',
        firstName: editingAddress.title,
        lastName: '',
        country: 'us',
        addressLine1: editingAddress.street,
        addressLine2: '',
        landmark: '',
        city: editingAddress.city,
        state: editingAddress.state.toLowerCase(),
        zipCode: editingAddress.zipCode,
        billingAddress: false
      })
    } else {
      form.reset(defaultFormValues)
    }
  }, [open, editingAddress, form])

  const onSubmit = (data: AddressFormValues) => {
    onSave({
      id: editingAddress?.id,
      title: data.firstName,
      isDefault: editingAddress?.isDefault || false,
      lines: [
        data.addressLine1,
        ...(data.addressLine2 ? [data.addressLine2] : []),
        `${data.city}, ${data.state.toUpperCase()} ${data.zipCode}, USA`
      ],
      fullAddress: `${data.addressLine1}, ${data.city}, ${data.state.toUpperCase()} ${data.zipCode}, USA`,
      street: data.addressLine1,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: 'USA'
    })
  }

  return (
    <DialogContent
      className={cn(
        'flex flex-col gap-0 p-0 max-sm:max-h-[min(650px,80vh)] sm:max-w-145 [&>[data-slot=dialog-close]>svg]:size-5'
      )}
    >
      <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
        <div className='flex flex-col gap-4 p-6'>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-lg leading-7 font-semibold'>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
            <DialogDescription>
              {editingAddress ? 'Update your address information' : 'Add new address for express delivery'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={event => {
                event.stopPropagation()
                form.handleSubmit(onSubmit)(event)
              }}
              className='flex flex-col gap-6'
            >
              <div className='grid items-start gap-x-6 gap-y-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='deliveryType'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className='grid grid-cols-2 gap-3'
                        >
                          <div className='border-input has-data-checked:border-primary/50 relative flex cursor-pointer flex-col items-center gap-4 rounded-md border p-3 outline-none'>
                            <RadioGroupItem value='home' id='home-address' className='order-1' />
                            <HouseIcon className='size-8 stroke-1' />
                            <div className='flex grow flex-col items-center gap-2 text-center'>
                              <Label htmlFor='home-address' className='cursor-pointer text-base'>
                                Home
                              </Label>
                              <p className='text-muted-foreground text-sm'>Delivery time (9am - 9pm)</p>
                            </div>
                          </div>
                          <div className='border-input has-data-checked:border-primary/50 relative flex cursor-pointer flex-col items-center gap-4 rounded-md border p-3 outline-none'>
                            <RadioGroupItem value='office' id='office-address' className='order-1' />
                            <BuildingIcon className='size-8 stroke-1' />
                            <div className='flex grow flex-col items-center gap-2 text-center'>
                              <Label htmlFor='office-address' className='cursor-pointer text-base'>
                                Office
                              </Label>
                              <p className='text-muted-foreground text-sm'>Delivery time (9am - 5pm)</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder='John' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel>Country</FormLabel>
                      <Select
                        items={countryItems}
                        value={field.value}
                        onValueChange={val => field.onChange(val ?? 'us')}
                      >
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
                  name='addressLine1'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder='123 Main St' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='addressLine2'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder='Apt 4B' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='landmark'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landmark</FormLabel>
                      <FormControl>
                        <Input placeholder='Near Central Park' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select items={stateItems} value={field.value} onValueChange={val => field.onChange(val ?? 'ca')}>
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select State' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent alignItemWithTrigger={false}>
                          {stateItems.map(item => (
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
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder='90001' type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='billingAddress'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center gap-2 md:col-span-2'>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className='mt-0 cursor-pointer'>Use as a billing address?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end gap-4'>
                <Button size='lg' type='submit'>
                  {editingAddress ? 'Update' : 'Submit'}
                </Button>
                <DialogClose render={<Button size='lg' variant='outline' nativeButton />}>Cancel</DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </DialogContent>
  )
}

export default AddressForm
