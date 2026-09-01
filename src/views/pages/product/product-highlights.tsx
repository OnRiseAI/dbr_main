// Third-party Imports
import { CheckIcon } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'

type HighlightRow = {
  category: string
  manufacture: string
  material: string
  compatibility: string
  features: string[]
}

type Props = {
  rows: HighlightRow[]
}

const ProductHighlights = ({ rows }: Props) => {
  const headers = ['Category', 'Manufacture', 'Product Material', 'Product Compatibility', 'Features']

  return (
    <section className='py-8 lg:py-14'>
      <ContentLayout className='space-y-6'>
        <h3 className='text-2xl font-semibold'>Key Highlights</h3>

        <div className='border-border w-full overflow-x-auto rounded-xl border'>
          <table className='w-full text-base'>
            <thead className='bg-muted'>
              <tr>
                {headers.map(header => (
                  <th
                    key={header}
                    className='text-primary bg-muted h-15 border-e px-4 text-center text-base font-medium text-nowrap last:border-e-0'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className='border-border border-t'>
                  <td className='border-border text-muted-foreground border-e px-4 py-2 text-center align-middle'>
                    {row.category}
                  </td>
                  <td className='border-border text-muted-foreground border-e px-4 py-2 text-center align-middle'>
                    {row.manufacture}
                  </td>
                  <td className='border-border text-muted-foreground border-e px-4 py-2 text-center align-middle'>
                    {row.material}
                  </td>
                  <td className='border-border text-muted-foreground border-e px-4 py-2 text-center align-middle'>
                    {row.compatibility}
                  </td>
                  <td className='text-muted-foreground px-4 py-2 align-middle'>
                    <div className='flex flex-col gap-2.5 md:ml-10'>
                      {row.features.map(feature => (
                        <div key={feature} className='flex items-center gap-1'>
                          <CheckIcon className='text-primary size-4 shrink-0' />
                          <span className='text-nowrap'>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductHighlights
