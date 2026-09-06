'use client'

// React Imports
import { useEffect, useState, useTransition } from 'react'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Type Imports
import type { AccountAddress } from '@/lib/account/data'

// Component Imports
import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { COUNTRIES, addressFormSchema, type AddressFormValues } from './address-form-schema'

// Server Actions
import { saveAddress } from '@/lib/account/actions'

const EMPTY: AddressFormValues = {
  firstName: '',
  lastName: '',
  company: '',
  address1: '',
  address2: '',
  postalCode: '',
  city: '',
  province: '',
  country: 'DE',
  phone: '',
  isDefaultShipping: false,
  isDefaultBilling: false
}

type Props = {
  open: boolean
  editing?: AccountAddress
  onSaved: () => void
}

/** Add or edit one address; saved straight to the customer's account. */
const AddressForm = ({ open, editing, onSaved }: Props) => {
  const [pending, start] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<AddressFormValues>({ resolver: zodResolver(addressFormSchema), defaultValues: EMPTY })

  useEffect(() => {
    if (!open) return
    form.reset(editing ? { ...editing, country: editing.country.toUpperCase() } : EMPTY)
  }, [open, editing, form])

  const onSubmit = (values: AddressFormValues) =>
    start(async () => {
      setError(null)

      const result = await saveAddress(values, editing?.id)

      if (!result.ok) setError(result.error)
      else onSaved()
    })

  const text = (name: keyof AddressFormValues, label: string, opts: { required?: boolean; autoComplete?: string; span?: boolean } = {}) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={opts.span ? 'md:col-span-2' : undefined}>
          <FormLabel className='gap-0'>
            {label}
            {opts.required ? <span className='text-destructive'>*</span> : null}
          </FormLabel>
          <FormControl>
            <Input autoComplete={opts.autoComplete} {...field} value={String(field.value ?? '')} className='input-lg' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <DialogContent className='flex flex-col gap-0 p-0 max-sm:max-h-[min(650px,80vh)] sm:max-w-145 [&>[data-slot=dialog-close]>svg]:size-5'>
      <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
        <div className='flex flex-col gap-4 p-6'>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-lg leading-7 font-semibold'>{editing ? 'Edit address' : 'Add address'}</DialogTitle>
            <DialogDescription>{editing ? 'Update where we send your parcels.' : 'Where should we send your parcels?'}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={event => {
                event.stopPropagation()
                form.handleSubmit(onSubmit)(event)
              }}
              className='flex flex-col gap-6'
            >
              {error ? <p className='text-destructive border-destructive/30 rounded-md border px-3 py-2 text-sm'>{error}</p> : null}
              <div className='grid items-start gap-x-6 gap-y-4 md:grid-cols-2'>
                {text('firstName', 'First name', { required: true, autoComplete: 'given-name' })}
                {text('lastName', 'Last name', { required: true, autoComplete: 'family-name' })}
                {text('company', 'Company', { autoComplete: 'organization', span: true })}
                {text('address1', 'Street and number', { required: true, autoComplete: 'address-line1', span: true })}
                {text('address2', 'Apartment, floor, c/o', { autoComplete: 'address-line2', span: true })}
                {text('postalCode', 'Postal code', { required: true, autoComplete: 'postal-code' })}
                {text('city', 'City', { required: true, autoComplete: 'address-level2' })}
                {text('province', 'Region or state', { autoComplete: 'address-level1' })}
                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='gap-0'>
                        Country<span className='text-destructive'>*</span>
                      </FormLabel>
                      <Select items={COUNTRIES} value={field.value} onValueChange={value => field.onChange(value ?? 'DE')}>
                        <FormControl>
                          <SelectTrigger className='input-lg w-full'>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COUNTRIES.map(c => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {text('phone', 'Phone', { autoComplete: 'tel', span: true })}
                <FormField
                  control={form.control}
                  name='isDefaultShipping'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between rounded-md border p-3'>
                      <FormLabel>Default shipping address</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='isDefaultBilling'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between rounded-md border p-3'>
                      <FormLabel>Default billing address</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex justify-end gap-3'>
                <DialogClose render={<Button type='button' variant='outline' size='lg' />}>Cancel</DialogClose>
                <Button type='submit' size='lg' disabled={pending}>
                  {pending ? 'Saving…' : editing ? 'Save changes' : 'Add address'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </DialogContent>
  )
}

export default AddressForm
