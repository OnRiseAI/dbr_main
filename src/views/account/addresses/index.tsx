'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { PlusIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import AddressCard from './address-card'
import AddressForm from './address-form'

// Store Imports
import { useAddressesStore } from '@/store/addresses-store'

const AddressesView = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { addresses, editingAddressId, setEditingAddress, addOrUpdateAddress, getAddressById } = useAddressesStore()

  const editingAddress = editingAddressId ? getAddressById(editingAddressId) : undefined

  const handleSaveAddress = (addressData: any) => {
    if (editingAddressId) {
      addOrUpdateAddress({
        ...editingAddress,
        ...addressData
      })
    } else {
      addOrUpdateAddress({
        id: crypto.randomUUID(),
        isDefault: false,
        ...addressData
      })
    }

    setDialogOpen(false)
    setEditingAddress(null)
  }

  return (
    <div>
      <h2 className='mb-3.5 text-xl font-semibold'>My Addresses</h2>
      <div className='grid gap-3.5 lg:grid-cols-2'>
        {addresses.map(address => (
          <AddressCard key={address.id} address={address} />
        ))}

        <Dialog
          open={dialogOpen}
          onOpenChange={open => {
            setDialogOpen(open)

            if (!open) {
              setEditingAddress(null)
            }
          }}
        >
          <div className='border-border hover:border-primary flex items-center justify-center rounded-xl border p-6 transition-colors duration-300'>
            <div className='space-y-4.75 text-center'>
              <DialogTrigger
                render={
                  <Button
                    variant='outline'
                    size='icon-lg'
                    className='border-border rounded-full'
                    aria-label='Add address'
                  />
                }
              >
                <PlusIcon className='size-5' />
              </DialogTrigger>
              <h4 className='text-lg font-medium'>Add Address</h4>
            </div>
          </div>
          <AddressForm open={dialogOpen} editingAddress={editingAddress} onSave={handleSaveAddress} />
        </Dialog>
      </div>
    </div>
  )
}

export { AddressesView }
export default AddressesView
