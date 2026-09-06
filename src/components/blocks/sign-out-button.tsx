'use client'

// React Imports
import { useTransition, type ReactNode } from 'react'

// Server Actions
import { signOut } from '@/lib/account/actions'

// Utils Imports
import { cn } from '@/lib/utils'

/** Ends the session on the server and returns the visitor to the homepage. */
const SignOutButton = ({ className, children }: { className?: string; children?: ReactNode }) => {
  const [pending, start] = useTransition()

  return (
    <button type='button' disabled={pending} onClick={() => start(() => signOut())} className={cn(className, pending && 'opacity-60')}>
      {children}
    </button>
  )
}

export default SignOutButton
