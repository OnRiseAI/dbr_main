'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { XIcon, CheckIcon, ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Utils Imports
import { cn } from '@/lib/utils'

type CompareProduct = {
  id: string
  brand: string
  name: string
  href: string
  image: string
  price: string
  oldPrice: string
  rating: number
  attributes: Record<string, string | boolean>
}

const attributeRows: { key: string; label: string }[] = [
  { key: 'availability', label: 'Availability' },
  { key: 'price', label: 'Price' },
  { key: 'screenSize', label: 'Screen Size' },
  { key: 'resolution', label: 'Resolution' },
  { key: 'batteryLife', label: 'Battery Life' },
  { key: 'waterResistance', label: 'Water Resistance' },
  { key: 'heartRateMonitor', label: 'Heart Rate Monitor' },
  { key: 'nfcPayments', label: 'NFC Payments' },
  { key: 'weight', label: 'Weight' },
  { key: 'colors', label: 'Colors Available' },
  { key: 'warranty', label: 'Warranty' }
]

const products: CompareProduct[] = [
  {
    id: 'boult-crown-watch',
    brand: 'NOISE',
    name: "Boult Drift+ Smart Watch 1.85''HD...",
    href: '/product/warmeo-micro-matic-lunchbox',
    image: '/images/account/compare-product-03.webp',
    price: '$225.00',
    oldPrice: '$249',
    rating: 4,
    attributes: {
      availability: 'In stock',
      price: '$199',
      screenSize: '1.4"',
      resolution: '400 x 400 px',
      batteryLife: 'Up to 7 days',
      waterResistance: '5 ATM',
      heartRateMonitor: true,
      nfcPayments: false,
      weight: '48 g',
      colors: 'Black',
      warranty: '1 year'
    }
  },
  {
    id: 'apple-smartwatch',
    brand: 'NOISE',
    name: "Boult Drift+ Smart Watch 1.85''HD...",
    href: '/product/apple-smartwatch',
    image: '/images/account/compare-product-01.webp',
    price: '$225.00',
    oldPrice: '$249',
    rating: 4,
    attributes: {
      availability: 'Limited stock',
      price: '$249',
      screenSize: '1.6"',
      resolution: '454 x 454 px',
      batteryLife: 'Up to 10 days',
      waterResistance: 'IP68',
      heartRateMonitor: true,
      nfcPayments: true,
      weight: '52 g',
      colors: 'Silver Black, Brown, Blue',
      warranty: '6 months'
    }
  },
  {
    id: 'apple-airpods-max',
    brand: 'NOISE',
    name: "Boult Drift+ Smart Watch 1.85''HD...",
    href: '/product/apple-airpods-max',
    image: '/images/account/compare-product-02.webp',
    price: '$225.00',
    oldPrice: '$249',
    rating: 4,
    attributes: {
      availability: 'In stock',
      price: '$179',
      screenSize: '1.3"',
      resolution: '360 x 360 px',
      batteryLife: 'Up to 5 days',
      waterResistance: '3 ATM',
      heartRateMonitor: true,
      nfcPayments: false,
      weight: '42 g',
      colors: 'Black, Grey',
      warranty: '1 year'
    }
  }
]

const renderAttributeValue = (key: string, value: string | boolean) => {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckIcon className='size-6 text-green-600 dark:text-green-400' />
    ) : (
      <XIcon className='text-destructive size-6' />
    )
  }

  if (key === 'availability') {
    const isFull = value === 'In stock'

    return (
      <span
        className={cn(
          'text-base font-medium',
          isFull ? 'leading-6 text-green-600 dark:text-green-400' : 'leading-6 text-amber-600 dark:text-amber-400'
        )}
      >
        {value}
      </span>
    )
  }

  return value
}

const CompareView = () => {
  return (
    <div className='border-border dark:border-primary/25 overflow-x-auto rounded-xl border'>
      <table className='w-full text-base'>
        <thead>
          <tr>
            <th className='dark:border-primary/25 max-w-102 min-w-70 border-e p-4 align-top md:min-w-75'>
              <div className='flex h-full flex-col items-center justify-between'>
                <div className='mb-4 space-y-4 text-start md:mb-14'>
                  <p className='text-3xl font-semibold'>FLAT</p>
                  <p className='text-destructive text-6xl leading-19.5 font-semibold'>
                    25% <span className='text-foreground text-xl font-medium'>OFF</span>
                  </p>
                  <p className='text-foreground mb-7 text-2xl font-medium sm:mb-8'>EXCLUSIVE WATCH SALE</p>
                  <p className='text-muted-foreground text-lg font-normal'>
                    Hurry! Only a few units remain at this special price.
                  </p>
                </div>
                <Button className='group w-full' size='lg'>
                  Grab a deal <ArrowRightIcon className='transition-all duration-300 group-hover:translate-x-1' />
                </Button>
              </div>
            </th>
            {products.map((product, index) => (
              <th
                key={product.id}
                className={cn(
                  'max-w-75 p-0 align-top max-xl:min-w-64',
                  index < products.length - 1 && 'border-border dark:border-primary/25 border-e'
                )}
              >
                <div className='bg-muted relative flex h-full flex-col justify-center md:h-70'>
                  <Link href={product.href}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-full max-h-54.5 w-full cursor-pointer object-contain transition-transform duration-300 hover:scale-105'
                    />
                  </Link>
                  {(index === 0 || index === 2) && (
                    <Badge className='bg-destructive hover:bg-destructive absolute top-2.5 left-3 text-white'>
                      {index === 0 ? '20% off' : '10% off'}
                    </Badge>
                  )}
                  <Button
                    variant='ghost'
                    size='icon'
                    aria-label='Remove from comparison'
                    className='absolute top-2.5 right-3 rounded-full'
                  >
                    <XIcon className='size-4.5 shrink-0' />
                  </Button>
                </div>
                <div className='flex flex-col p-4 text-start'>
                  <Link href={product.href} className='hover:text-primary text-lg font-semibold'>
                    {product.brand}
                  </Link>
                  <p className='text-muted-foreground mb-1.5 text-sm font-normal capitalize'>{product.name}</p>
                  <div className='mt-1 flex items-center gap-1.5'>
                    <span className='text-sm font-semibold'>{product.price}</span>
                    <span className='text-muted-foreground text-sm font-normal line-through'>{product.oldPrice}</span>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attributeRows.map((row, rowIndex) => (
            <tr
              key={row.key}
              className={cn('border-border dark:border-primary/25 border-t', (rowIndex - 3) % 2 === 0 && 'bg-muted')}
            >
              <td className='border-border dark:border-primary/25 text-muted-foreground border-e py-5 pr-2 pl-4 text-base font-semibold'>
                {row.label}
              </td>
              {products.map((product, index) => (
                <td
                  key={product.id}
                  className={cn(
                    'py-5 pr-2 pl-4',
                    index < products.length - 1 && 'border-border dark:border-primary/25 border-e text-base font-medium'
                  )}
                >
                  {renderAttributeValue(row.key, product.attributes[row.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { CompareView }
