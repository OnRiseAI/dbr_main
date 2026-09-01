// Third-party Imports
import { create } from 'zustand'

// Data Imports
import { paymentCards } from '@/fake-db/payments'

export type PaymentCard = {
  id: string
  brand: string
  image: string
  last4: string
  expiry: string
  status?: 'default' | 'expired'
  isDefault?: boolean
  number?: string
  cvc?: string
  name?: string
}

interface PaymentsStore {
  cards: PaymentCard[]
  editingCardId: string | null
  removeCard: (id: string) => void
  setDefaultCard: (id: string) => void
  addOrUpdateCard: (card: PaymentCard) => void
  setEditingCard: (id: string | null) => void
  getCardById: (id: string) => PaymentCard | undefined
}

export const usePaymentsStore = create<PaymentsStore>((set, get) => ({
  cards: paymentCards,
  editingCardId: null,

  removeCard: (id: string) => {
    set((state: PaymentsStore) => ({
      cards: state.cards.filter((card: PaymentCard) => card.id !== id)
    }))
  },

  setDefaultCard: (id: string) => {
    set((state: PaymentsStore) => ({
      cards: state.cards.map((card: PaymentCard) => {
        if (card.id === id) {
          return { ...card, isDefault: true, status: 'default' as const }
        }

        return { ...card, isDefault: false, status: card.status === 'default' ? undefined : card.status }
      })
    }))
  },

  addOrUpdateCard: (newCard: PaymentCard) => {
    set((state: PaymentsStore) => {
      const existingIndex = state.cards.findIndex((card: PaymentCard) => card.id === newCard.id)

      if (existingIndex >= 0) {
        const updated = [...state.cards]

        updated[existingIndex] = newCard

        return { cards: updated, editingCardId: null }
      }

      return { cards: [...state.cards, newCard], editingCardId: null }
    })
  },

  setEditingCard: (id: string | null) => {
    set({ editingCardId: id })
  },

  getCardById: (id: string): PaymentCard | undefined => {
    const state = get()

    return state.cards.find((card: PaymentCard) => card.id === id)
  }
}))
