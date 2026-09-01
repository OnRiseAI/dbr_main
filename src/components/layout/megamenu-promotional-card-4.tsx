export const MegamenuPromotionalCard4 = () => {
  return (
    <div className='w-full shrink-0 lg:w-80'>
      <div className='from-primary/20 flex h-full flex-col items-center justify-between rounded-md bg-linear-to-b from-0% via-neutral-50 via-50% to-neutral-100 to-100% p-4 pt-10 text-center'>
        <div>
          <h3 className='text-foreground mb-2.5 text-2xl font-bold'>
            Ultimate <span className='text-green-600 dark:text-green-400'>eCommerce</span>
          </h3>
          <h4 className='text-foreground mb-4 text-2xl font-semibold'>Template Pages</h4>
          <p className='text-muted-foreground dark:text-primary-foreground mb-6 text-lg'>Modern & customizable.</p>
        </div>

        <div className='relative h-48 w-full'>
          <img
            src='/images/mega-menu/image-01.webp'
            alt='Template 1'
            className='absolute bottom-2 left-2 h-40 w-28 -rotate-7 rounded-xl border-4 border-neutral-200 object-cover shadow-sm'
          />
          <img
            src='/images/mega-menu/image-03.webp'
            alt='Template 3'
            className='absolute right-2 bottom-2 h-40 w-28 rotate-7 rounded-xl border-4 border-neutral-200 object-cover shadow-sm'
          />
          <img
            src='/images/mega-menu/image-02.webp'
            alt='Template 2'
            className='absolute bottom-0 left-1/2 z-1 h-48 w-36 -translate-x-1/2 rounded-xl border-4 border-neutral-200 object-cover shadow-lg'
          />
        </div>
      </div>
    </div>
  )
}
