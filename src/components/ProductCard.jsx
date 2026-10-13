import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { formatearPrecio } from '../utils/formato'
import './ProductCard.css'

export default function ProductCard({ producto, mostrarDetalles = false }) {
  const agotado = producto.tipo !== 'digital' && producto.stock === 0

  return (
    <article className="producto-card">
      <Link to={`/productos/${producto.id}`} className="producto-card__enlace">
        <ProductImage src={producto.imagen} alt={producto.nombre} />
        <h3 className="producto-card__nombre">{producto.nombre}</h3>
      </Link>
      <p className="producto-card__precio">{formatearPrecio(producto.precio)}</p>
      {mostrarDetalles && (
        <div className="producto-card__detalles">
          <p className="producto-card__descripcion">{producto.descripcion}</p>
          <p className={`producto-card__estado${agotado ? ' producto-card__estado--agotado' : ''}`}>
            {producto.tipo === 'digital' ? 'Producto digital' : agotado ? 'Agotado' : 'Disponible'}
          </p>
        </div>
      )}
    </article>
  )
}
