// Next Imports
import Link from 'next/link'

type Priority = 'urgent' | 'normal'

type Ticket = {
  title: string
  meta: string
  priority: Priority
  status: string
}

const tickets: Ticket[] = [
  {
    title: 'Wrong Item Received - Need Exchange',
    meta: 'Jul 02, 2025 - Order Problem',
    priority: 'urgent',
    status: 'Open'
  },
  {
    title: 'Promo Code Not Working at Checkout',
    meta: 'Jul 01, 2025 - Website Help',
    priority: 'urgent',
    status: 'Open'
  },
  {
    title: 'Request to Change Delivery Address',
    meta: 'Jun 29, 2025 - Order Update',
    priority: 'normal',
    status: 'Open'
  },
  {
    title: 'Damaged Package - Replacement Needed',
    meta: 'Jun 28, 2025 - Returns & Refunds',
    priority: 'urgent',
    status: 'Open'
  },
  { title: 'Account Login Help Needed', meta: 'Jun 27, 2025 - Website Help', priority: 'normal', status: 'Open' }
]

const SupportTicketView = () => {
  return (
    <div className='space-y-3.5'>
      <h3 className='text-xl font-semibold'>Support Tickets</h3>

      {tickets.map(ticket => (
        <Link
          key={ticket.title}
          href='/account/support-ticket'
          className='border-border hover:bg-muted group block rounded-xl border p-4'
        >
          <div className='space-y-2'>
            <h5 className='group-hover:text-primary text-xl font-medium'>{ticket.title}</h5>
            <p className='text-muted-foreground text-sm'>{ticket.meta}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export { SupportTicketView }
