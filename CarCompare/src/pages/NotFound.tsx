import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-8xl font-bold text-gray-100">404</p>
      <h1 className="text-2xl font-bold text-gray-900 -mt-4 mb-2">Página não encontrada</h1>
      <p className="text-gray-500 mb-8">O endereço que você acessou não existe.</p>
      <Link
        to="/"
        className="bg-[#E63946] hover:bg-[#cc2f3b] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
