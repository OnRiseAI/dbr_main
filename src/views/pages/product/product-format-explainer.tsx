import type { Product } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  product: Product
}

const num = (value: number, digits = 2) => value.toLocaleString('en-GB', { maximumFractionDigits: digits })

/**
 * The numbers on the rail are the numbers on the render: 1 liquid, 2
 * lyophilised. Step 3 is the assembled pen. Vials use the same rail for the
 * three reconstitution steps.
 */
const ProductFormatExplainer = ({ product }: Props) => {
  const specs = product.specs
  const isPen = specs?.form === 'pen'
  const image = isPen ? (product.images.find(src => src.includes('stacked')) ?? product.images[0]) : product.image

  const mgPerMl = specs?.fillMl ? specs.strengthMg / specs.fillMl : undefined

  const copy = isPen
    ? {
        eyebrow: 'Dual-chamber pen',
        title: 'Inside the pen',
        lead: 'The peptide and its diluent travel in separate chambers. They meet inside the pen on first use, so nothing is prepared by hand.',
        steps: [
          { title: 'Liquid chamber', body: 'Sterile diluent, sealed on its own until the first use.' },
          { title: 'Lyophilised chamber', body: 'The peptide kept dry, which is what keeps it stable in storage.' },
          { title: 'Assembled and mixed', body: 'One turn combines the chambers. Cap off, needle on, dial the units.' }
        ],
        chips: specs
          ? [
              `${num(specs.strengthMg)} mg total`,
              ...(specs.fillMl ? [`${num(specs.fillMl)} ml once mixed`] : []),
              ...(mgPerMl ? [`${num(mgPerMl)} mg/ml`] : []),
              'No reconstitution'
            ]
          : []
      }
    : {
        eyebrow: 'Lyophilised vial',
        title: 'From powder to solution',
        lead: 'A vial gives you the concentration you choose. Reconstitute once, then draw each amount with an insulin syringe.',
        steps: [
          { title: 'Add bacteriostatic water', body: 'Slowly, down the inside of the glass. Water is not included.' },
          { title: 'Swirl until clear', body: 'Gently. Shaking damages the peptide.' },
          { title: 'Draw the amount', body: 'With an insulin syringe, using the units from the calculator above.' }
        ],
        chips: specs
          ? [
              `${num(specs.strengthMg)} mg lyophilised`,
              `${num(specs.strengthMg / 2)} mg/ml with 2 ml water`,
              'Refrigerate after mixing'
            ]
          : []
      }

  return (
    <section className='py-8 sm:py-12'>
      <ContentLayout>
        <div className='grid overflow-hidden rounded-xl border lg:grid-cols-[minmax(0,460px)_1fr]'>
          <div className='flex items-center justify-center border-b bg-white p-6 lg:border-r lg:border-b-0 lg:p-10'>
            <img src={image} alt='' className='max-h-[420px] w-auto object-contain lg:max-h-[540px]' />
          </div>

          <div className='flex flex-col p-6 sm:p-8 lg:p-10'>
            <p className='text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase'>{copy.eyebrow}</p>
            <h2 className='mt-2 text-2xl font-semibold tracking-tight sm:text-3xl'>{copy.title}</h2>
            <p className='text-muted-foreground mt-3 max-w-xl text-base leading-relaxed'>{copy.lead}</p>

            <ol className='divide-border mt-8 divide-y border-y'>
              {copy.steps.map((step, index) => (
                <li key={step.title} className='grid grid-cols-[56px_1fr] items-baseline gap-4 py-5'>
                  <span className='text-3xl font-semibold tracking-tight tabular-nums'>{index + 1}</span>
                  <div className='space-y-1'>
                    <p className='font-semibold'>{step.title}</p>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {copy.chips.length > 0 ? (
              <ul className='mt-6 flex flex-wrap gap-2'>
                {copy.chips.map(chip => (
                  <li key={chip} className='rounded-full border px-3 py-1 text-xs font-medium tabular-nums'>
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductFormatExplainer
