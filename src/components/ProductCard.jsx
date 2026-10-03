import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { formatearPrecio } from '../utils/formato'
import './ProductCard.css'

export default function ProductCard({ producto }) {
  return (
    <article className="producto-card">
      <Link to={`/productos/${producto.id}`} className="producto-card__enlace">
        <ProductImage src={producto.imagen} alt={producto.nombre} />
        <h3 className="producto-card__nombre">{producto.nombre}</h3>
      </Link>
      <p className="producto-card__precio">{formatearPrecio(producto.precio)}</p>
    </article>
  )
}
