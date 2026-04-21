import CarCard from './CarCard'
import type { Car } from '../../types/car'

interface CarGridProps {
  cars: Car[]
  loading?: boolean
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-9 bg-gray-200 rounded-lg flex-1" />
          <div className="h-9 bg-gray-200 rounded-lg flex-1" />
        </div>
      </div>
    </div>
  )
}

export default function CarGrid({ cars, loading }: CarGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (!cars.length) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-5xl mb-4">🚗</p>
        <p className="text-lg font-medium">Nenhum veículo encontrado.</p>
        <p className="text-sm mt-1">Tente ajustar os filtros.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map(car => <CarCard key={car.id} car={car} />)}
    </div>
  )
}
