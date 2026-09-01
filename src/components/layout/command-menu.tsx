'use client'

// React Imports
import { Fragment, useCallback, useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import { SearchIcon, ShoppingCartIcon, UserIcon, StarIcon, HouseIcon, ShoppingBagIcon } from 'lucide-react'

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

// Data Imports
import { searchData } from '@/assets/data/search'

const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    setSearch('')
    command()
  }, [])

  // Keyboard shortcut listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        // Don't trigger if user is typing in an input
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

  return (
    <>
      {/* Desktop trigger - button with text and shortcut */}
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

      {/* Mobile trigger - icon button */}
      <Button variant='ghost' size='icon-lg' className='lg:hidden' onClick={() => setOpen(true)}>
        <SearchIcon className='size-5.5' />
        <span className='sr-only'>Search</span>
      </Button>

      {/* Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={openState => {
          setOpen(openState)
          if (!openState) setSearch('')
        }}
      >
        <Command
          className='**:[[cmdk-group-heading]]:text-muted-foreground w-full max-w-lg **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 **:[[cmdk-input-wrapper]_svg]:h-5 **:[[cmdk-input-wrapper]_svg]:w-5 **:[[cmdk-input]]:h-12 **:[[cmdk-item]_svg]:h-5 **:[[cmdk-item]_svg]:w-5 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3'
          filter={(value, search) => {
            search = search.toLowerCase()
            value = value.toLowerCase()

            // Exact match with item name (highest priority)
            if (value === search) return 2

            // Partial match with item name (medium priority)
            if (value.includes(search)) return 1.5

            return 0
          }}
        >
          <CommandInput placeholder='Search products, pages...' value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Show filtered results */}
            {search ? (
              searchData.map((searchGroup, index) => (
                <Fragment key={index}>
                  <CommandGroup heading={searchGroup.title}>
                    {searchGroup.data.map((item, i) => (
                      <CommandItem
                        key={i}
                        onSelect={() =>
                          runCommand(() => {
                            if (item.openInNewTab) {
                              window.open(item.href, '_blank', 'noopener,noreferrer')
                            } else {
                              router.push(item.href)
                            }
                          })
                        }
                      >
                        <item.icon />
                        <span>{item.name}</span>
                        {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {index !== searchData.length - 1 && <CommandSeparator />}
                </Fragment>
              ))
            ) : (
              <CommandGroup heading='Suggestions'>
                <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
                  <HouseIcon className='size-4' />
                  <span>Home</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/shop'))}>
                  <ShoppingCartIcon className='size-4' />
                  <span>Shop</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/account/wishlist'))}>
                  <StarIcon className='size-4' />
                  <span>Wishlist</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/account'))}>
                  <UserIcon className='size-4' />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/checkout'))}>
                  <ShoppingBagIcon className='size-4' />
                  <span>Checkout</span>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
