import Link from 'next/link'

import type { Product } from '@/types/product'
import ProductCard from '@/components/blocks/product-card'
import ContentLayout from '@/components/layout/content-layout'
import { collapseFamilies, formatMeta } from '@/utils/product-utils'

type Props = {
  title: string
  subtitle?: string
  href: string
  linkLabel?: string
  products: Product[]
}

const COLUMNS: Record<number, string> = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' }

/**
 * A titled row with one card per product line (Retatrutide, GHK-Cu, MOTS-c ...), no strengths.
 * The product page carries the strength selector. No promotional tile, no countdown.
 */
const HomeProductRow = ({ title, subtitle, href, linkLabel = 'View all', products }: Props) => {
  const lines = collapseFamilies(products)
  const columns = COLUMNS[lines.length] ?? 'lg:grid-cols-4'

  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout className='space-y-8'>
        <div className='flex items-end justify-between gap-4'>
          <div className='space-y-1'>
            <h3 className='text-2xl font-bold sm:text-3xl'>{title}</h3>
            {subtitle ? <p className='text-muted-foreground text-base'>{subtitle}</p> : null}
          </div>
          <Link href={href} className='text-muted-foreground hover:text-foreground shrink-0 text-base font-medium'>
            {linkLabel}
          </Link>
        </div>
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${columns}`}>
          {lines.map(({ product, title: lineTitle, count }) => (
            <ProductCard
              key={product.id}
              product={product}
              title={lineTitle}
              meta={formatMeta(product)}
              fromPrice={count > 1}
              badges={product.isNew ? [{ label: 'New', variant: 'new' as const }] : undefined}
            />
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeProductRow
