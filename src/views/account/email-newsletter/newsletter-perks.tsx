'use client'

// React Imports
import { useState } from 'react'

// Component Imports
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

const perks = [
  {
    id: 'vip-access',
    title: 'VIP Access',
    description: 'Be first to know about flash sales, secret drops, and special promos.',
    enabled: true
  },
  {
    id: 'weekly-edit',
    title: 'Your Weekly Edit',
    description: 'A fresh dose of inspiration: new looks, trending pieces, and curated picks for every week.',
    enabled: false
  },
  {
    id: 'early-bird',
    title: 'Early Bird Access',
    description: 'Get early access to new drops and limited-stock items before everyone else.',
    enabled: false
  },
  {
    id: 'birthday-treats',
    title: 'Birthday Treats',
    description: 'A special surprise for your big day - because you deserve it!',
    enabled: false
  },
  {
    id: 'member-discounts',
    title: 'Member-Only Discounts',
    description: 'Exclusive promo codes and extra savings, just for our loyal members.',
    enabled: false
  }
]

const NewsletterPerks = () => {
  // States
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(perks.map(perk => [perk.id, perk.enabled]))
  )

  return (
    <div className='border-border rounded-xl border p-6'>
      <h4 className='text-2xl font-semibold'>All Perks</h4>
      <Separator className='my-4.5' />
      <div className='space-y-6'>
        {perks.map(perk => (
          <div key={perk.id} className='flex items-center justify-between gap-6'>
            <div className='max-w-125'>
              <p className='mb-1 text-lg font-medium'>{perk.title}</p>
              <p className='text-muted-foreground text-base'>{perk.description}</p>
            </div>
            <Switch
              checked={toggles[perk.id]}
              onCheckedChange={checked => setToggles(prev => ({ ...prev, [perk.id]: checked }))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsletterPerks
