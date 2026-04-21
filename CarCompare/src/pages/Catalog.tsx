import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCars } from '../hooks/useCars'
import CarGrid from '../components/cars/CarGrid'
import FilterSidebar from '../components/cars/FilterSidebar'
import type { CarFilters, SortOption, CarCategory } from '../types/car'

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Relevância',    value: 'relevance' },
  { label: 'Menor preço',   value: 'price_asc' },
  { label: 'Maior preço',   value: 'price_desc' },
  { label: 'Mais recente',  value: 'year_desc' },
  { label: 'Mais vistos',   value: 'most_viewed' },
]

const categoryLabel: Record<string, string> = {
  suv: 'SUV', sedan: 'Sedan', hatchback: 'Hatchback',
  pickup: 'Pickup', eletrico: 'Elétrico', luxo: 'Luxo', esportivo: 'Esportivo',
}

export default function Catalog() {
  const { categoria } = useParams<{ categoria?: string }>()

  const [sort, setSort] = useState<SortOption>('relevance')
  const [filters, setFilters] = useState<CarFilters>({
    category: categoria as CarCategory | undefined,
  })

  const { cars, loading, error, total, page, setPage } = useCars(filters, sort)
  const totalPages = Math.ceil(total / 12)

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {categoria ? categoryLabel[categoria] ?? categoria : 'Catálogo de Veículos'}
        </h1>
        <p className="text-gray-500 mt-1">{total} veículo{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <FilterSidebar filters={filters} onChange={setFilters} />

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">

          {/* Barra de ordenação */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">{total} resultados</p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Ordenar:</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E63946]"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Grid */}
          <CarGrid cars={cars} loading={loading} />

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40 hover:border-[#E63946] transition-colors"
              >
                ← Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? 'bg-[#E63946] text-white'
                      : 'border hover:border-[#E63946]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40 hover:border-[#E63946] transition-colors"
              >
                Próxima →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
