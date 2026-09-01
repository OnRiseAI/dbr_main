'use client'

// Third-party Imports
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Type Imports
import type { Order } from '@/types/order'

type OrdersState = {
  orders: Order[]
  addOrderItems: (items: Omit<Order, 'id'>[]) => void
  getOrders: () => Order[]
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrderItems: (items: Omit<Order, 'id'>[]) => {
        const newOrders = items.map(item => ({
          ...item,
          id: crypto.randomUUID()
        }))

        set(state => ({
          orders: [...newOrders, ...state.orders]
        }))
      },

      getOrders: () => get().orders
    }),
    {
      name: 'shopix-orders-store',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
)

export function useUserOrders() {
  return useOrdersStore(state => state.orders)
}
