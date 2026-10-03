import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <NavLink to="/">VitaMind</NavLink>
      <nav>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/carrito">Carrito</NavLink>
      </nav>
    </header>
  )
}
