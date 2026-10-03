import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage'
import productos from '../data/productos.json'
import { formatearPrecio } from '../utils/formato'
import './DetalleProducto.css'

export default function DetalleProducto() {
  const { id } = useParams()
  const producto = productos.find((p) => p.id === Number(id))
  const [cantidad, setCantidad] = useState(1)

  if (!producto) {
    return (
      <section className="contenedor detalle">
        <h1>Producto no encontrado</h1>
        <Link to="/productos" className="boton boton--primario">Volver a productos</Link>
      </section>
    )
  }

  const esDigital = producto.tipo === 'digital'
  const agotado = !esDigital && producto.stock === 0
  const maximo = esDigital ? 1 : producto.stock

  function agregarAlCarrito() {
    // Sprint 2 (HU04): conectar con el contexto del carrito.
    console.log('Agregar al carrito', producto.id, cantidad)
  }

  return (
    <div className="contenedor detalle">
      <ProductImage src={producto.imagen} alt={producto.nombre} className="detalle__imagen" />

      <section className="detalle__info" aria-labelledby="producto-nombre">
        <h1 id="producto-nombre">{producto.nombre}</h1>
        <p className="detalle__precio">{formatearPrecio(producto.precio)}</p>

        <p className={agotado ? 'detalle__estado detalle__estado--agotado' : 'detalle__estado'}>
          {esDigital && '⬇ Producto digital: descarga después de la compra'}
          {!esDigital && !agotado && `✓ Disponible (${producto.stock} en stock)`}
          {agotado && '✕ Agotado'}
        </p>

        {!esDigital && (
          <div className="cantidad">
            <span id="cantidad-label">Cantidad</span>
            <div className="cantidad__control" role="group" aria-labelledby="cantidad-label">
              <button type="button" onClick={() => setCantidad((c) => c - 1)} disabled={cantidad <= 1 || agotado} aria-label="Restar uno">−</button>
              <output aria-live="polite">{cantidad}</output>
              <button type="button" onClick={() => setCantidad((c) => c + 1)} disabled={cantidad >= maximo || agotado} aria-label="Sumar uno">+</button>
            </div>
          </div>
        )}

        <div className="detalle__acciones">
          <button type="button" className="boton boton--acento" onClick={agregarAlCarrito} disabled={agotado}>
            Agregar al carrito
          </button>
          <Link to="/checkout" className="boton boton--primario" aria-disabled={agotado}>
            Realizar compra
          </Link>
        </div>

        <p className="detalle__descripcion">{producto.descripcion}</p>
      </section>
    </div>
  )
}
