// Component Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExchangeTab from './exchange-tab'
import ProductSummary from './product-summary'
import ReturnTab from './return-tab'

const ExchangeReturnView = () => {
  return (
    <div className='space-y-6'>
      <ProductSummary />

      <div>
        <Tabs defaultValue='exchange' className='gap-0'>
          <TabsList variant='line' className='w-full gap-0 group-data-horizontal/tabs:h-8.5'>
            <TabsTrigger value='exchange' className='w-full text-base font-medium'>
              Exchange
            </TabsTrigger>
            <TabsTrigger value='return' className='w-full text-base font-medium'>
              Return
            </TabsTrigger>
          </TabsList>

          <TabsContent value='exchange' className='mt-10'>
            <ExchangeTab />
          </TabsContent>
          <TabsContent value='return' className='mt-10'>
            <ReturnTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export { ExchangeReturnView }
export default ExchangeReturnView
