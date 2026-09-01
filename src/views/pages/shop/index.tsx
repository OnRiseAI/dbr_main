'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { parseAsString, useQueryState } from 'nuqs'

// Type Imports
import type { Product, ProductColor } from '@/types/product'
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

const GRID_PAGE_SIZE = 12
const LIST_PAGE_SIZE = 10

const ShopView = ({ products }: Props) => {
  const categories = useMemo(
    () => [...new Set(products.map(product => product.category).filter((value): value is string => Boolean(value)))],
    [products]
  )

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

  const brands = useMemo(() => {
    if (category === 'all') {
      return [...new Set(products.map(product => product.brand))]
    }

    // Only show brands from selected category
    const categoryProducts = products.filter(p => p.category === category)

    return [...new Set(categoryProducts.map(product => product.brand))]
  }, [products, category])

  const colors = useMemo(() => {
    const byName = new Map<string, ProductColor>()

    products.forEach(product => product.colors.forEach(color => byName.set(color.name, color)))

    return [...byName.values()]
  }, [products])

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice])
  const [minRating, setMinRating] = useState(0)
  const [minDiscount, setMinDiscount] = useState(0)
  const [isNew, setIsNew] = useState(false)
  const [isPopular, setIsPopular] = useState(false)
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
        (category === 'all' || product.category === category) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color.name))) &&
        product.price >= price[0] &&
        product.price <= price[1] &&
        product.rating >= minRating &&
        product.discount >= minDiscount &&
        (!isNew || product.isNew) &&
        (!isPopular || product.isPopular)
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
  }, [products, category, selectedBrands, selectedColors, price, minRating, minDiscount, isNew, isPopular, sort])

  const pageSize = view === 'grid' ? GRID_PAGE_SIZE : LIST_PAGE_SIZE

  const {
    paginatedItems: paginatedProducts,
    totalPages,
    pageNumbers
  } = usePagination(filteredProducts, pageSize, currentPage)

  const filterProps = {
    categories,
    brands,
    colors,
    minPrice,
    maxPrice,
    filters: {
      category,
      brands: selectedBrands,
      colors: selectedColors,
      price,
      minRating,
      minDiscount,
      isNew,
      isPopular
    },
    onCategoryChange: setCategory,
    onBrandToggle: (brand: string) =>
      setSelectedBrands(current =>
        current.includes(brand) ? current.filter(value => value !== brand) : [...current, brand]
      ),
    onColorToggle: (color: string) =>
      setSelectedColors(current =>
        current.includes(color) ? current.filter(value => value !== color) : [...current, color]
      ),
    onPriceChange: setPrice,
    onMinRatingChange: setMinRating,
    onMinDiscountChange: setMinDiscount,
    onIsNewToggle: () => setIsNew(current => !current),
    onIsPopularToggle: () => setIsPopular(current => !current),
    onClearAll: () => {
      setCategory('all')
      setSelectedBrands([])
      setSelectedColors([])
      setPrice([minPrice, maxPrice])
      setMinRating(0)
      setMinDiscount(0)
      setIsNew(false)
      setIsPopular(false)
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
          <aside className='border-border col-span-1 hidden h-fit rounded-xl border p-4 lg:block'>
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
