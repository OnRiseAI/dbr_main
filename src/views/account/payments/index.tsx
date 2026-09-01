'use client'

// Third-party Imports
import { PlusIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import AddCardForm from '@/views/account/payments/add-card-form'
import PaymentCard from '@/views/account/payments/payment-card'

// Store Imports
import { usePaymentsStore } from '@/store/payments-store'

const PaymentsView = () => {
  const { cards, editingCardId, setEditingCard, addOrUpdateCard, getCardById } = usePaymentsStore()

  const editingCard = editingCardId ? getCardById(editingCardId) : undefined
  const isEvenCards = cards.length % 2 === 0

  const handleSaveCard = (cardData: any) => {
    if (editingCardId) {
      addOrUpdateCard({
        ...editingCard,
        ...cardData,
        last4: cardData.number?.slice(-4) || editingCard?.last4 || '0000'
      })
    } else {
      addOrUpdateCard({
        id: `payment-${Date.now()}`,
        brand: 'Visa',
        image: '/images/account/visa-card.webp',
        last4: cardData.number?.slice(-4) || '0000',
        expiry: cardData.expiry || '',
        name: cardData.name || '',
        number: cardData.number || '',
        cvc: cardData.cvc || ''
      })
    }
  }

  return (
    <div className='space-y-6'>
      <h3 className='mb-3.5 text-xl font-semibold'>Payments</h3>

      <div className='grid gap-3.5 lg:grid-cols-2'>
        {cards.map((card: (typeof cards)[0]) => (
          <PaymentCard key={card.id} card={card} />
        ))}

        <AddCardForm
          editingCard={
            editingCard
              ? {
                  id: editingCard.id,
                  number: editingCard.number,
                  expiry: editingCard.expiry,
                  cvc: editingCard.cvc,
                  name: editingCard.name
                }
              : undefined
          }
          onSave={handleSaveCard}
          onOpenChange={open => {
            if (!open && editingCardId) {
              setEditingCard(null)
            }
          }}
          trigger={
            <div
              className={`border-border hover:border-primary relative flex items-center justify-center rounded-xl border p-6 transition-colors duration-300 ${isEvenCards ? 'lg:col-span-2 lg:h-41' : ''}`}
            >
              <div className='space-y-3 text-center'>
                <Button variant='outline' size='icon' className='mx-auto size-9 rounded-full'>
                  <PlusIcon className='size-6' />
                  <span className='sr-only'>Add Payment Method</span>
                </Button>
                <h4 className='text-lg font-medium'>Add Payment</h4>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

export { PaymentsView }
