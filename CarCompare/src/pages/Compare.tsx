import { Link } from 'react-router-dom'
import { useCompare } from '../context/CompareContext'
import CompareTable from '../components/compare/CompareTable'

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useCompare()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comparar Veículos</h1>
          <p className="text-gray-500 mt-1">
            {compareList.length === 0
              ? 'Nenhum veículo adicionado.'
              : `${compareList.length} veículo${compareList.length > 1 ? 's' : ''} selecionado${compareList.length > 1 ? 's' : ''}`
            }
          </p>
        </div>
        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-sm text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-4 py-2 rounded-lg transition-colors"
          >
            Limpar todos
          </button>
        )}
      </div>

      {/* Estado vazio */}
      {compareList.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-6xl mb-4">🚗</p>
          <p className="text-xl font-medium mb-2">Nenhum veículo para comparar</p>
          <p className="text-sm mb-8">Adicione veículos pelo catálogo usando o botão "+ Comparar"</p>
          <Link
            to="/catalogo"
            className="bg-[#E63946] hover:bg-[#cc2f3b] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Ir ao catálogo
          </Link>
        </div>
      ) : (
        <CompareTable cars={compareList} onRemove={removeFromCompare} />
      )}
    </div>
  )
}
