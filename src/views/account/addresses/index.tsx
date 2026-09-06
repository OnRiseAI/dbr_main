'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import { PlusIcon } from 'lucide-react'

// Type Imports
import type { AccountAddress } from '@/lib/account/data'

// Component Imports
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import AddressCard from './address-card'
import AddressForm from './address-form'

type Props = {
  addresses: AccountAddress[]
}

const AddressesView = ({ addresses }: Props) => {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = editingId ? addresses.find(a => a.id === editingId) : undefined

  const close = () => {
    setDialogOpen(false)
    setEditingId(null)
  }

  return (
    <div>
      <h2 className='mb-3.5 text-xl font-semibold'>My Addresses</h2>
      <Dialog
        open={dialogOpen}
        onOpenChange={open => {
          setDialogOpen(open)
          if (!open) setEditingId(null)
        }}
      >
        <div className='grid gap-3.5 lg:grid-cols-2'>
          {addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => {
                setEditingId(address.id)
                setDialogOpen(true)
              }}
            />
          ))}

          <div className='border-border hover:border-primary flex items-center justify-center rounded-xl border p-6 transition-colors duration-300'>
            <div className='space-y-4.75 text-center'>
              <DialogTrigger render={<Button variant='outline' size='icon-lg' className='border-border rounded-full' aria-label='Add address' />}>
                <PlusIcon className='size-5' />
              </DialogTrigger>
              <h4 className='text-lg font-medium'>Add Address</h4>
            </div>
          </div>
        </div>
        <AddressForm
          key={editing?.id ?? 'new'}
          open={dialogOpen}
          editing={editing}
          onSaved={() => {
            close()
            router.refresh()
          }}
        />
      </Dialog>
    </div>
  )
}

export { AddressesView }
export default AddressesView
