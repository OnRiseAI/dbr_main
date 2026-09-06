'use client'

// React Imports
import { useTransition } from 'react'

// Type Imports
import type { AccountAddress } from '@/lib/account/data'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { countryName } from './address-form-schema'

// Server Actions
import { deleteAddress, setDefaultAddress } from '@/lib/account/actions'

type Props = {
  address: AccountAddress
  onEdit: () => void
}

const AddressCard = ({ address, onEdit }: Props) => {
  const [pending, start] = useTransition()

  const lines = [
    `${address.firstName} ${address.lastName}`.trim(),
    address.company,
    address.address1,
    address.address2,
    `${address.postalCode} ${address.city}${address.province ? `, ${address.province}` : ''}`,
    countryName(address.country),
    address.phone
  ].filter(Boolean)

  return (
    <div className='border-border hover:border-primary relative rounded-xl border p-4 transition-colors duration-300'>
      <div className='absolute top-4 right-4 flex gap-1.5'>
        {address.isDefaultShipping ? (
          <Badge variant='outline' className='rounded-full text-xs font-medium'>
            Shipping
          </Badge>
        ) : null}
        {address.isDefaultBilling ? (
          <Badge variant='outline' className='rounded-full text-xs font-medium'>
            Billing
          </Badge>
        ) : null}
      </div>
      <div className='mb-4 pr-28'>
        {lines.map((line, index) => (
          <p key={index} className={index === 0 ? 'text-base font-medium' : 'text-base'}>
            {line}
          </p>
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        <Button variant='link' size='sm' className='h-auto border-0 p-0 text-base font-normal underline underline-offset-2' onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant='link'
          size='sm'
          className='h-auto border-0 p-0 text-base font-normal underline underline-offset-2'
          disabled={pending}
          onClick={() => start(async () => void (await deleteAddress(address.id)))}
        >
          Remove
        </Button>
        {!address.isDefaultShipping ? (
          <Button
            variant='link'
            size='sm'
            className='h-auto border-0 p-0 text-base font-normal underline underline-offset-2'
            disabled={pending}
            onClick={() => start(async () => void (await setDefaultAddress(address.id, 'shipping')))}
          >
            Use for shipping
          </Button>
        ) : null}
        {!address.isDefaultBilling ? (
          <Button
            variant='link'
            size='sm'
            className='h-auto border-0 p-0 text-base font-normal underline underline-offset-2'
            disabled={pending}
            onClick={() => start(async () => void (await setDefaultAddress(address.id, 'billing')))}
          >
            Use for billing
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default AddressCard
