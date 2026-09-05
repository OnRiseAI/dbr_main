type AuthPromoPanelProps = {
  title: string
  description: string
  cardTitle: string
  cardText: string
}

const FACTS = [
  ['7', 'years in the business'],
  ['Germany', 'where we are based'],
  ['>99%', 'purity floor by HPLC'],
  ['2 to 3', 'days EU delivery']
]

/** Right-hand panel on the auth split screens. Dark band, the pen, four facts. */
const AuthPromoPanel = ({ title, description, cardTitle, cardText }: AuthPromoPanelProps) => {
  return (
    <div className='relative flex flex-col justify-between overflow-hidden bg-neutral-950 p-10 text-white max-lg:hidden lg:p-14'>
      <img
        src='/images/products/dbr-reta-pen-15mg-upright.png'
        alt=''
        aria-hidden
        className='pointer-events-none absolute -right-16 -bottom-24 h-[120%] w-auto rotate-[18deg] object-contain opacity-90'
      />
      <div className='relative max-w-md space-y-4'>
        <p className='font-mono text-[10px] tracking-[0.12em] text-white/55 uppercase'>Deep Beauty Research</p>
        <h1 className='text-4xl font-bold tracking-tight text-balance'>{title}</h1>
        <p className='text-lg text-white/70'>{description}</p>
      </div>
      <div className='relative max-w-md space-y-5'>
        <div className='space-y-1.5 border-t border-white/15 pt-5'>
          <p className='text-xl font-semibold tracking-tight'>{cardTitle}</p>
          <p className='text-white/70'>{cardText}</p>
        </div>
        <dl className='grid grid-cols-2 gap-x-8 gap-y-5'>
          {FACTS.map(([value, label]) => (
            <div key={label} className='border-t border-white/15 pt-3'>
              <dt className='text-3xl font-light tracking-tight tabular-nums'>{value}</dt>
              <dd className='font-mono text-[10px] tracking-[0.12em] text-white/55 uppercase'>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default AuthPromoPanel
