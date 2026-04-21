import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Car } from '../types/car'

const MAX_COMPARE = 4

interface CompareContextType {
  compareList: Car[]
  addToCompare:      (car: Car) => void
  removeFromCompare: (carId: string) => void
  isInCompare:       (carId: string) => boolean
  clearCompare:      () => void
}

const CompareContext = createContext<CompareContextType | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Car[]>([])

  function addToCompare(car: Car) {
    if (compareList.length >= MAX_COMPARE) return
    if (isInCompare(car.id)) return
    setCompareList(prev => [...prev, car])
  }

  function removeFromCompare(carId: string) {
    setCompareList(prev => prev.filter(c => c.id !== carId))
  }

  function isInCompare(carId: string) {
    return compareList.some(c => c.id === carId)
  }

  function clearCompare() {
    setCompareList([])
  }

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare deve ser usado dentro de <CompareProvider>')
  return ctx
}
