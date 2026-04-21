import { Link } from 'react-router-dom'

const categories = ['SUV', 'Sedan', 'Hatchback', 'Pickup', 'Elétrico', 'Luxo', 'Esportivo']

export default function Footer() {
  return (
    <footer className="bg-[#0A0F2C] text-gray-400 pt-12 pb-6 mt-16">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">

        {/* Marca */}
        <div>
          <p className="text-white font-bold text-xl mb-3">
            Car<span className="text-[#E63946]">Compare</span>
          </p>
          <p className="text-sm leading-relaxed">
            Encontre, compare e escolha o veículo ideal com facilidade. Seu próximo carro começa aqui.
          </p>
        </div>

        {/* Categorias */}
        <div>
          <p className="text-white font-semibold mb-3">Categorias</p>
          <ul className="space-y-2 text-sm">
            {categories.map(cat => (
              <li key={cat}>
                <Link
                  to={`/catalogo/${cat.toLowerCase().replace('é', 'e')}`}
                  className="hover:text-white transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <p className="text-white font-semibold mb-3">Links úteis</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/"         className="hover:text-white transition-colors">Início</Link></li>
            <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo</Link></li>
            <li><Link to="/comparar" className="hover:text-white transition-colors">Comparar veículos</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 pt-6 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} CarCompare. Projeto acadêmico.
      </div>
    </footer>
  )
}
