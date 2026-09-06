'use client'

// React Imports
import { useState } from 'react'

// Type Imports
import type { AccountOrder, AccountStatus } from '@/lib/account/data'

// Component Imports
import { Button } from '@/components/ui/button'
import OrderCard from '@/views/account/orders/order-card'

// Utils Imports
import { cn } from '@/lib/utils'

type Props = {
  orders: AccountOrder[]
}

type Filter = 'all' | AccountStatus

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Awaiting payment', value: 'awaiting_payment' },
  { label: 'Paid', value: 'paid' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' }
]

const OrdersView = ({ orders }: Props) => {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = orders.filter(order => filter === 'all' || order.status === filter)

  return (
    <div className='space-y-3.5'>
      <h3 className='text-xl font-semibold'>My Orders</h3>

      <div className='flex flex-wrap gap-2.5'>
        {FILTERS.map(f => (
          <Button
            key={f.value}
            variant='outline'
            size='xs'
            className={cn('rounded-full', filter === f.value && 'border-primary dark:border-primary')}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            {f.value !== 'all' ? <span className='text-muted-foreground ml-1'>{orders.filter(o => o.status === f.value).length}</span> : null}
          </Button>
        ))}
      </div>

      <div className='space-y-5'>
        {shown.length > 0 ? (
          shown.map(order => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className='text-muted-foreground py-10 text-center'>
            {orders.length === 0 ? 'No orders yet. Your orders will appear here as soon as you place one.' : 'No orders with that status.'}
          </p>
        )}
      </div>
    </div>
  )
}

export { OrdersView }
export default OrdersView
