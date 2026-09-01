'use client'

// React Imports
import { useState } from 'react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const NewsletterActions = () => {
  // States
  const [unsubscribed, setUnsubscribed] = useState(true)

  return (
    <>
      <div className='flex gap-2 sm:items-center'>
        <Checkbox
          id='unsubscribe-all'
          checked={unsubscribed}
          onCheckedChange={checked => setUnsubscribed(checked === true)}
          className='size-5'
        />
        <Label htmlFor='unsubscribe-all' className='cursor-pointer text-sm'>
          Unsubscribe me from all marketing emails
        </Label>
      </div>
      <Button className='w-full' size='lg'>
        Save Changes
      </Button>
    </>
  )
}

export default NewsletterActions
