import type { Product } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'
import FaqList, { type FaqItem } from '@/components/blocks/faq-list'

type Props = {
  product: Product
  variants?: Product[]
}

const num = (value: number, digits = 2) => value.toLocaleString('en-GB', { maximumFractionDigits: digits })

const buildFaq = (product: Product, variants: Product[]): FaqItem[] => {
  const specs = product.specs
  const compound = specs?.compound ?? product.name
  const isPen = specs?.form === 'pen'
  const strength = specs ? `${num(specs.strengthMg)} mg` : ''
  const mgPerMl = specs?.fillMl ? specs.strengthMg / specs.fillMl : undefined

  const items: FaqItem[] = []

  if (specs) {
    items.push({
      q: `What does ${strength} mean on this ${isPen ? 'pen' : 'vial'}?`,
      a: isPen
        ? mgPerMl
          ? `${strength} is the total ${compound} in the pen, in ${num(specs.fillMl ?? 0)} ml of solution once mixed. That is ${num(mgPerMl)} mg/ml, so each unit on the dial (0.01 ml) delivers ${num(mgPerMl / 100, 3)} mg. The calculator on this page turns your amount into units.`
          : `${strength} is the total ${compound} in the pen once the two chambers are mixed. The calculator on this page turns your amount into units on the dial.`
        : `${strength} is the amount of lyophilised ${compound} in the vial. The concentration is set by how much bacteriostatic water you add: with 2 ml it is ${num(specs.strengthMg / 2)} mg/ml. The calculator on this page gives the units for your volume.`
    })
  }

  items.push(
    isPen
      ? {
          q: 'Does the pen need mixing or reconstituting?',
          a: 'No. The pen holds the diluent and the lyophilised peptide in separate chambers and combines them inside the pen on first use. Remove the cap, attach a needle, dial the units.'
        }
      : {
          q: 'Does the vial need reconstituting?',
          a: 'Yes. Add bacteriostatic water slowly, swirl gently until clear, then draw each amount with an insulin syringe. Water is not included.'
        }
  )

  if (variants.length > 1) {
    const others = variants.filter(variant => variant.id !== product.id).map(variant => variant.variantLabel).join(' and ')

    items.push({
      q: `Which strength should I choose?`,
      a: `${product.familyName ?? product.name} comes as ${variants.map(v => v.variantLabel).join(' and ')}. The higher strength means more ${compound} per ${isPen ? 'pen' : 'vial'}, not a different product. Pick by how much you use over a month; the calculator shows how long each option lasts. The other option here is ${others}.`
    })
  }

  items.push(
    {
      q: 'What ships with it?',
      a: `The ${isPen ? 'pen' : 'vial'}, a handling insert with storage and use guidance, and the batch documentation for the batch your order came from. Orders are dispatched from Germany with tracking, in discreet packaging.`
    },
    {
      q: 'Who is this for?',
      a: 'Deep Beauty Research products are supplied for research purposes only. They are not for human or veterinary use.'
    }
  )

  return items
}

const ProductFaq = ({ product, variants = [product] }: Props) => {
  const items = buildFaq(product, variants)

  return (
    <section className='py-8 sm:py-12'>
      <ContentLayout className='grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Questions about this product</h2>
          <p className='text-muted-foreground text-base'>Short answers. Anything else, use the contact page.</p>
        </div>
        <FaqList items={items} />
      </ContentLayout>
    </section>
  )
}

export default ProductFaq
