import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Blog from './pages/Blog'
import DetallePost from './pages/DetallePost'
import Contacto from './pages/Contacto'
import NoEncontrado from './pages/NoEncontrado'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta padre con layout compartido; las hijas se muestran en <Outlet /> */}
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="productos">
            <Route index element={<Productos />} />
            <Route path=":id" element={<DetalleProducto />} />
          </Route>
          <Route path="carrito" element={<Carrito />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="blog">
            <Route index element={<Blog />} />
            <Route path=":id" element={<DetallePost />} />
          </Route>
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
