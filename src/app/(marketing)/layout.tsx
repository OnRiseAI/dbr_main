// React Imports
import type { ReactNode } from 'react'

// Component Imports
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import StoreHydration from '@/components/layout/store-hydration'

/**
 * Marketing Layout
 * This layout wraps all public marketing pages with header and footer
 * Used for: Landing, Blog, Contact, etc.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <StoreHydration />
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
