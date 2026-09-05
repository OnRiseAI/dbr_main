// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ProfileView } from '@/views/account/profile'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Profile',
  description: 'Manage your Deep Beauty Research profile, personal information, address, and password.',
  url: '/account'
})

const AccountPage = () => {
  return <ProfileView />
}

export default AccountPage
