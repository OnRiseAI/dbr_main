import ContentLayout from '@/components/layout/content-layout'

const PILLARS = [
  { lead: 'Every batch', body: 'tested for purity before it is allowed to ship.' },
  { lead: 'In the box', body: 'the batch documentation for the product you received.' },
  { lead: 'From Germany', body: 'tracked dispatch in discreet packaging.' },
  { lead: 'Pens and vials', body: 'pre-filled and ready, or lyophilised for your own preparation.' }
]

/**
 * The standard. One statement, four facts. Typographic, on a dark band, with
 * the pen render bleeding off the right edge.
 */
const HomeTrust = () => {
  return (
    <section className='pt-8 sm:pt-12'>
      <ContentLayout>
        <div className='relative overflow-hidden rounded-xl bg-neutral-950 text-white'>
          <img
            src='/images/products/dbr-reta-pen-15mg-upright.png'
            alt=''
            aria-hidden
            className='pointer-events-none absolute -right-10 -bottom-24 hidden h-[125%] w-auto rotate-[18deg] object-contain opacity-90 lg:block'
          />
          <div className='relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-14'>
            <div className='space-y-4'>
              <p className='text-xs font-semibold tracking-[0.16em] text-white/55 uppercase'>The standard</p>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]'>
                Tested, documented, and dispatched from Germany.
              </h2>
              <p className='max-w-md text-base text-white/70'>
                A small range, made properly. What arrives is the product, its paperwork, and nothing you did not
                order.
              </p>
            </div>

            <dl className='grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:pr-44'>
              {PILLARS.map(pillar => (
                <div key={pillar.lead} className='space-y-1.5 border-t border-white/15 pt-4'>
                  <dt className='text-lg font-semibold tracking-tight'>{pillar.lead}</dt>
                  <dd className='text-sm leading-relaxed text-white/70'>{pillar.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeTrust
