// Next Imports
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Component Imports
import { ProfileView } from '@/views/account/profile'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Data Imports
import { getProfile, listAddresses, listOrders } from '@/lib/account/data'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Profile',
  description: 'Manage your Deep Beauty Research profile, personal information, address, and password.',
  url: '/account'
})

export const dynamic = 'force-dynamic'

const AccountPage = async () => {
  const [profile, orders, addresses] = await Promise.all([getProfile(), listOrders(), listAddresses()])

  if (!profile) redirect('/login?next=/account')

  const shipping = addresses.find(a => a.isDefaultShipping) ?? addresses[0] ?? null

  return <ProfileView profile={profile} latestOrder={orders[0] ?? null} shippingAddress={shipping} />
}

export default AccountPage
