// Type Imports
import type { Address } from '@/types/addresses'

/** Demo addresses until the account database is wired in. */
export const addressesData: Address[] = [
  {
    id: 'address-1',
    title: 'Home',
    isDefault: true,
    lines: ['Anna Mustermann', 'Musterstrasse 12', '10115 Berlin, Germany'],
    fullAddress: 'Anna Mustermann, Musterstrasse 12, 10115 Berlin, Germany',
    street: 'Musterstrasse 12',
    city: 'Berlin',
    state: 'Berlin',
    zipCode: '10115',
    country: 'Germany'
  },
  {
    id: 'address-2',
    title: 'Work',
    isDefault: false,
    lines: ['Anna Mustermann', 'Beispielweg 4, 3. OG', '80331 Munich, Germany'],
    fullAddress: 'Anna Mustermann, Beispielweg 4, 3. OG, 80331 Munich, Germany',
    street: 'Beispielweg 4',
    city: 'Munich',
    state: 'Bavaria',
    zipCode: '80331',
    country: 'Germany'
  }
]
