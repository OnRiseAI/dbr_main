import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

/**
 * The offer tile inside the Shop menu. Edit OFFER to run a promotion:
 * set `code` to show a coupon line, or leave it undefined to feature a product.
 */
const OFFER = {
  eyebrow: 'Pens',
  title: 'Retatrutide, pre-filled',
  body: '15 mg and 40 mg. Ready straight from the fridge, dispatched from Germany.',
  code: undefined as string | undefined,
  href: '/shop?category=Pens',
  cta: 'Shop pens',
  image: '/images/products/dbr-reta-pen-15mg-upright.png'
}

export const MegamenuPromotionalCard2 = () => {
  return (
    <div className='w-full shrink-0 lg:w-87.5'>
      <Link
        href={OFFER.href}
        className='bg-muted group flex h-104 gap-4 overflow-hidden rounded-lg p-6 transition-colors hover:bg-neutral-200/60'
      >
        <div className='flex flex-1 flex-col'>
          <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>{OFFER.eyebrow}</p>
          <h3 className='text-foreground mt-2 text-2xl leading-tight font-bold'>{OFFER.title}</h3>
          <p className='text-muted-foreground mt-2 text-sm'>{OFFER.body}</p>
          {OFFER.code ? (
            <p className='mt-4 text-sm'>
              Code <span className='bg-background rounded px-1.5 py-0.5 font-mono font-semibold'>{OFFER.code}</span>
            </p>
          ) : null}
          <span className='mt-auto inline-flex items-center gap-1.5 text-sm font-semibold'>
            {OFFER.cta}
            <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
          </span>
        </div>
        <div className='flex w-24 shrink-0 items-center justify-center'>
          <img src={OFFER.image} alt='' className='max-h-full object-contain' />
        </div>
      </Link>
    </div>
  )
}
