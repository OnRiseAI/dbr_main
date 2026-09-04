'use client'

import { useId, useState } from 'react'

import type { Product } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'
import { cn } from '@/lib/utils'

type Props = {
  product: Product
}

type Panel = {
  id: string
  label: string
  paragraphs: string[]
  list?: string[]
}

const PEN_STEPS = [
  'Take the pen out of the fridge and remove the cap. The two chambers mix inside the pen on first use, so there is nothing to prepare.',
  'Attach a standard pen needle. Use a fresh one every time.',
  'Turn the dose knob to the number of units you need. Each unit is 0.01 ml; the calculator on this page converts milligrams to units for this pen.'
]

const VIAL_STEPS = [
  'Add bacteriostatic water slowly down the inside of the glass. Water is not included with the vial.',
  'Swirl gently until the solution is clear. Never shake a peptide vial.',
  'Draw each amount with an insulin syringe. The calculator on this page gives the units for the water volume you used.'
]

const buildPanels = (product: Product): Panel[] => {
  const isPen = product.specs?.form === 'pen'
  const compound = product.specs?.compound ?? product.name

  return [
    {
      id: 'overview',
      label: 'Overview',
      paragraphs: product.overview?.length ? product.overview : [product.description]
    },
    {
      id: 'how-to-use',
      label: 'How to use',
      paragraphs: [
        isPen
          ? `The ${compound} pen is pre-filled and dual-chamber. Three steps, no vial and no syringe.`
          : `The ${compound} vial is supplied lyophilised. Reconstitute once, then draw each amount.`
      ],
      list: isPen ? PEN_STEPS : VIAL_STEPS
    },
    {
      id: 'storage',
      label: 'Storage and handling',
      paragraphs: isPen
        ? [
            'Keep the pen refrigerated. Do not freeze it, and keep it out of direct light.',
            'Keep the cap on between uses and fit a fresh pen needle each time. The handling insert that ships with every pen carries the full guidance for this product, including how long it can stay in use once started.'
          ]
        : [
            'Keep the sealed vial refrigerated and out of direct light. Do not freeze.',
            'Once reconstituted, keep the vial refrigerated and use it within the period given on the handling insert. Do not shake it at any point; swirl instead.'
          ]
    },
    {
      id: 'documentation',
      label: 'Documentation',
      paragraphs: [
        'Every batch is tested for purity and documented before dispatch. The batch documentation for your product ships in the box.',
        'If you need documentation for a specific batch, contact us with the batch number from the label.'
      ]
    }
  ]
}

/**
 * Tabbed detail. Every panel stays in the DOM (hidden, not unmounted) so the
 * full text is on the page for search engines; a reader sees one section.
 */
const ProductDetailsTabs = ({ product }: Props) => {
  const panels = buildPanels(product)
  const [active, setActive] = useState(panels[0].id)
  const baseId = useId()

  return (
    <section className='py-8 sm:py-12'>
      <ContentLayout>
        <div className='grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14'>
          <div role='tablist' aria-orientation='vertical' className='flex gap-2 overflow-x-auto lg:flex-col lg:gap-0'>
            {panels.map(panel => {
              const selected = panel.id === active

              return (
                <button
                  key={panel.id}
                  role='tab'
                  type='button'
                  id={`${baseId}-tab-${panel.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${panel.id}`}
                  onClick={() => setActive(panel.id)}
                  className={cn(
                    'shrink-0 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors lg:rounded-none lg:border-l-2 lg:px-5 lg:py-3 lg:text-base',
                    selected
                      ? 'bg-muted lg:border-foreground lg:bg-transparent'
                      : 'text-muted-foreground hover:text-foreground lg:border-border'
                  )}
                >
                  {panel.label}
                </button>
              )
            })}
          </div>

          <div>
            {panels.map(panel => (
              <div
                key={panel.id}
                role='tabpanel'
                id={`${baseId}-panel-${panel.id}`}
                aria-labelledby={`${baseId}-tab-${panel.id}`}
                hidden={panel.id !== active}
                className='max-w-2xl space-y-5'
              >
                <h2 className='text-2xl font-semibold tracking-tight'>{panel.label}</h2>
                {panel.paragraphs.map(text => (
                  <p key={text} className='text-muted-foreground text-base leading-relaxed'>
                    {text}
                  </p>
                ))}
                {panel.list ? (
                  <ol className='space-y-3'>
                    {panel.list.map((step, index) => (
                      <li key={step} className='flex gap-4'>
                        <span className='bg-foreground text-background flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums'>
                          {index + 1}
                        </span>
                        <span className='text-base leading-relaxed'>{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductDetailsTabs
