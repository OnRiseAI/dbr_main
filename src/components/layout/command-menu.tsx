'use client'

// React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import { SearchIcon } from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'

// Store Imports
import { useProductsStore } from '@/store/use-products-store'

// Data Imports
import { searchData } from '@/assets/data/search'

// Utils Imports
import { familyTitle, formatMeta, formatPrice } from '@/utils/product-utils'

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Every word typed must appear somewhere in the product's searchable text. */
const productHaystack = (p: Product) =>
  norm([p.name, p.familyName ?? '', p.variantLabel ?? '', p.category, p.description ?? '', formatMeta(p), p.id].join(' '))

const matches = (haystack: string, query: string) => {
  const words = norm(query).split(' ').filter(Boolean)

  return words.length > 0 && words.every(w => haystack.includes(w))
}

/**
 * Header search: products from the live catalogue first, then the shop's pages.
 * Ctrl/Cmd+K or "/" opens it anywhere.
 */
const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const products = useProductsStore(state => state.products)

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    setSearch('')
    command()
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [])

  const productHits = useMemo(() => {
    const visible = products.filter(p => !p.hiddenVariant)

    if (!search.trim()) return visible.slice(0, 6)

    return visible.filter(p => matches(productHaystack(p), search)).slice(0, 8)
  }, [products, search])

  const pageHits = useMemo(
    () =>
      searchData.map(group => ({
        ...group,
        data: search.trim() ? group.data.filter(item => matches(norm(`${item.name} ${item.keywords ?? ''}`), search)) : group.data.slice(0, 4)
      })),
    [search]
  )

  const nothing = productHits.length === 0 && pageHits.every(g => g.data.length === 0)

  return (
    <>
      <Button
        variant='outline'
        className='text-muted-foreground hidden h-9 w-62.5 justify-between gap-2 rounded-md font-normal lg:flex'
        onClick={() => setOpen(true)}
      >
        <span className='flex items-center gap-2'>
          <SearchIcon className='size-4' />
          <span>Search products...</span>
        </span>
        <CommandShortcut className='text-xs'>⌘K</CommandShortcut>
      </Button>

      <Button variant='ghost' size='icon-lg' className='lg:hidden' onClick={() => setOpen(true)}>
        <SearchIcon className='size-5.5' />
        <span className='sr-only'>Search</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={openState => {
          setOpen(openState)
          if (!openState) setSearch('')
        }}
      >
        <Command
          shouldFilter={false}
          className='**:[[cmdk-group-heading]]:text-muted-foreground w-full max-w-lg **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 **:[[cmdk-input-wrapper]_svg]:h-5 **:[[cmdk-input-wrapper]_svg]:w-5 **:[[cmdk-input]]:h-12 **:[[cmdk-item]_svg]:h-5 **:[[cmdk-item]_svg]:w-5 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3'
        >
          <CommandInput placeholder='Search products, pages...' value={search} onValueChange={setSearch} />
          <CommandList>
            {nothing ? <CommandEmpty>No results for “{search}”.</CommandEmpty> : null}

            {productHits.length > 0 && (
              <CommandGroup heading={search.trim() ? 'Products' : 'Popular products'}>
                {productHits.map(product => (
                  <CommandItem key={product.id} value={product.id} onSelect={() => runCommand(() => router.push(product.href))}>
                    <img src={product.image} alt='' className='size-9 shrink-0 rounded-md bg-white object-contain ring-1 ring-border' />
                    <span className='flex min-w-0 flex-1 flex-col'>
                      <span className='truncate font-medium'>
                        {familyTitle(product)}
                        {product.variantLabel ? <span className='text-muted-foreground font-normal'> · {product.variantLabel}</span> : null}
                      </span>
                      <span className='text-muted-foreground truncate text-xs'>
                        {formatMeta(product)} · {product.category}
                      </span>
                    </span>
                    <span className='shrink-0 text-sm font-medium'>{formatPrice(product.price)}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {pageHits.map(group =>
              group.data.length > 0 ? (
                <div key={group.title}>
                  {productHits.length > 0 ? <CommandSeparator /> : null}
                  <CommandGroup heading={group.title}>
                    {group.data.map(item => (
                      <CommandItem
                        key={item.href}
                        value={item.href}
                        onSelect={() =>
                          runCommand(() => {
                            if (item.openInNewTab) window.open(item.href, '_blank', 'noopener,noreferrer')
                            else router.push(item.href)
                          })
                        }
                      >
                        <item.icon />
                        <span>{item.name}</span>
                        {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              ) : null
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
