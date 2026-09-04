import type { Product } from '@/types/product'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  product: Product
}

/** What arrives. The product itself gets the picture; the paper gets words. */
const ProductIncluded = ({ product }: Props) => {
  const isPen = product.specs?.form === 'pen'
  const strength = product.specs ? `${product.specs.strengthMg} mg` : ''

  const items = [
    {
      title: isPen ? `${product.specs?.compound ?? ''} pen, ${strength}` : `${product.specs?.compound ?? ''} vial, ${strength}`,
      body: isPen ? 'Pre-filled, capped, sealed.' : 'Lyophilised, sealed under a crimp cap.'
    },
    {
      title: 'Handling insert',
      body: 'Storage, preparation and use guidance for this product.'
    },
    {
      title: 'Batch documentation',
      body: 'The purity test record for the batch your order came from.'
    },
    {
      title: 'Tracked dispatch',
      body: 'From Germany, in discreet packaging with a tracking number.'
    }
  ]

  return (
    <section className='py-8 sm:py-12'>
      <ContentLayout>
        <div className='grid overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]'>
          <div className='flex flex-col border-b p-6 sm:border-r lg:border-b-0'>
            <div className='flex h-32 items-center justify-center'>
              <img src={product.image} alt='' className='max-h-full object-contain' />
            </div>
            <p className='mt-4 text-xs font-semibold tracking-[0.14em] uppercase'>In the box</p>
            <p className='mt-1 font-semibold'>{items[0].title}</p>
            <p className='text-muted-foreground text-sm'>{items[0].body}</p>
          </div>
          {items.slice(1).map((item, index) => (
            <div
              key={item.title}
              className={[
                'flex flex-col justify-end p-6',
                index === 0 ? 'border-b lg:border-r lg:border-b-0' : '',
                index === 1 ? 'border-b sm:border-r lg:border-b-0' : '',
                index === 2 ? '' : ''
              ].join(' ')}
            >
              <p className='font-semibold'>{item.title}</p>
              <p className='text-muted-foreground mt-1 text-sm'>{item.body}</p>
            </div>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductIncluded
