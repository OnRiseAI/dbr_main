'use client'

// React Imports
import { useEffect, useState } from 'react'

// Type Imports
import type { Order } from '@/types/order'

// Component Imports
import OrdersView from '@/views/account/orders'

// Store Imports
import { useUserOrders, useOrdersStore } from '@/store/orders-store'

type Props = {
  staticOrders: Order[]
}

const OrdersWithClientData = ({ staticOrders }: Props) => {
  const userOrders = useUserOrders()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    useOrdersStore.persist.rehydrate()?.then(() => setIsHydrated(true))
  }, [])

  if (!isHydrated) {
    return <div className='text-muted-foreground py-10 text-center'>Loading orders...</div>
  }

  const allOrders = [...userOrders, ...staticOrders]

  return <OrdersView orders={allOrders} />
}

export default OrdersWithClientData
