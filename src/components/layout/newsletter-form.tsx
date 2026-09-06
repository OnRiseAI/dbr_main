'use client'

// React Imports
import { useState, useTransition } from 'react'

// Third-party Imports
import { ArrowRightIcon, CheckIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Server Actions
import { subscribeNewsletter } from '@/app/server/newsletter'

/** Email in, one line back. Saved to the shop's signup list. */
const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, start] = useTransition()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    start(async () => {
      const result = await subscribeNewsletter(email)

      setNote(result.ok ? { ok: true, text: 'You are on the list.' } : { ok: false, text: result.error })
      if (result.ok) setEmail('')
    })
  }

  return (
    <form onSubmit={submit} className='space-y-2'>
      <div className='flex gap-2'>
        <Input
          type='email'
          required
          autoComplete='email'
          placeholder='Your email...'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={pending}
        />
        <Button size='icon' type='submit' aria-label='Subscribe' disabled={pending}>
          {note?.ok ? <CheckIcon /> : <ArrowRightIcon />}
        </Button>
      </div>
      {note ? <p className={note.ok ? 'text-xs text-emerald-700' : 'text-destructive text-xs'}>{note.text}</p> : null}
    </form>
  )
}

export default NewsletterForm
