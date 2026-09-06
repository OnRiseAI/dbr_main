'use client'

// React Imports
import { useEffect } from 'react'

// Store Imports
import { useUserStore, type SessionUser } from '@/store/user-store'

/** Seeds the client user store with the customer the server saw on this request. */
const AccountHydration = ({ user }: { user: SessionUser | null }) => {
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return null
}

export default AccountHydration
