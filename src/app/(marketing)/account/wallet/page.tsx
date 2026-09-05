// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { WalletView } from '@/views/account/wallet'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Wallet',
  description: 'View your Deep Beauty Research wallet balance, credits, and how to use them at checkout.',
  url: '/account/wallet'
})

const WalletPage = () => {
  return <WalletView />
}

export default WalletPage
