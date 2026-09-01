'use client'

// React Imports
import { useMemo, useState } from 'react'

// Type Imports
import type { Order, OrderStatus } from '@/types/order'

// Component Imports
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'
import OrderCard from '@/views/account/orders/order-card'

// Utils Imports
import { cn } from '@/lib/utils'

type Props = {
  orders: Order[]
}

const statusFilters: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Returned', value: 'returned' },
  { label: 'Cancelled', value: 'cancelled' }
]

const OrdersView = ({ orders }: Props) => {
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')
  const [orderId, setOrderId] = useState('all')

  const orderIdItems = useMemo(
    () => [
      { label: 'All Order IDs', value: 'all' },
      ...orders.map(order => ({ label: order.orderId, value: order.orderId }))
    ],
    [orders]
  )

  const filteredOrders = orders.filter(order => {
    const matchesStatus = status === 'all' || order.status === status
    const matchesOrderId = orderId === 'all' || order.orderId === orderId

    return matchesStatus && matchesOrderId
  })

  return (
    <div className='space-y-3.5'>
      <h3 className='text-xl font-semibold'>My Orders</h3>

      <div className='flex flex-wrap items-center justify-between gap-3.5'>
        <div className='flex flex-wrap gap-2.5'>
          {statusFilters.map(filter => (
            <Button
              key={filter.value}
              variant='outline'
              size='xs'
              className={cn('rounded-full', status === filter.value && 'border-primary dark:border-primary')}
              onClick={() => setStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <Select items={orderIdItems} value={orderId} onValueChange={value => setOrderId(value ?? 'all')}>
          <SelectTrigger className='input-lg w-56 text-xs'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {orderIdItems.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-5'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className='text-muted-foreground py-10 text-center'>No orders found.</p>
        )}
      </div>
    </div>
  )
}

export { OrdersView }
export default OrdersView
