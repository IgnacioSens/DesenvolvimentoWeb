import { Link } from 'react-router-dom'
import { useCars } from '../hooks/useCars'
import CarGrid from '../components/cars/CarGrid'

const categories = [
  { label: 'SUV',       slug: 'suv',       icon: '🚙' },
  { label: 'Sedan',     slug: 'sedan',     icon: '🚗' },
  { label: 'Hatchback', slug: 'hatchback', icon: '🚘' },
  { label: 'Pickup',    slug: 'pickup',    icon: '🛻' },
  { label: 'Elétrico',  slug: 'eletrico',  icon: '⚡' },
  { label: 'Luxo',      slug: 'luxo',      icon: '💎' },
  { label: 'Esportivo', slug: 'esportivo', icon: '🏎️' },
]

export default function Home() {
  const { cars: trending, loading: loadingTrending } = useCars(undefined, 'most_viewed', 8)
  const { cars: featured, loading: loadingFeatured } = useCars({ }, 'relevance', 8)

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0F2C] text-white">
        <div className="max-w-screen-xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Encontre e compare<br />
            <span className="text-[#E63946]">o carro ideal</span> para você
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Explore centenas de veículos, filtre por categoria, preço e muito mais.
            Compare lado a lado e tome a melhor decisão.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link
              to="/catalogo"
              className="bg-[#E63946] hover:bg-[#cc2f3b] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Ver catálogo
            </Link>
            <Link
              to="/comparar"
              className="border border-white/20 hover:border-white text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Comparar veículos
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categorias ──────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorias</h2>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/catalogo/${cat.slug}`}
              className="flex flex-col items-center gap-2 bg-gray-50 hover:bg-[#E63946]/10 border border-gray-100 hover:border-[#E63946]/30 rounded-2xl p-4 transition-all group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-600 group-hover:text-[#E63946] text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Em Alta ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🔥 Em Alta</h2>
            <Link to="/catalogo" className="text-sm text-[#E63946] hover:underline">
              Ver todos →
            </Link>
          </div>
          <CarGrid cars={trending} loading={loadingTrending} />
        </div>
      </section>

      {/* ── Destaques ───────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Veículos em Destaque</h2>
          <Link to="/catalogo" className="text-sm text-[#E63946] hover:underline">
            Ver todos →
          </Link>
        </div>
        <CarGrid cars={featured} loading={loadingFeatured} />
      </section>
    </div>
  )
}
