// Component Imports
import { Separator } from '@/components/ui/separator'

const rows = [
  { label: 'Subtotal', value: '$599.00' },
  { label: 'Discount', value: '-$50.00' },
  { label: 'Shipment cost', value: '$22.50' }
]

const PriceSummary = () => {
  return (
    <div className='border-border space-y-2 rounded-md border p-6'>
      {rows.map(row => (
        <div key={row.label} className='flex justify-between'>
          <p className='text-muted-foreground text-base font-medium'>{row.label}</p>
          <p className='text-lg'>{row.value}</p>
        </div>
      ))}
      <Separator className='my-3' />
      <div className='flex justify-between'>
        <p className='text-muted-foreground text-base font-medium'>Grand total</p>
        <p className='text-lg'>$571.50</p>
      </div>
    </div>
  )
}

export default PriceSummary
