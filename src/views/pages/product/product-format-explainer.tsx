import type { Product } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  product: Product
}

const PEN = {
  title: 'Inside the pen',
  lead: 'Two chambers, one turn. The peptide stays lyophilised until you use it.',
  steps: [
    { title: 'Liquid chamber', body: 'Sterile diluent, sealed on its own until first use.' },
    { title: 'Lyophilised chamber', body: 'The peptide is kept dry, which is how it stays stable in storage.' },
    { title: 'Mixed in the pen', body: 'The chambers combine on first use. No vial, no syringe, nothing to measure.' }
  ]
}

const VIAL = {
  title: 'From powder to solution',
  lead: 'A vial gives you the concentration you choose. Three steps, then it is ready to draw.',
  steps: [
    { title: 'Add water', body: 'Bacteriostatic water, slowly, down the inside of the glass.' },
    { title: 'Swirl until clear', body: 'Gently. Shaking damages the peptide.' },
    { title: 'Draw with a syringe', body: 'An insulin syringe, using the units from the calculator above.' }
  ]
}

/** Pens get the stacked cartridge shot; vials get the render and the reconstitution steps. */
const ProductFormatExplainer = ({ product }: Props) => {
  const isPen = product.specs?.form === 'pen'
  const copy = isPen ? PEN : VIAL
  const image = isPen ? (product.images.find(src => src.includes('stacked')) ?? product.images[0]) : product.image

  return (
    <section className='py-8 sm:py-12'>
      <ContentLayout>
        <div className='bg-muted grid gap-8 rounded-xl p-6 sm:p-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12'>
          <div className='flex h-80 items-center justify-center rounded-lg bg-white lg:h-full'>
            <img src={image} alt='' className='max-h-72 object-contain p-3 lg:max-h-96' />
          </div>
          <div className='flex flex-col gap-6'>
            <div className='space-y-2'>
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{copy.title}</h2>
              <p className='text-muted-foreground text-base'>{copy.lead}</p>
            </div>
            <ol className='grid gap-5 sm:grid-cols-3'>
              {copy.steps.map((step, index) => (
                <li key={step.title} className='flex gap-3'>
                  <span className='bg-foreground text-background flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums'>
                    {index + 1}
                  </span>
                  <div className='space-y-1'>
                    <p className='font-semibold'>{step.title}</p>
                    <p className='text-muted-foreground text-sm'>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductFormatExplainer
