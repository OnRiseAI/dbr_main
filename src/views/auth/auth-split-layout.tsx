// React Imports
import type { ReactNode } from 'react'

// Component Imports
import AuthPromoPanel from '@/views/auth/auth-promo-panel'

type AuthSplitLayoutProps = {
  children: ReactNode
  promo: {
    title: string
    description: string
    cardTitle: string
    cardText: string
  }
}

const AuthSplitLayout = ({ children, promo }: AuthSplitLayoutProps) => {
  return (
    <div className='bg-background min-h-screen lg:grid lg:grid-cols-2'>
      <div className='flex min-h-screen flex-col items-center justify-center p-6'>
        <div className='flex w-full flex-col gap-6 sm:max-w-md'>{children}</div>
      </div>
      <AuthPromoPanel {...promo} />
    </div>
  )
}

export default AuthSplitLayout
