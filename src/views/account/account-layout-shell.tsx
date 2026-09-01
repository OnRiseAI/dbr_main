'use client'

// React Imports
import type { MouseEvent, ReactNode } from 'react'
import { useState } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// Third-party Imports
import { MenuIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import AccountSidebar from '@/views/account/account-sidebar'

const AccountLayoutShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) {
      setSidebarOpen(false)
    }
  }

  if (pathname === '/account/track-order' || pathname === '/account/exchange-return') {
    return <>{children}</>
  }

  return (
    <div className='grid gap-6 md:grid-cols-5 lg:grid-cols-4'>
      <Button variant='outline' className='w-fit rounded-md md:hidden' onClick={() => setSidebarOpen(true)}>
        <MenuIcon className='size-4' />
        Account Menu
      </Button>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side='left' className='w-80 gap-0 overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>Account Menu</SheetTitle>
          </SheetHeader>
          <div className='p-4 pt-0' onClick={handleSidebarClick}>
            <AccountSidebar />
          </div>
        </SheetContent>
      </Sheet>

      <div className='hidden md:col-span-2 md:block lg:col-span-1'>
        <AccountSidebar />
      </div>
      <div className='md:col-span-3'>{children}</div>
    </div>
  )
}

export default AccountLayoutShell
