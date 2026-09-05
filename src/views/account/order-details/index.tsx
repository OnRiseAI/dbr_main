// Type Imports
import type { OrderDetailGroup } from '@/types/order'

// Component Imports
import OrderDetailGroupSection from '@/views/account/order-details/order-detail-group'

type Props = {
  groups: OrderDetailGroup[]
}

const OrderDetailsView = ({ groups }: Props) => {
  return (
    <div>
      {groups.map(group => (
        <div key={group.id}>
          <OrderDetailGroupSection group={group} />
        </div>
      ))}
    </div>
  )
}

export { OrderDetailsView }
export default OrderDetailsView
