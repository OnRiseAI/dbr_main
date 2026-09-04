import type { Product } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  product: Product
}

const num = (value: number, digits = 2) =>
  value.toLocaleString('en-GB', { maximumFractionDigits: digits, minimumFractionDigits: 0 })

/**
 * The data sheet. Every row comes from the label or the order, nothing else.
 * Set like a specification: label left, value right in tabular figures.
 */
const ProductSpecs = ({ product }: Props) => {
  const specs = product.specs

  if (!specs) return null

  const isPen = specs.form === 'pen'
  const mgPerMl = specs.fillMl ? specs.strengthMg / specs.fillMl : undefined
  const unitsPerMg = mgPerMl ? 100 / mgPerMl : undefined

  const rows: Array<[string, string, string?]> = [
    ['Compound', specs.compound],
    ['Strength', `${num(specs.strengthMg)} mg`, isPen ? 'total in the pen' : 'lyophilised, per vial'],
    ['Form', isPen ? 'Pre-filled dual-chamber pen' : 'Lyophilised vial'],
    ...(specs.fillMl ? [['Fill volume', `${num(specs.fillMl)} ml`] as [string, string]] : []),
    ...(mgPerMl ? [['Concentration', `${num(mgPerMl)} mg/ml`, 'once mixed'] as [string, string, string]] : []),
    ...(unitsPerMg
      ? [['Units per mg', `${num(unitsPerMg, 1)} units`, '1 unit = 0.01 ml on the dial'] as [string, string, string]]
      : [['Concentration', 'Set by you', 'depends on the water you add'] as [string, string, string]]),
    ['Preparation', isPen ? 'None. Mixes in the pen on first use.' : 'Reconstitute with bacteriostatic water'],
    ['Storage', 'Refrigerate. Do not freeze.', 'full guidance on the handling insert'],
    ['Ships from', 'Germany', 'tracked'],
    ['Documentation', 'Batch documentation in the box'],
    ['Intended use', 'Research use only']
  ]

  return (
    <section className='py-8 sm:py-12'>
      <ContentLayout>
        <div className='grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>At a glance</h2>
            <p className='text-muted-foreground text-base'>
              Read from the label. The numbers the calculator uses are the ones here.
            </p>
          </div>
          <dl className='divide-border divide-y border-y'>
            {rows.map(([label, value, note]) => (
              <div key={label} className='grid gap-1 py-3.5 sm:grid-cols-[180px_1fr] sm:gap-6'>
                <dt className='text-muted-foreground text-sm'>{label}</dt>
                <dd className='flex flex-wrap items-baseline gap-x-3'>
                  <span className='font-medium tabular-nums'>{value}</span>
                  {note ? <span className='text-muted-foreground text-xs'>{note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductSpecs
