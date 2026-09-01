// Type Imports
import type { OrderDetailGroup } from '@/types/order'

// Component Imports
import { Separator } from '@/components/ui/separator'
import OrderCard from '@/views/account/orders/order-card'

// Utils Imports
import { formatPrice } from '@/utils/product-utils'

type Props = {
  group: OrderDetailGroup
}

const OrderDetailGroupSection = ({ group }: Props) => {
  return (
    <div className='space-y-6 rounded-xl border p-4 sm:p-6'>
      {/* Header */}
      <h2 className='mb-4 text-xl font-semibold'>Latest Order</h2>

      {/* Customer info */}
      <div>
        <div className='grid gap-6 sm:grid-cols-2'>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Name</p>
            <p className='text-lg font-medium'>{group.customer.name}</p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Email Address</p>
            <p className='text-base font-semibold'>{group.customer.email}</p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Phone Number</p>
            <p className='text-base font-semibold'>{group.customer.phone}</p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Address</p>
            <p className='text-base font-semibold'>{group.customer.address}</p>
          </div>
        </div>
      </div>

      {/* Order meta */}
      <div className='border-border rounded-md border p-4'>
        <div className='grid grid-cols-2 max-sm:gap-y-4 sm:grid-cols-4 sm:gap-3.5 md:max-lg:grid-cols-2'>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Order Date</p>
            <p className='text-base font-medium'>{group.orderDate}</p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Delivery Date</p>
            <p className='text-base font-medium'>{group.deliveryDate}</p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Order ID</p>
            <p className='text-base font-medium'>{group.orderId}</p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1 text-base font-medium'>Payment Method</p>
            <img src={group.paymentMethod} alt='Payment method' className='h-6 w-auto' />
          </div>
        </div>
      </div>

      {/* Items */}
      {group.items.map(item => (
        <OrderCard key={item.id} order={item} disableDetailsAndOrderAgainLinks />
      ))}

      {/* Summary */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <p className='text-muted-foreground text-base font-medium'>Subtotal</p>
          <p className='text-lg'>{formatPrice(group.summary.subtotal)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-muted-foreground text-base font-medium'>Discount</p>
          <p className='text-lg'>-{formatPrice(group.summary.discount)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-muted-foreground text-base font-medium'>Shipment cost</p>
          <p className='text-lg'>{formatPrice(group.summary.shipment)}</p>
        </div>
        <Separator className='my-3' />
        <div className='flex items-center justify-between'>
          <p className='text-muted-foreground text-base font-medium'>Grand total</p>
          <p className='text-lg'>{formatPrice(group.summary.grandTotal)}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailGroupSection
