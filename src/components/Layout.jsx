import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// Layout compartido: Header y Footer fijos, y cada página se dibuja en <Outlet />
export default function Layout() {
  const { pathname } = useLocation()

  // Efecto secundario: al cambiar de ruta, volver arriba de la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
