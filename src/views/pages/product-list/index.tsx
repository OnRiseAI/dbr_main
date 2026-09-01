'use client'

// React Imports
import { useMemo, useState } from 'react'

// Type Imports
import type { Product, ProductColor } from '@/types/product'
import type { SortKey } from '@/views/pages/shop/shop-toolbar'
import type { ProductListFilterState } from '@/views/pages/product-list/product-list-toolbar'

// Component Imports
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
import ProductListBanner from '@/views/pages/product-list/product-list-banner'
import ProductListToolbar from '@/views/pages/product-list/product-list-toolbar'

// Hook Imports
import { usePagination } from '@/hooks/use-pagination'

type Props = {
  products: Product[]
}

const GRID_PAGE_SIZE = 12
const LIST_PAGE_SIZE = 10

const ProductListView = ({ products }: Props) => {
  const minPrice = useMemo(() => Math.floor(Math.min(...products.map(p => p.price))), [products])
  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map(p => p.price))), [products])

  const categories = useMemo(
    () => [...new Set(products.map(product => product.category).filter((value): value is string => Boolean(value)))],
    [products]
  )

  const brands = useMemo(() => [...new Set(products.map(product => product.brand))], [products])

  const colors = useMemo(() => {
    const byName = new Map<string, ProductColor>()

    products.forEach(product => product.colors.forEach(color => byName.set(color.name, color)))

    return [...byName.values()]
  }, [products])

  const [category, setCategory] = useState('all')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice])
  const [sort, setSort] = useState<SortKey>('recommended')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)

  const filters: ProductListFilterState = { category, brands: selectedBrands, colors: selectedColors, price }

  const filteredProducts = useMemo(() => {
    const list = products.filter(
      product =>
        (category === 'all' || product.category === category) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color.name))) &&
        product.price >= price[0] &&
        product.price <= price[1]
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
  }, [products, category, selectedBrands, selectedColors, price, sort])

  const pageSize = view === 'grid' ? GRID_PAGE_SIZE : LIST_PAGE_SIZE

  const {
    paginatedItems: paginatedProducts,
    totalPages,
    pageNumbers
  } = usePagination(filteredProducts, pageSize, currentPage)

  const onClearAll = () => {
    setCategory('all')
    setSelectedBrands([])
    setSelectedColors([])
    setPrice([minPrice, maxPrice])
  }

  return (
    <section>
      <ProductListBanner onSelectCategory={setCategory} />

      <ContentLayout className='space-y-8 py-8 lg:py-14'>
        <ProductListToolbar
          categories={categories}
          brands={brands}
          colors={colors}
          minPrice={minPrice}
          maxPrice={maxPrice}
          filters={filters}
          onCategoryChange={setCategory}
          onBrandToggle={brand =>
            setSelectedBrands(current =>
              current.includes(brand) ? current.filter(value => value !== brand) : [...current, brand]
            )
          }
          onColorToggle={color =>
            setSelectedColors(current =>
              current.includes(color) ? current.filter(value => value !== color) : [...current, color]
            )
          }
          onPriceChange={setPrice}
          onClearAll={onClearAll}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={v => {
            setView(v)
            setCurrentPage(1)
          }}
        />

        {filteredProducts.length === 0 ? (
          <p className='text-muted-foreground py-16 text-center'>No products match your filters.</p>
        ) : (
          <>
            {view === 'grid' ? (
              <div className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {paginatedProducts.map(product => {
                  const badges = [
                    product.isNew ? { label: 'New', variant: 'new' as const } : null,
                    product.showDiscountBadge
                      ? { label: `${product.discount}% OFF`, variant: 'destructive' as const }
                      : null
                  ].filter((b): b is NonNullable<typeof b> => b !== null)

                  return (
                    <ProductCard key={product.id} product={product} badges={badges.length > 0 ? badges : undefined} />
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
                        <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page as number)}>
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
      </ContentLayout>
    </section>
  )
}

export { ProductListView }
export default ProductListView
