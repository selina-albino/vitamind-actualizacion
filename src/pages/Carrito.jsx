import { Link } from 'react-router-dom'
import ProductImage from '../components/ProductImage'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'
import './Carrito.css'

export default function Carrito() {
  const { items, cambiarCantidad, quitar, total } = useCarrito()

  if (items.length === 0) {
    return (
      <section className="contenedor carrito">
        <h1>Tu carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos" className="boton boton--acento">Ver productos</Link>
      </section>
    )
  }

  return (
    <section className="contenedor carrito">
      <h1>Tu carrito</h1>

      <ul className="carrito__lista">
        {items.map((item) => (
          <li key={item.id} className="carrito__item">
            <ProductImage src={item.imagen} alt={item.nombre} className="carrito__imagen" />
            <div>
              <h2 className="carrito__nombre">
                <Link to={`/productos/${item.id}`}>{item.nombre}</Link>
              </h2>
              <p>{formatearPrecio(item.precio)} c/u</p>
            </div>
            <div className="carrito__cantidad" role="group" aria-label={`Cantidad de ${item.nombre}`}>
              <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} aria-label="Restar uno">−</button>
              <output>{item.cantidad}</output>
              <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} aria-label="Sumar uno">+</button>
            </div>
            <p className="carrito__subtotal">{formatearPrecio(item.precio * item.cantidad)}</p>
            <button type="button" className="carrito__quitar" onClick={() => quitar(item.id)}>
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="carrito__resumen">
        <p>
          Total: <strong>{formatearPrecio(total)}</strong>
        </p>
        <Link to="/checkout" className="boton boton--primario">Ir a pagar</Link>
      </div>
    </section>
  )
}
