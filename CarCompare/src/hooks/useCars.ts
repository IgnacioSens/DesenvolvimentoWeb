import { useState, useEffect } from 'react'
import type { Car, CarFilters, SortOption } from '../types/car'
import { getCars } from '../services/carService'

interface UseCarsResult {
  cars:    Car[]
  loading: boolean
  error:   string | null
  total:   number
  page:    number
  setPage: (p: number) => void
}

export function useCars(
  filters?: CarFilters,
  sort: SortOption = 'relevance',
  limit = 12
): UseCarsResult {
  const [cars,    setCars]    = useState<Car[]>([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(1)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getCars(filters, sort, page, limit)
      .then(({ data, count }) => {
        if (!cancelled) {
          setCars(data)
          setTotal(count)
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message ?? 'Erro ao carregar veículos')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [filters, sort, page, limit])

  return { cars, loading, error, total, page, setPage }
}
