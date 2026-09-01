// React Imports
import { useMemo } from 'react'

export const usePagination = <T>(items: T[], pageSize: number, currentPage: number) => {
  const totalPages = Math.ceil(items.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedItems = items.slice(startIndex, startIndex + pageSize)

  const pageNumbers = useMemo((): (number | string)[] => {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i)
      }
    }

    range.forEach((i, idx) => {
      if (idx > 0 && i - range[idx - 1]! > 1) {
        rangeWithDots.push('...')
      }

      rangeWithDots.push(i)
    })

    return rangeWithDots
  }, [totalPages, currentPage])

  return {
    paginatedItems,
    totalPages,
    pageNumbers
  }
}
