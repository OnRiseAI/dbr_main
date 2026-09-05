// React Imports
import type { ReactNode } from 'react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import AccountLayoutShell from '@/views/account/account-layout-shell'

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='py-8 sm:py-10 lg:py-14'>
      <ContentLayout>
        <AccountLayoutShell>{children}</AccountLayoutShell>
      </ContentLayout>
    </section>
  )
}

export default AccountLayout
