import { Link } from 'react-router-dom'
import { useCompare } from '../../context/CompareContext'
import type { Car } from '../../types/car'

const categoryLabel: Record<string, string> = {
  suv: 'SUV', sedan: 'Sedan', hatchback: 'Hatchback',
  pickup: 'Pickup', eletrico: 'Elétrico', luxo: 'Luxo', esportivo: 'Esportivo',
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare()
  const inCompare = isInCompare(car.id)

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">

      {/* Imagem */}
      <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3 12l2-5h14l2 5M3 12h18" />
            </svg>
          </div>
        )}

        {/* Badge categoria */}
        <span className="absolute top-3 left-3 bg-[#0A0F2C]/80 text-white text-xs font-medium px-2 py-1 rounded-full">
          {categoryLabel[car.category] ?? car.category}
        </span>

        {/* Badge trending */}
        {car.view_count > 100 && (
          <span className="absolute top-3 right-3 bg-[#E63946] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            🔥 Em alta
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1 gap-3">

        {/* Título */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">{car.brand}</p>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{car.model}</h3>
          <p className="text-sm text-gray-500">{car.year}</p>
        </div>

        {/* Specs rápidos */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">⚙️ {car.engine ?? '—'}</span>
          <span className="flex items-center gap-1">⛽ {car.fuel_type}</span>
          <span className="flex items-center gap-1">👥 {car.seats}</span>
        </div>

        {/* Preço */}
        <p className="text-[#E63946] font-bold text-xl mt-auto">
          {formatPrice(car.price)}
        </p>

        {/* Botões */}
        <div className="flex gap-2 mt-1">
          <Link
            to={`/veiculo/${car.id}`}
            className="flex-1 text-center bg-[#0A0F2C] hover:bg-[#0f1535] text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Ver detalhes
          </Link>
          <button
            onClick={() => inCompare ? removeFromCompare(car.id) : addToCompare(car)}
            className={`flex-1 text-sm font-medium py-2 rounded-lg border transition-colors ${
              inCompare
                ? 'bg-[#E63946] text-white border-[#E63946]'
                : 'bg-white text-[#E63946] border-[#E63946] hover:bg-[#E63946] hover:text-white'
            }`}
          >
            {inCompare ? '✓ Comparando' : '+ Comparar'}
          </button>
        </div>
      </div>
    </div>
  )
}
