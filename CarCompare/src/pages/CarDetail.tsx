import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCarById, getSimilarCars } from '../services/carService'
import { useCompare } from '../context/CompareContext'
import CarGrid from '../components/cars/CarGrid'
import type { Car } from '../types/car'

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CarDetail() {
  const { id } = useParams<{ id: string }>()
  const { addToCompare, removeFromCompare, isInCompare } = useCompare()

  const [car,     setCar]     = useState<Car | null>(null)
  const [similar, setSimilar] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [tab,     setTab]     = useState<'descricao' | 'specs'>('descricao')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getCarById(id)
      .then(data => {
        setCar(data)
        if (data) return getSimilarCars(data)
        return []
      })
      .then(setSimilar)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="max-w-screen-xl mx-auto px-6 py-20 text-center text-gray-400">
      Carregando...
    </div>
  )

  if (error || !car) return (
    <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
      <p className="text-red-500 mb-4">{error ?? 'Veículo não encontrado.'}</p>
      <Link to="/catalogo" className="text-[#E63946] underline">← Voltar ao catálogo</Link>
    </div>
  )

  const inCompare = isInCompare(car.id)

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex gap-2">
        <Link to="/" className="hover:text-[#E63946]">Início</Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-[#E63946]">Catálogo</Link>
        <span>/</span>
        <span className="text-gray-700">{car.brand} {car.model}</span>
      </nav>

      {/* Conteúdo principal — 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

        {/* Galeria */}
        <div className="space-y-3">
          <div className="w-full h-80 bg-gray-100 rounded-2xl overflow-hidden">
            {car.image_url
              ? <img src={car.image_url} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">🚗</div>
            }
          </div>
          {car.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {car.images.map((img, i) => (
                <img key={i} src={img} alt="" className="w-20 h-14 object-cover rounded-lg shrink-0 cursor-pointer hover:opacity-80 transition-opacity" />
              ))}
            </div>
          )}
        </div>

        {/* Ficha */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">{car.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900">{car.model}</h1>
            <p className="text-gray-500">{car.year} · {car.category}</p>
          </div>

          <p className="text-4xl font-bold text-[#E63946]">{formatPrice(car.price)}</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['⚙️ Motor',       car.engine],
              ['⛽ Combustível',  car.fuel_type],
              ['🔄 Câmbio',      car.transmission],
              ['👥 Assentos',    String(car.seats)],
              ['🎨 Cor',         car.color],
              ['📍 KM',          car.mileage?.toLocaleString('pt-BR')],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="font-medium text-gray-800 capitalize">{value ?? '—'}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => inCompare ? removeFromCompare(car.id) : addToCompare(car)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                inCompare
                  ? 'bg-[#E63946] text-white'
                  : 'border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white'
              }`}
            >
              {inCompare ? '✓ Adicionado para comparar' : '+ Comparar'}
            </button>
            <Link
              to="/comparar"
              className="px-6 py-3 bg-[#0A0F2C] text-white rounded-xl font-semibold hover:bg-[#0f1535] transition-colors"
            >
              Ver comparação
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex gap-6">
        {(['descricao', 'specs'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'border-[#E63946] text-[#E63946]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'descricao' ? 'Descrição' : 'Especificações'}
          </button>
        ))}
      </div>

      {tab === 'descricao' && (
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {car.description ?? 'Sem descrição disponível.'}
        </p>
      )}
      {tab === 'specs' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
          {[
            ['Marca',        car.brand],
            ['Modelo',       car.model],
            ['Ano',          String(car.year)],
            ['Motor',        car.engine],
            ['Combustível',  car.fuel_type],
            ['Câmbio',       car.transmission],
            ['Assentos',     String(car.seats)],
            ['Cor',          car.color],
            ['Quilometragem', car.mileage?.toLocaleString('pt-BR') + ' km'],
          ].map(([label, value]) => (
            <div key={label} className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="font-medium text-gray-800 capitalize mt-1">{value ?? '—'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Similares */}
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Veículos Similares</h2>
          <CarGrid cars={similar} />
        </section>
      )}
    </div>
  )
}
