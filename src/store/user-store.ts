// Third-party Imports
import { create } from 'zustand'

interface UserStore {
  avatarUrl: string | null
  setAvatarUrl: (url: string | null) => void
}

export const useUserStore = create<UserStore>(set => ({
  avatarUrl: null,

  setAvatarUrl: (url: string | null) => {
    set({ avatarUrl: url })
  }
}))
