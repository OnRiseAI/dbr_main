// Type Imports
import type { Address } from '@/types/addresses'

export const addressesData: Address[] = [
  {
    id: 'address-1',
    title: 'Home',
    isDefault: true,
    lines: ['Carlyle Hall', '25 Union Square W,', 'New York, NY 10003, USA'],
    fullAddress: 'Carlyle Hall, 25 Union Square W, New York, NY 10003, USA',
    street: '25 Union Square W',
    city: 'New York',
    state: 'NY',
    zipCode: '10003',
    country: 'USA'
  },
  {
    id: 'address-2',
    title: 'Office',
    isDefault: false,
    lines: ['Parkside Residence', '1B East 16th Street, Apt 7C', 'New York, NY 10003, USA'],
    fullAddress: 'Parkside Residence, 1B East 16th Street, Apt 7C, New York, NY 10003, USA',
    street: '1B East 16th Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10003',
    country: 'USA'
  },
  {
    id: 'address-3',
    title: 'Home 2',
    isDefault: false,
    lines: ['Union Square Office', '25 Union Square West, Floor 5', 'New York, NY 10003, USA'],
    fullAddress: 'Union Square Office, 25 Union Square West, Floor 5, New York, NY 10003, USA',
    street: '25 Union Square West',
    city: 'New York',
    state: 'NY',
    zipCode: '10003',
    country: 'USA'
  }
]
