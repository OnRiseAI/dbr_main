'use client'

// React Imports
import { useState } from 'react'
import type { ReactElement } from 'react'

// Component Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Props = {
  trigger: ReactElement
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const CurrencyDropdown = ({ defaultOpen, align, trigger }: Props) => {
  const [currency, setCurrency] = useState('usd')

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className='w-40' align={align || 'end'}>
        <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
          <DropdownMenuRadioItem value='usd'>USD</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='eur'>EUR</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='gbp'>GBP</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurrencyDropdown
