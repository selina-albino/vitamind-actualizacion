import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'
import './Formulario.css'

const vacio = { nombre: '', telefono: '', email: '', direccion: '', metodoPago: '' }

function validar(datos) {
  const errores = {}
  if (datos.nombre.trim().length < 3) errores.nombre = 'Ingresa tu nombre completo (mínimo 3 letras).'
  if (!/^[67]\d{7}$/.test(datos.telefono)) errores.telefono = 'Ingresa un celular de 8 dígitos que empiece con 6 o 7.'
  if (!/^\S+@\S+\.\S+$/.test(datos.email)) errores.email = 'Ingresa un correo válido.'
  if (datos.direccion.trim().length < 5) errores.direccion = 'Ingresa la dirección de entrega.'
  if (!datos.metodoPago) errores.metodoPago = 'Elige un método de pago.'
  return errores
}

function Error({ id, mensaje }) {
  if (!mensaje) return null
  return (
    <p id={id} className="campo__error">
      <span aria-hidden="true">⚠</span> {mensaje}
    </p>
  )
}

export default function Checkout() {
  const { items, total, vaciar } = useCarrito()
  // Formulario controlado: el estado es la única fuente de verdad de los inputs
  const [datos, setDatos] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [pedido, setPedido] = useState(null)

  function cambiar(evento) {
    const { name, value } = evento.target
    setDatos((actual) => ({ ...actual, [name]: value }))
  }

  function enviar(evento) {
    evento.preventDefault()
    const encontrados = validar(datos)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setPedido({ ...datos, items, total })
    vaciar()
    setDatos(vacio)
  }

  if (pedido) {
    return (
      <section className="contenedor formulario">
        <h1>¡Pedido confirmado!</h1>
        <p role="status">✓ Gracias, {pedido.nombre}. Te contactaremos al {pedido.telefono} para coordinar la entrega.</p>
        <p>Total pagado con {pedido.metodoPago}: <strong>{formatearPrecio(pedido.total)}</strong></p>
        <Link to="/productos" className="boton boton--acento">Seguir comprando</Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="contenedor formulario">
        <h1>Finalizar compra</h1>
        <p>No hay productos en tu carrito.</p>
        <Link to="/productos" className="boton boton--acento">Ver productos</Link>
      </section>
    )
  }

  return (
    <section className="contenedor formulario">
      <h1>Finalizar compra</h1>
      <p>Total a pagar: <strong>{formatearPrecio(total)}</strong></p>

      <form onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input id="nombre" name="nombre" autoComplete="name" value={datos.nombre} onChange={cambiar}
            aria-invalid={!!errores.nombre} aria-describedby="nombre-error" />
          <Error id="nombre-error" mensaje={errores.nombre} />
        </div>

        <div className="campo">
          <label htmlFor="telefono">Celular</label>
          <input id="telefono" name="telefono" type="tel" inputMode="numeric" autoComplete="tel" value={datos.telefono} onChange={cambiar}
            aria-invalid={!!errores.telefono} aria-describedby="telefono-error" />
          <Error id="telefono-error" mensaje={errores.telefono} />
        </div>

        <div className="campo">
          <label htmlFor="email">Correo</label>
          <input id="email" name="email" type="email" autoComplete="email" value={datos.email} onChange={cambiar}
            aria-invalid={!!errores.email} aria-describedby="email-error" />
          <Error id="email-error" mensaje={errores.email} />
        </div>

        <div className="campo">
          <label htmlFor="direccion">Dirección de entrega</label>
          <input id="direccion" name="direccion" autoComplete="street-address" value={datos.direccion} onChange={cambiar}
            aria-invalid={!!errores.direccion} aria-describedby="direccion-error" />
          <Error id="direccion-error" mensaje={errores.direccion} />
        </div>

        <fieldset className="campo" aria-describedby="pago-error">
          <legend>Método de pago</legend>
          {['QR', 'Transferencia', 'Efectivo'].map((metodo) => (
            <label key={metodo} className="campo__opcion">
              <input type="radio" name="metodoPago" value={metodo} checked={datos.metodoPago === metodo} onChange={cambiar} />
              {metodo}
            </label>
          ))}
          <Error id="pago-error" mensaje={errores.metodoPago} />
        </fieldset>

        <button type="submit" className="boton boton--primario">Confirmar pedido</button>
      </form>
    </section>
  )
}
