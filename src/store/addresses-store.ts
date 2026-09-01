// Third-party Imports
import { create } from 'zustand'

// Type Imports
import type { Address } from '@/types/addresses'

// Data Imports
import { addressesData } from '@/fake-db/addresses'

interface AddressesStore {
  addresses: Address[]
  editingAddressId: string | null
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  addOrUpdateAddress: (address: Address) => void
  setEditingAddress: (id: string | null) => void
  getAddressById: (id: string) => Address | undefined
}

export const useAddressesStore = create<AddressesStore>((set, get) => ({
  addresses: addressesData,
  editingAddressId: null,

  removeAddress: (id: string) => {
    set((state: AddressesStore) => ({
      addresses: state.addresses.filter((address: Address) => address.id !== id)
    }))
  },

  setDefaultAddress: (id: string) => {
    set((state: AddressesStore) => ({
      addresses: state.addresses.map((address: Address) => {
        if (address.id === id) {
          return { ...address, isDefault: true }
        }

        return { ...address, isDefault: false }
      })
    }))
  },

  addOrUpdateAddress: (newAddress: Address) => {
    set((state: AddressesStore) => {
      const existingIndex = state.addresses.findIndex((address: Address) => address.id === newAddress.id)

      if (existingIndex >= 0) {
        const updated = [...state.addresses]

        updated[existingIndex] = newAddress

        return { addresses: updated, editingAddressId: null }
      }

      return { addresses: [...state.addresses, newAddress], editingAddressId: null }
    })
  },

  setEditingAddress: (id: string | null) => {
    set({ editingAddressId: id })
  },

  getAddressById: (id: string): Address | undefined => {
    const state = get()

    return state.addresses.find((address: Address) => address.id === id)
  }
}))
