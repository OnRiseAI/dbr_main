// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import ContentLayout from '@/components/layout/content-layout'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

const ctaButtonClass =
  'hover:bg-foreground dark:hover:bg-foreground hover:text-background dark:hover:text-background group'

type Props = {

  /** Catalogue rows the tiles read prices, discounts and flags from. */
  products: Product[]
}

/**
 * Hero tiles. Every badge and price on a tile comes from the product data, so a tile can
 * only claim a discount the catalogue actually carries (see dbr-products.json).
 */
const HomeHero = ({ products }: Props) => {
  const byId = new Map(products.map(product => [product.id, product]))
  const reta15 = byId.get('retatrutide-pen-15mg')
  const reta40 = byId.get('retatrutide-pen-40mg')
  const ghk100 = byId.get('ghk-cu-pen-100mg')
  const ghk70 = byId.get('ghk-skin-glow-pen-70mg')
  const motsc = byId.get('mots-c-pen-20mg')
  const vials = products.filter(product => product.specs?.form === 'vial')

  const retaPens = [reta15, reta40].filter((p): p is Product => Boolean(p))
  const ghkPens = [ghk100, ghk70].filter((p): p is Product => Boolean(p))

  return (
    <section className='scroll-mt-(--header-height) pt-8 sm:pt-10 lg:pt-14' id='hero-section'>
      <ContentLayout>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {/* Retatrutide */}
          {/* Tile tints are product-coded: the pen's teal for Retatrutide, copper for GHK-Cu. */}
          <Card className='bg-[#0592b3]/10 shadow-none ring-0'>
            <CardContent className='space-y-4'>
              <Badges
                items={[
                  discountBadge(retaPens),
                  reta15?.isPopular ? { label: 'Best seller', tone: 'outline' as const } : null
                ]}
              />
              <div className='space-y-2'>
                <h2 className='text-4xl font-bold'>Retatrutide pen</h2>
                <p className='text-lg'>
                  Pre-filled Retatrutide pens, ready straight from the fridge. 15 mg and 40 mg strengths, no reconstitution.
                </p>
              </div>
              <PriceLine products={retaPens} />
              <Button
                variant='outline'
                size='lg'
                className={ctaButtonClass}
                render={<Link href='/product/retatrutide-pen-15mg' />}
                nativeButton={false}
              >
                Shop Retatrutide
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
              </Button>
            </CardContent>
            <MotionPreset
              component='img'
              fade
              slide={{ direction: 'right', offset: 100 }}
              delay={0.3}
              transition={{ duration: 0.8 }}
              motionProps={{
                src: '/images/products/dbr-reta-pen-15mg.png',
                alt: 'Retatrutide pen'
              }}
              className='my-auto w-full px-2 py-4'
            />
          </Card>

          {/* GHK-Cu */}
          <Card className='bg-[#b87333]/10 shadow-none ring-0'>
            <MotionPreset
              component='img'
              fade
              slide={{ direction: 'up', offset: 100 }}
              delay={0.5}
              transition={{ duration: 0.8 }}
              motionProps={{
                src: '/images/products/dbr-ghk-cu-pen-100mg.png',
                alt: 'GHK-Cu Skin Glow pen'
              }}
              className='my-auto w-full px-2 py-4'
            />
            <CardContent className='space-y-4'>
              <Badges
                items={[
                  discountBadge(ghkPens),
                  ghk70?.isNew ? { label: 'New: 70 mg Skin Glow', tone: 'outline' as const } : null
                ]}
              />
              <h2 className='text-4xl font-bold'>GHK-Cu pen</h2>
              <p className='text-lg'>Copper peptide for skin, tone and collagen support. Pre-filled, 100 mg or the 70 mg Skin Glow.</p>
              <PriceLine products={ghkPens} />
              <Button
                variant='outline'
                size='lg'
                className={ctaButtonClass}
                render={<Link href='/product/ghk-cu-pen-100mg' />}
                nativeButton={false}
              >
                Shop GHK-Cu
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
              </Button>
            </CardContent>
          </Card>

          {/* Vials + MOTS-c */}
          <div className='grid gap-4 sm:grid-cols-2 md:col-span-2 lg:col-span-1 lg:grid-cols-1'>
            <Card className='ring-border gap-0 bg-white pb-0 shadow-none ring-1'>
              <CardContent className='space-y-3'>
                <Badges items={[discountBadge(vials), { label: `${vials.length} vials`, tone: 'outline' }]} />
                <h2 className='text-2xl font-bold sm:text-3xl'>Vials</h2>
                <PriceLine products={vials} compact />
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<Link href='/shop?category=Vials' />}
                  nativeButton={false}
                >
                  Shop vials
                  <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
                </Button>
              </CardContent>
              <MotionPreset
                component='img'
                fade
                slide={{ direction: 'down', offset: 100 }}
                delay={0.7}
                transition={{ duration: 0.8 }}
                motionProps={{
                  src: '/images/products/dbr-reta-vial-10mg.png',
                  alt: 'Retatrutide 10 mg vial'
                }}
                className='ms-auto mb-2 w-28'
              />
            </Card>
            <Card className='ring-border justify-between gap-0 bg-white pb-0 shadow-none ring-1'>
              <CardContent className='space-y-3'>
                <Badges
                  items={[
                    discountBadge(motsc ? [motsc] : []),
                    motsc?.isNew ? { label: 'New', tone: 'outline' as const } : null
                  ]}
                />
                <h2 className='text-2xl font-bold sm:text-3xl'>MOTS-c pen</h2>
                <PriceLine products={motsc ? [motsc] : []} compact />
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<Link href='/product/mots-c-pen-20mg' />}
                  nativeButton={false}
                >
                  View product
                  <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
                </Button>
              </CardContent>
              <MotionPreset
                component='img'
                fade
                slide={{ direction: 'down', offset: 100 }}
                delay={0.9}
                transition={{ duration: 0.8 }}
                motionProps={{
                  src: '/images/products/dbr-mots-c-pen-20mg.png',
                  alt: 'MOTS-c 20 mg pen'
                }}
                className='ms-auto mt-2 mb-4 w-64'
              />
            </Card>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

