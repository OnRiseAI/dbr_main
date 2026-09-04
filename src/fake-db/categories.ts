import type { Category } from '@/types/product'
import raw from './dbr-categories.json'

export const db = raw as Category[]
