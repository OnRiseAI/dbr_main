'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { parseAsString, useQueryState } from 'nuqs'

// Type Imports
import type { Product } from '@/types/product'
import type { SortKey } from '@/views/pages/shop/shop-toolbar'

// Component Imports
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import ProductCard from '@/components/blocks/product-card'
import ProductListCard from '@/components/blocks/product-list-card'
import ProductGridCalculator from '@/components/blocks/product-grid-calculator'
import ContentLayout from '@/components/layout/content-layout'
import ShopFilters from '@/views/pages/shop/shop-filters'
import ShopToolbar from '@/views/pages/shop/shop-toolbar'

// Hook Imports
import { usePagination } from '@/hooks/use-pagination'

// Data Imports
import { categoryFilters } from '@/fake-db/category-filters'

type Props = {
  products: Product[]
}

/** Format categories, listed in their own group under the goals. */
const FORMATS = ['Pens', 'Vials']

const GRID_PAGE_SIZE = 12
const LIST_PAGE_SIZE = 10

const ShopView = ({ products }: Props) => {
  const { goals, formats, counts } = useMemo(() => {
    const names = new Set<string>()
    const counts: Record<string, number> = { all: products.length }

    products.forEach(product => {
      const own = new Set<string>([product.category, ...(product.collections ?? [])].filter(Boolean))

      own.forEach(name => {
        names.add(name)
        counts[name] = (counts[name] ?? 0) + 1
      })
    })

    const all = [...names]

    return {
      goals: all.filter(name => !FORMATS.includes(name)),
      formats: FORMATS.filter(name => names.has(name)),
      counts
    }
  }, [products])

  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all').withOptions({ history: 'replace', shallow: true })
  )

  // Category-aware price range
  const minPrice = useMemo(() => {
    if (category === 'all' || !categoryFilters[category]) {
      return Math.floor(Math.min(...products.map(p => p.price)))
    }

    return categoryFilters[category].priceMin
  }, [products, category])

  const maxPrice = useMemo(() => {
    if (category === 'all' || !categoryFilters[category]) {
      return Math.ceil(Math.max(...products.map(p => p.price)))
    }

    return categoryFilters[category].priceMax
  }, [products, category])

  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice])
  const [minDiscount, setMinDiscount] = useState(0)
  const [isNew, setIsNew] = useState(false)
  const [sort, setSort] = useState<SortKey>('recommended')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Reset price range when category changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrice([minPrice, maxPrice])
  }, [category, minPrice, maxPrice])

  const filteredProducts = useMemo(() => {
    const list = products.filter(
      product =>
        (category === 'all' ||
          product.category === category ||
          Boolean(product.collections?.includes(category))) &&
        product.price >= price[0] &&
        product.price <= price[1] &&
        product.discount >= minDiscount &&
        (!isNew || product.isNew)
    )

    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)

    if (sort === 'newest') {
      return [...list].sort((a, b) => {
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1

        return 0
      })
    }

    return list
  }, [products, category, price, minDiscount, isNew, sort])

  const pageSize = view === 'grid' ? GRID_PAGE_SIZE : LIST_PAGE_SIZE

  const {
    paginatedItems: paginatedProducts,
    totalPages,
    pageNumbers
  } = usePagination(filteredProducts, pageSize, currentPage)

  const filterProps = {
    goals,
    formats,
    counts,
    minPrice,
    maxPrice,
    filters: { category, price, minDiscount, isNew },
    onCategoryChange: setCategory,
    onPriceChange: setPrice,
    onMinDiscountChange: setMinDiscount,
    onIsNewToggle: () => setIsNew(current => !current),
    onClearAll: () => {
      setCategory('all')
      setPrice([minPrice, maxPrice])
      setMinDiscount(0)
      setIsNew(false)
    }
  }

  return (
    <section className='py-8 lg:py-14'>
      <ContentLayout>
        <Breadcrumb className='mb-3.5'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href='/' />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {category === 'all' ? (
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href='/shop' />}>Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className='gap-4 max-lg:space-y-6 lg:grid lg:grid-cols-4'>
          <aside className='col-span-1 hidden h-fit lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:block'>
            <ShopFilters {...filterProps} />
          </aside>

          <div className='col-span-3 space-y-8'>
            <ShopToolbar
              count={filteredProducts.length}
              total={products.length}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={v => {
                setView(v)
                setCurrentPage(1)
              }}
              onOpenFilters={() => setFiltersOpen(true)}
            />

            {filteredProducts.length === 0 ? (
              <p className='text-muted-foreground py-16 text-center'>No products match your filters.</p>
            ) : (
              <>
                {view === 'grid' ? (
                  <div className='mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                    {paginatedProducts.map(product => {
                      const badges = [
                        product.isNew ? { label: 'New', variant: 'new' as const } : null,
                        product.showDiscountBadge
                          ? { label: `${product.discount}% OFF`, variant: 'destructive' as const }
                          : null
                      ].filter((b): b is NonNullable<typeof b> => b !== null)

                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          badges={badges.length > 0 ? badges : undefined}
                        />
                      )
                    })}
                    <ProductGridCalculator products={filteredProducts} />
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {paginatedProducts.map(product => {
                      const badges = [
                        product.isNew ? { label: 'New', variant: 'new' as const } : null,
                        product.showDiscountBadge
                          ? { label: `${product.discount}% OFF`, variant: 'destructive' as const }
                          : null
                      ].filter((b): b is NonNullable<typeof b> => b !== null)

                      return (
                        <ProductListCard
                          key={product.id}
                          product={product}
                          badges={badges.length > 0 ? badges : undefined}
                        />
                      )
                    })}
                  </div>
                )}

                {totalPages > 1 && (
                  <Pagination className='mt-auto'>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => {
                            if (currentPage > 1) setCurrentPage(p => Math.max(1, p - 1))
                          }}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>

                      {pageNumbers.map((page, idx) => (
                        <PaginationItem key={idx}>
                          {page === '...' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              isActive={currentPage === page}
                              onClick={() => setCurrentPage(page as number)}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => {
                            if (currentPage < totalPages) setCurrentPage(p => Math.min(totalPages, p + 1))
                          }}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </ContentLayout>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side='left' className='w-80 gap-0 overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className='p-4 pt-0'>
            <ShopFilters {...filterProps} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export { ShopView }
