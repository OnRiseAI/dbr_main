import Link from 'next/link'

/**
 * Fills the empty cells of a short last grid row so the catalogue never ends on an
 * orphan card. Must be the LAST child of a `sm:grid-cols-2 xl:grid-cols-3` grid.
 *
 * Its own child index is count + 1, so nth-child arithmetic reads the product count:
 *   3 columns  count % 3 == 1 -> index 3n+2 -> start col 2, stretch to the end
 *              count % 3 == 2 -> index 3n   -> start col 3
 *              count % 3 == 0 -> index 3n+1 -> row already full, hide
 *   2 columns  count odd      -> index 2n   -> start col 2
 *              count even     -> index 2n+1 -> hide
 *   1 column   always its own row, hide
 */
const ProductGridFiller = () => (
  <div className='max-sm:hidden sm:max-xl:nth-[2n]:col-[2/-1] sm:max-xl:nth-[2n+1]:hidden xl:nth-[3n+2]:col-[2/-1] xl:nth-[3n]:col-[3/-1] xl:nth-[3n+1]:hidden'>
    <div className='bg-foreground text-background flex h-full flex-col justify-between rounded-xl p-6'>
      <div className='space-y-3'>
        <p className='text-xs font-semibold tracking-wide uppercase opacity-70'>Choosing a strength</p>
        <h5 className='text-lg leading-snug font-semibold'>
          The strength is the total peptide in the pen or vial, not the dose you take.
        </h5>
        <p className='text-sm opacity-80'>
          Pick a product and a dose in the units calculator and it works out how many doses each strength
          gives you, so you can compare them like for like.
        </p>
      </div>
      <div className='mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium'>
        <Link href='/#calculator' className='underline underline-offset-4'>
          Open the calculator
        </Link>
        <Link href='/#pen-or-vial' className='underline underline-offset-4'>
          Pen or vial?
        </Link>
      </div>
    </div>
  </div>
)

export default ProductGridFiller
