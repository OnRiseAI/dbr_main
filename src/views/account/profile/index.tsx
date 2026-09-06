// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Type Imports
import type { AccountAddress, AccountOrder, Profile } from '@/lib/account/data'

// Component Imports
import PersonalInformationForm from '@/views/account/profile/personal-information-form'
import ChangePasswordForm from '@/views/account/profile/change-password-form'
import OrderCard from '@/views/account/orders/order-card'
import { countryName } from '@/views/account/addresses/address-form-schema'

type Props = {
  profile: Profile
  latestOrder: AccountOrder | null
  shippingAddress: AccountAddress | null
}

/** Profile: who you are, your latest order, where parcels go, and your password. */
const ProfileView = ({ profile, latestOrder, shippingAddress }: Props) => {
  return (
    <div className='space-y-8'>
      <PersonalInformationForm profile={profile} />

      <div>
        <div className='mb-3.5 flex items-center justify-between gap-3'>
          <h3 className='text-xl font-semibold'>Latest order</h3>
          <Link href='/account/orders' className='text-primary inline-flex items-center gap-1 text-sm font-medium'>
            All orders <ArrowRightIcon className='size-4' />
          </Link>
        </div>
        {latestOrder ? (
          <OrderCard order={latestOrder} />
        ) : (
          <p className='text-muted-foreground rounded-xl border p-4 text-sm'>No orders yet.</p>
        )}
      </div>

      <div>
        <div className='mb-3.5 flex items-center justify-between gap-3'>
          <h3 className='text-xl font-semibold'>Shipping address</h3>
          <Link href='/account/addresses' className='text-primary inline-flex items-center gap-1 text-sm font-medium'>
            Manage addresses <ArrowRightIcon className='size-4' />
          </Link>
        </div>
        {shippingAddress ? (
          <address className='rounded-xl border p-4 text-base not-italic'>
            <p className='font-medium'>
              {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            {shippingAddress.company ? <p>{shippingAddress.company}</p> : null}
            <p>{shippingAddress.address1}</p>
            {shippingAddress.address2 ? <p>{shippingAddress.address2}</p> : null}
            <p>
              {shippingAddress.postalCode} {shippingAddress.city}
            </p>
            <p>{countryName(shippingAddress.country)}</p>
          </address>
        ) : (
          <p className='text-muted-foreground rounded-xl border p-4 text-sm'>No address saved yet.</p>
        )}
      </div>

      <ChangePasswordForm email={profile.email} />
    </div>
  )
}

export { ProfileView }
export default ProfileView
