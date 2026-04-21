import { Link } from 'react-router-dom'
import type { Car } from '../../types/car'

const specs: { label: string; key: keyof Car; format?: (v: unknown) => string }[] = [
  { label: 'Preço',        key: 'price',        format: v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
  { label: 'Ano',          key: 'year' },
  { label: 'Motor',        key: 'engine' },
  { label: 'Combustível',  key: 'fuel_type' },
  { label: 'Câmbio',       key: 'transmission' },
  { label: 'Assentos',     key: 'seats' },
  { label: 'Cor',          key: 'color' },
]

interface CompareTableProps {
  cars: Car[]
  onRemove: (carId: string) => void
}

export default function CompareTable({ cars, onRemove }: CompareTableProps) {
  const MAX = 4
  const slots = Array.from({ length: MAX })

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-36 p-4 text-left text-sm text-gray-400 font-medium">Especificação</th>
            {slots.map((_, i) => {
              const car = cars[i]
              return (
                <th key={i} className="p-4 text-center align-top">
                  {car ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-32 bg-gray-100 rounded-xl overflow-hidden">
                        {car.image_url
                          ? <img src={car.image_url} alt={car.model} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🚗</div>
                        }
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{car.brand} {car.model}</p>
                      <button
                        onClick={() => onRemove(car.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/catalogo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-[#E63946] hover:text-[#E63946] transition-colors gap-2"
                    >
                      <span className="text-2xl">+</span>
                      <span className="text-xs">Adicionar</span>
                    </Link>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, si) => {
            const values = cars.map(c => c[spec.key])
            const nums = values.map(v => typeof v === 'number' ? v : null).filter(v => v !== null) as number[]
            const best = nums.length ? Math.min(...nums) : null

            return (
              <tr key={spec.key} className={si % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 text-sm font-medium text-gray-600">{spec.label}</td>
                {slots.map((_, i) => {
                  const car = cars[i]
                  const raw = car ? car[spec.key] : null
                  const display = raw != null
                    ? (spec.format ? spec.format(raw) : String(raw))
                    : '—'
                  const isBest = best !== null && typeof raw === 'number' && raw === best

                  return (
                    <td
                      key={i}
                      className={`p-4 text-center text-sm ${
                        car ? (isBest ? 'text-green-600 font-semibold' : 'text-gray-700') : 'text-gray-300'
                      }`}
                    >
                      {display}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
