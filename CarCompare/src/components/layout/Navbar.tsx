import { Link, NavLink } from 'react-router-dom'
import { useCompare } from '../../context/CompareContext'

const categories = [
  { label: 'SUV',        slug: 'suv' },
  { label: 'Sedan',      slug: 'sedan' },
  { label: 'Hatchback',  slug: 'hatchback' },
  { label: 'Pickup',     slug: 'pickup' },
  { label: 'Elétrico',   slug: 'eletrico' },
  { label: 'Luxo',       slug: 'luxo' },
  { label: 'Esportivo',  slug: 'esportivo' },
]

export default function Navbar() {
  const { compareList } = useCompare()

  return (
    <header className="w-full h-[70px] bg-[#0A0F2C] sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto h-full px-6 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="text-white font-bold text-2xl tracking-tight shrink-0">
          Car<span className="text-[#E63946]">Compare</span>
        </Link>

        {/* Menu central */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <NavLink to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors ${isActive ? 'text-[#E63946]' : 'text-gray-300 hover:text-white'}`
            }
          >
            Início
          </NavLink>

          {/* Dropdown Categorias */}
          <div className="relative group">
            <button className="px-3 py-2 rounded-md text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              Categorias
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/catalogo/${cat.slug}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#E63946] transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/catalogo"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors ${isActive ? 'text-[#E63946]' : 'text-gray-300 hover:text-white'}`
            }
          >
            Catálogo
          </NavLink>
        </nav>

        {/* Lado direito */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Busca */}
          <div className="hidden md:flex items-center bg-white/10 rounded-lg px-3 py-2 gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar veículo..."
              className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-40"
            />
          </div>

          {/* Botão Comparar */}
          <Link
            to="/comparar"
            className="relative flex items-center gap-2 bg-[#E63946] hover:bg-[#cc2f3b] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2z" />
            </svg>
            Comparar
            {compareList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#E63946] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