type BadgeItem = { label: string; tone: 'solid' | 'outline' }

/** The largest real discount across a tile's products, or nothing. */
const discountBadge = (items: Product[]): BadgeItem | null => {
  const best = Math.max(0, ...items.map(item => item.discount ?? 0))

  return best > 0 ? { label: `Save ${best}%`, tone: 'solid' } : null
}

const Badges = ({ items }: { items: Array<BadgeItem | null> }) => {
  const list = items.filter((item): item is BadgeItem => Boolean(item))

  if (list.length === 0) return null

  return (
    <div className='flex flex-wrap gap-2'>
      {list.map(item => (
        <span
          key={item.label}
          className={cn(
            'inline-flex h-6 items-center rounded-full px-2.5 font-mono text-[10px] tracking-[0.12em] uppercase',
            item.tone === 'solid' ? 'bg-foreground text-background' : 'ring-foreground/25 text-foreground ring-1'
          )}
        >
          {item.label}
        </span>
      ))}
    </div>
  )
}

/** From-price for a tile, with the list price struck through when the cheapest item is discounted. */
const PriceLine = ({ products, compact }: { products: Product[]; compact?: boolean }) => {
  if (products.length === 0) return null

  const cheapest = [...products].sort((a, b) => a.price - b.price)[0]
  const discounted = (cheapest.discount ?? 0) > 0

  return (
    <p className={cn('flex items-baseline gap-2 tabular-nums', compact ? 'text-base' : 'text-lg')}>
      <span className='text-muted-foreground text-sm'>From</span>
      <span className='font-semibold'>{formatPrice(cheapest.price)}</span>
      {discounted ? (
        <span className='text-muted-foreground text-sm line-through'>{formatPrice(cheapest.originalPrice)}</span>
      ) : null}
    </p>
  )
}

export default HomeHero
