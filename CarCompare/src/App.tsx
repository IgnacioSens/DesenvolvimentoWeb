import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CompareProvider } from './context/CompareContext'

import Layout   from './components/layout/Layout'
import Home     from './pages/Home'
import Catalog  from './pages/Catalog'
import CarDetail from './pages/CarDetail'
import Compare  from './pages/Compare'
import NotFound from './pages/NotFound'

function App() {
  return (
    <CompareProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index                      element={<Home />} />
            <Route path="catalogo"            element={<Catalog />} />
            <Route path="catalogo/:categoria" element={<Catalog />} />
            <Route path="veiculo/:id"         element={<CarDetail />} />
            <Route path="comparar"            element={<Compare />} />
            <Route path="*"                   element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CompareProvider>
  )
}

export default App
