import ContentLayout from '@/components/layout/content-layout'

const ITEMS = [
  { title: 'Dispatched from Germany', body: 'Tracked shipping on every order.' },
  { title: 'Batch documentation', body: 'Every batch tested and documented before dispatch.' },
  { title: 'Pens and vials', body: 'Pre-filled pens, ready to use. Lyophilised vials for those who prefer to draw their own.' },
  { title: 'Research use only', body: 'Supplied for research purposes. Not for human or veterinary use.' }
]

/** Plain trust strip under the hero. Text only, no icons. */
const HomeTrust = () => {
  return (
    <section className='pt-8 sm:pt-12'>
      <ContentLayout>
        <ul className='divide-border grid divide-y rounded-xl border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x'>
          {ITEMS.map(item => (
            <li key={item.title} className='space-y-1 px-5 py-4'>
              <p className='font-semibold'>{item.title}</p>
              <p className='text-muted-foreground text-sm'>{item.body}</p>
            </li>
          ))}
        </ul>
      </ContentLayout>
    </section>
  )
}

export default HomeTrust
