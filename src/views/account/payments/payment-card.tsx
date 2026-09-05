// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Store Imports
import { usePaymentsStore, type PaymentCard as PaymentCardType } from '@/store/payments-store'

// Utils Imports
import { cn } from '@/lib/utils'

const PaymentCard = ({ card }: { card: PaymentCardType }) => {
  const { removeCard, setDefaultCard, setEditingCard } = usePaymentsStore()
  const isExpired = card.status === 'expired'

  const handleRemove = () => {
    removeCard(card.id)
  }

  const handleSetDefault = () => {
    setDefaultCard(card.id)
  }

  const handleEdit = () => {
    setEditingCard(card.id)
  }

  return (
    <div
      className={cn(
        'border-border relative rounded-xl border p-4 transition-colors duration-300',
        isExpired ? 'bg-muted/50 opacity-75' : 'hover:border-primary'
      )}
    >
      {card.status === 'default' && (
        <Badge
          variant='outline'
          className='dark:border-primary absolute top-4 right-4 rounded-full text-xs font-medium'
        >
          Default
        </Badge>
      )}
      {isExpired && (
        <Badge
          className='text-destructive border-destructive absolute top-4 right-4 rounded-full text-xs font-medium'
          variant='outline'
        >
          Expired
        </Badge>
      )}

      <div className='mb-2.5'>
        <img src={card.image} alt={card.brand} />
      </div>
      <p className='mb-1 text-base font-medium'>
        {card.brand} ending in {card.last4}
      </p>
      <p className='text-muted-foreground mb-4 text-base font-medium'>Exp. date {card.expiry}</p>

      <div className='flex gap-4'>
        <Button
          variant='link'
          size='xs'
          onClick={handleEdit}
          disabled={isExpired}
          className='text-foreground h-auto border-0 p-0 text-base font-normal disabled:cursor-not-allowed disabled:opacity-50'
        >
          Edit
        </Button>
        <Button
          variant='link'
          size='xs'
          onClick={handleRemove}
          className='text-foreground h-auto border-0 p-0 text-base font-normal disabled:cursor-not-allowed disabled:opacity-50'
        >
          Remove
        </Button>
        {card.isDefault ? (
          <span className='text-muted-foreground cursor-default text-base font-normal'>Set as Default</span>
        ) : (
          <Button
            variant='link'
            size='xs'
            onClick={handleSetDefault}
            disabled={isExpired}
            className='text-foreground h-auto border-0 p-0 text-base font-normal disabled:cursor-not-allowed disabled:opacity-50'
          >
            Set as Default
          </Button>
        )}
      </div>
    </div>
  )
}

export type { PaymentCardType }
export default PaymentCard
