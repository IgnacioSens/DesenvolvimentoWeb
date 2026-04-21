import type { CarFilters, CarCategory, FuelType } from '../../types/car'

const categories: { label: string; value: CarCategory }[] = [
  { label: 'SUV',       value: 'suv' },
  { label: 'Sedan',     value: 'sedan' },
  { label: 'Hatchback', value: 'hatchback' },
  { label: 'Pickup',    value: 'pickup' },
  { label: 'Elétrico',  value: 'eletrico' },
  { label: 'Luxo',      value: 'luxo' },
  { label: 'Esportivo', value: 'esportivo' },
]

const fuels: { label: string; value: FuelType }[] = [
  { label: 'Flex',      value: 'flex' },
  { label: 'Gasolina',  value: 'gasolina' },
  { label: 'Etanol',    value: 'etanol' },
  { label: 'Diesel',    value: 'diesel' },
  { label: 'Elétrico',  value: 'eletrico' },
  { label: 'Híbrido',   value: 'hibrido' },
]

interface FilterSidebarProps {
  filters: CarFilters
  onChange: (filters: CarFilters) => void
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  function update(patch: Partial<CarFilters>) {
    onChange({ ...filters, ...patch })
  }

  function clear() {
    onChange({})
  }

  return (
    <aside className="w-[260px] shrink-0 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Filtros</h2>
        <button onClick={clear} className="text-xs text-[#E63946] hover:underline">
          Limpar tudo
        </button>
      </div>

      {/* Categoria */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Categoria</p>
        <div className="space-y-1">
          {categories.map(cat => (
            <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.value}
                checked={filters.category === cat.value}
                onChange={() => update({ category: cat.value })}
                className="accent-[#E63946]"
              />
              <span className="text-sm text-gray-600">{cat.label}</span>
            </label>
          ))}
          {filters.category && (
            <button
              onClick={() => update({ category: undefined })}
              className="text-xs text-gray-400 hover:text-[#E63946] mt-1"
            >
              Remover filtro
            </button>
          )}
        </div>
      </div>

      {/* Combustível */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Combustível</p>
        <div className="space-y-1">
          {fuels.map(f => (
            <label key={f.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="fuel"
                value={f.value}
                checked={filters.fuel_type === f.value}
                onChange={() => update({ fuel_type: f.value })}
                className="accent-[#E63946]"
              />
              <span className="text-sm text-gray-600">{f.label}</span>
            </label>
          ))}
          {filters.fuel_type && (
            <button
              onClick={() => update({ fuel_type: undefined })}
              className="text-xs text-gray-400 hover:text-[#E63946] mt-1"
            >
              Remover filtro
            </button>
          )}
        </div>
      </div>

      {/* Faixa de preço */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Preço máximo</p>
        <input
          type="range"
          min={10000}
          max={500000}
          step={5000}
          value={filters.max_price ?? 500000}
          onChange={e => update({ max_price: Number(e.target.value) })}
          className="w-full accent-[#E63946]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Até {(filters.max_price ?? 500000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>

      {/* Ano */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Ano mínimo</p>
        <input
          type="number"
          min={2000}
          max={new Date().getFullYear()}
          placeholder="Ex: 2018"
          value={filters.min_year ?? ''}
          onChange={e => update({ min_year: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E63946]"
        />
      </div>
    </aside>
  )
}
