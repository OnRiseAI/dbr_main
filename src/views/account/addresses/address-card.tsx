'use client'

// Type Imports
import type { Address } from '@/types/addresses'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Store Imports
import { useAddressesStore } from '@/store/addresses-store'

type AddressCardProps = {
  address: Address
}

const AddressCard = ({ address }: AddressCardProps) => {
  const { removeAddress, setDefaultAddress, setEditingAddress } = useAddressesStore()

  const handleEdit = () => {
    setEditingAddress(address.id)
  }

  const handleRemove = () => {
    removeAddress(address.id)
  }

  const handleSetDefault = () => {
    setDefaultAddress(address.id)
  }

  return (
    <div className='border-border hover:border-primary relative rounded-xl border p-4 transition-colors duration-300'>
      {address.isDefault && (
        <Badge
          variant='outline'
          className='text-destructive border-destructive absolute top-4 right-4 rounded-full text-xs font-medium'
        >
          Default
        </Badge>
      )}
      <h4 className='text-muted-foreground mb-1 text-base font-medium'>{address.title}</h4>
      <div className='mb-4'>
        {address.lines.map((line, index) => (
          <p key={index} className='text-base'>
            {line}
          </p>
        ))}
      </div>
      <div className='flex gap-4'>
        <Button
          variant='link'
          size='sm'
          className='h-auto border-0 p-0 text-base font-normal underline underline-offset-2'
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant='link'
          size='sm'
          className='h-auto border-0 p-0 text-base font-normal underline underline-offset-2'
          onClick={handleRemove}
        >
          Remove
        </Button>
        {address.isDefault ? (
          <span className='text-muted-foreground cursor-default text-base font-normal'>Set as Default</span>
        ) : (
          <Button
            variant='link'
            size='sm'
            className='h-auto border-0 p-0 text-base font-normal underline underline-offset-2'
            onClick={handleSetDefault}
          >
            Set as Default
          </Button>
        )}
      </div>
    </div>
  )
}

export default AddressCard
