'use client'

import { useActionState, useState } from 'react'

import { deleteAddress, saveAddress, setDefaultShipping, type ActionState } from '@/app/actions/account'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Address } from '@/types/account'

type Props = {
  addresses: Address[]
}

const EMPTY: Partial<Address> = { country: 'DE' }

const AddressesManager = ({ addresses }: Props) => {
  const [editing, setEditing] = useState<Partial<Address> | null>(addresses.length === 0 ? EMPTY : null)

  const [state, action, pending] = useActionState<ActionState, FormData>(async (prev, formData) => {
    const result = await saveAddress(prev, formData)

    if (result.ok) setEditing(null)

    return result
  }, { ok: false })

  return (
    <div className='space-y-6'>
      {addresses.length > 0 ? (
        <ul className='grid gap-4 sm:grid-cols-2'>
          {addresses.map(address => (
            <li key={address.id} className='flex flex-col rounded-xl border p-5 text-sm'>
              {address.is_default_shipping ? (
                <span className='text-muted-foreground mb-2 text-xs font-semibold tracking-[0.14em] uppercase'>Default</span>
              ) : null}
              <p className='font-semibold'>
                {address.first_name} {address.last_name}
              </p>
              {address.company ? <p>{address.company}</p> : null}
              <p>{address.address1}</p>
              {address.address2 ? <p>{address.address2}</p> : null}
              <p>
                {address.postal_code} {address.city}
                {address.province ? `, ${address.province}` : ''}
              </p>
              <p>{address.country}</p>
              {address.phone ? <p className='text-muted-foreground mt-1'>{address.phone}</p> : null}
              <div className='mt-4 flex flex-wrap gap-4 border-t pt-3 text-xs font-semibold'>
                <button type='button' onClick={() => setEditing(address)} className='hover:underline'>
                  Edit
                </button>
                {!address.is_default_shipping ? (
                  <form action={setDefaultShipping}>
                    <input type='hidden' name='id' value={address.id} />
                    <button type='submit' className='hover:underline'>
                      Make default
                    </button>
                  </form>
                ) : null}
                <form action={deleteAddress}>
                  <input type='hidden' name='id' value={address.id} />
                  <button type='submit' className='text-muted-foreground hover:text-destructive hover:underline'>
                    Remove
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {editing ? (
        <form action={action} className='max-w-2xl space-y-5 rounded-xl border p-6'>
          <p className='font-semibold'>{editing.id ? 'Edit address' : 'New address'}</p>
          {editing.id ? <input type='hidden' name='id' value={editing.id} /> : null}
          <div className='grid gap-4 sm:grid-cols-2'>
            <Field label='First name' name='first_name' defaultValue={editing.first_name} required autoComplete='given-name' />
            <Field label='Last name' name='last_name' defaultValue={editing.last_name} required autoComplete='family-name' />
            <Field label='Company' name='company' defaultValue={editing.company} className='sm:col-span-2' autoComplete='organization' />
            <Field label='Street and number' name='address1' defaultValue={editing.address1} required className='sm:col-span-2' autoComplete='address-line1' />
            <Field label='Apartment, floor' name='address2' defaultValue={editing.address2} className='sm:col-span-2' autoComplete='address-line2' />
            <Field label='Postcode' name='postal_code' defaultValue={editing.postal_code} required autoComplete='postal-code' />
            <Field label='City' name='city' defaultValue={editing.city} required autoComplete='address-level2' />
            <Field label='Region' name='province' defaultValue={editing.province} autoComplete='address-level1' />
            <Field label='Country code' name='country' defaultValue={editing.country ?? 'DE'} required maxLength={2} hint='Two letters, for example DE, AT, NL.' autoComplete='country' />
            <Field label='Phone' name='phone' defaultValue={editing.phone} className='sm:col-span-2' autoComplete='tel' />
          </div>
          <div className='flex items-center gap-4'>
            <Button type='submit' disabled={pending}>
              {pending ? 'Saving' : 'Save address'}
            </Button>
            {addresses.length > 0 ? (
              <Button type='button' variant='ghost' onClick={() => setEditing(null)}>
                Cancel
              </Button>
            ) : null}
            {state.message && !state.ok ? <p className='text-destructive text-sm'>{state.message}</p> : null}
          </div>
        </form>
      ) : (
        <Button type='button' variant='outline' onClick={() => setEditing(EMPTY)}>
          Add an address
        </Button>
      )}
    </div>
  )
}

const Field = ({
  label,
  name,
  defaultValue,
  required,
  className,
  hint,
  maxLength,
  autoComplete
}: {
  label: string
  name: string
  defaultValue?: string | null
  required?: boolean
  className?: string
  hint?: string
  maxLength?: number
  autoComplete?: string
}) => (
  <div className={['space-y-2', className].filter(Boolean).join(' ')}>
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      name={name}
      defaultValue={defaultValue ?? ''}
      required={required}
      maxLength={maxLength}
      autoComplete={autoComplete}
    />
    {hint ? <p className='text-muted-foreground text-xs'>{hint}</p> : null}
  </div>
)

export default AddressesManager
