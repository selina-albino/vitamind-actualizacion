import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <section className="contenedor formulario">
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe.</p>
      <Link to="/" className="boton boton--acento">Volver al inicio</Link>
    </section>
  )
}
