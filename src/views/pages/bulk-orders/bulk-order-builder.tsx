'use client'

// React Imports
import { useMemo, useState, useTransition } from 'react'

// Third-party Imports
import { CheckCircle2Icon, MinusIcon, PlusIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Store Imports
import { useProductsStore } from '@/store/use-products-store'

// Server Actions
import { submitBulkRequest } from '@/app/server/bulk-orders'

// Utils Imports
import { familyTitle, formatMeta, formatPrice } from '@/utils/product-utils'
import { cn } from '@/lib/utils'

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

/**
 * Build the request from the live catalogue: pick products, set quantities, see the unit
 * count and the list-price total, then send it. List prices are shown for scale only;
 * volume pricing comes back on the quote.
 */
const BulkOrderBuilder = () => {
  const products = useProductsStore(state => state.products)
  const [qty, setQty] = useState<Record<string, number>>({})
  const [form, setForm] = useState({ fullName: '', company: '', email: '', phone: '', country: '', message: '' })
  const [pending, start] = useTransition()
  const [result, setResult] = useState<{ ok: true; reference: string } | { ok: false; error: string } | null>(null)

  const catalogue = useMemo(() => products.filter(p => !p.hiddenVariant), [products])

  const lines = useMemo(
    () =>
      catalogue
        .filter(p => (qty[p.id] ?? 0) > 0)
        .map(p => ({ id: p.id, name: p.name.replace(' | ', ' '), qty: qty[p.id], unitPrice: p.price })),
    [catalogue, qty]
  )

  const units = lines.reduce((n, l) => n + l.qty, 0)
  const listTotal = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0)

  const set = (id: string, value: number) => setQty(q => ({ ...q, [id]: Math.max(0, Math.min(999, Math.round(value) || 0)) }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    start(async () => {
      const r = await submitBulkRequest({ ...form, lines })

      setResult(r)
      if (r.ok) window.scrollTo({ top: (document.getElementById('bulk-builder')?.offsetTop ?? 0) - 120, behavior: 'smooth' })
    })
  }

  if (result?.ok) {
    return (
      <div id='bulk-builder' className='rounded-xl border p-6 sm:p-10'>
        <CheckCircle2Icon className='size-8 text-emerald-600' />
        <h3 className='mt-4 text-2xl font-bold'>Request received. Reference {result.reference}.</h3>
        <p className='text-muted-foreground mt-2 max-w-xl'>
          {units} units across {lines.length} product{lines.length === 1 ? '' : 's'}. You will have a quote from a named
          contact within one business day, sent to {form.email}. First shipments need a quick verification: a company
          email domain or a short note on the business.
        </p>
      </div>
    )
  }

  return (
    <form id='bulk-builder' onSubmit={submit} className='grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12'>
      {/* Products */}
      <div>
        <p className={eyebrow}>Step 1</p>
        <h3 className='mt-2 text-xl font-bold'>Choose products and quantities</h3>
        <ul className='border-foreground/15 mt-5 divide-y border-y'>
          {catalogue.map(p => {
            const q = qty[p.id] ?? 0

            return (
              <li key={p.id} className={cn('flex items-center gap-4 py-3', q > 0 && 'bg-muted/40 -mx-3 rounded-md px-3')}>
                <img src={p.image} alt='' className='size-12 shrink-0 rounded-md bg-white object-contain ring-1 ring-border' />
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-medium'>
                    {familyTitle(p)}
                    {p.variantLabel ? <span className='text-muted-foreground font-normal'> · {p.variantLabel}</span> : null}
                  </p>
                  <p className='text-muted-foreground truncate text-xs'>
                    {formatMeta(p)} · list {formatPrice(p.price)}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <Button type='button' variant='outline' size='icon-sm' aria-label={`Fewer ${p.name}`} onClick={() => set(p.id, q - 1)} disabled={q === 0}>
                    <MinusIcon className='size-4' />
                  </Button>
                  <Input
                    inputMode='numeric'
                    aria-label={`Quantity of ${p.name}`}
                    value={q === 0 ? '' : String(q)}
                    placeholder='0'
                    onChange={e => set(p.id, Number(e.target.value))}
                    className='h-8 w-16 text-center'
                  />
                  <Button type='button' variant='outline' size='icon-sm' aria-label={`More ${p.name}`} onClick={() => set(p.id, q + 1)}>
                    <PlusIcon className='size-4' />
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Summary + details */}
      <div className='space-y-6 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start'>
        <div className='rounded-xl bg-neutral-950 p-6 text-white'>
          <p className='text-xs font-semibold tracking-[0.16em] text-white/55 uppercase'>Your request</p>
          <p className='mt-3 text-4xl font-semibold tabular-nums'>
            {units} <span className='text-lg font-normal text-white/70'>units</span>
          </p>
          <p className='mt-1 text-sm text-white/70'>
            {lines.length === 0 ? 'Nothing added yet.' : `${lines.length} product${lines.length === 1 ? '' : 's'} · list price ${formatPrice(listTotal)} before volume pricing`}
          </p>
          {lines.length > 0 ? (
            <ul className='mt-4 space-y-1 border-t border-white/15 pt-4 text-sm text-white/80'>
              {lines.map(l => (
                <li key={l.id} className='flex justify-between gap-3'>
                  <span className='truncate'>
                    {l.qty} × {l.name}
                  </span>
                  <span className='shrink-0 tabular-nums'>{formatPrice(l.qty * l.unitPrice)}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className='space-y-4'>
          <div>
            <p className={eyebrow}>Step 2</p>
            <h3 className='mt-2 text-xl font-bold'>Where to send the quote</h3>
          </div>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='space-y-1.5'>
              <Label htmlFor='bulk-name'>Name *</Label>
              <Input id='bulk-name' autoComplete='name' required value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='bulk-company'>Company or clinic</Label>
              <Input id='bulk-company' autoComplete='organization' value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='bulk-email'>Email *</Label>
              <Input id='bulk-email' type='email' autoComplete='email' required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='bulk-phone'>Phone or WhatsApp</Label>
              <Input id='bulk-phone' type='tel' autoComplete='tel' value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className='space-y-1.5 sm:col-span-2'>
              <Label htmlFor='bulk-country'>Delivery country *</Label>
              <Input id='bulk-country' autoComplete='country-name' required value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
            </div>
            <div className='space-y-1.5 sm:col-span-2'>
              <Label htmlFor='bulk-message'>Anything we should know</Label>
              <Textarea
                id='bulk-message'
                rows={3}
                placeholder='How often you reorder, delivery timing, paperwork you need…'
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>
          </div>
          {result && !result.ok ? <p className='text-destructive text-sm'>{result.error}</p> : null}
          <Button type='submit' size='lg' className='w-full' disabled={pending || lines.length === 0}>
            {pending ? 'Sending…' : 'Request a bulk quote'}
          </Button>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            Quote within one business day from a named contact. No minimum order. Volume pricing is agreed on the quote,
            never guessed here. Research use only.
          </p>
        </div>
      </div>
    </form>
  )
}

export default BulkOrderBuilder
