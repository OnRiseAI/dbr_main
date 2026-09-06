// Third-party Imports
import { create } from 'zustand'

export type SessionUser = {
  name: string
  email: string
  initials: string
}

interface UserStore {

  /** Signed-in customer, seeded from the server on every page; null when signed out. */
  user: SessionUser | null
  avatarUrl: string | null
  setUser: (user: SessionUser | null) => void
  setAvatarUrl: (url: string | null) => void
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  avatarUrl: null,
  setUser: user => set({ user }),
  setAvatarUrl: url => set({ avatarUrl: url })
}))
