// React Imports
import type { ReactNode } from 'react'

// Component Imports
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import StoreHydration from '@/components/layout/store-hydration'

// Data Imports
import { loadCatalogue } from '@/lib/catalogue'

/**
 * Marketing Layout
 * Wraps all public pages with header and footer, and seeds the client products store
 * with the database-backed catalogue so cart and wishlist use live prices.
 */
export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const products = await loadCatalogue()

  return (
    <div className='flex min-h-screen flex-col'>
      <StoreHydration products={products} />
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
