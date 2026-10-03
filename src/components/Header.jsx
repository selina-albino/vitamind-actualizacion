import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/productos', texto: 'Productos' },
  { to: '/blog', texto: 'Blog' },
  { to: '/contacto', texto: 'Contacto' },
]

export default function Header() {
  return (
    <header className="header">
      <div className="contenedor header__fila">
        <Link to="/" className="header__logo">
          Vita<span>mind</span>
        </Link>

        <nav aria-label="Principal" className="header__nav">
          <ul>
            {enlaces.map((e) => (
              <li key={e.to}>
                <NavLink to={e.to} end={e.to === '/'}>{e.texto}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/carrito" className="header__carrito">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 7h12l-1 13H7L6 7Z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          <span className="visualmente-oculto">Carrito</span>
        </Link>
      </div>
    </header>
  )
}
