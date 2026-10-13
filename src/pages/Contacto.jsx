import { useState } from 'react'
import './Formulario.css'

const vacio = { nombre: '', email: '', mensaje: '' }

export default function Contacto() {
  const [datos, setDatos] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  function cambiar(evento) {
    const { name, value } = evento.target
    setDatos((actual) => ({ ...actual, [name]: value }))
  }

  function enviar(evento) {
    evento.preventDefault()
    const encontrados = {}
    if (datos.nombre.trim().length < 3) encontrados.nombre = 'Ingresa tu nombre (mínimo 3 letras).'
    if (!/^\S+@\S+\.\S+$/.test(datos.email)) encontrados.email = 'Ingresa un correo válido.'
    if (datos.mensaje.trim().length < 10) encontrados.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setEnviado(true)
    setDatos(vacio)
  }

  return (
    <section className="contenedor formulario">
      <h1>Contacto</h1>
      <p>Escríbenos o visítanos en Avenida América entre Calle Pando 495. Atención: lunes a viernes de 9:00 a 17:00.</p>

      {enviado && <p className="formulario__exito" role="status">✓ Mensaje enviado. Te responderemos pronto.</p>}

      <form onSubmit={enviar} noValidate>
        {[
          { name: 'nombre', label: 'Nombre', type: 'text', auto: 'name' },
          { name: 'email', label: 'Correo', type: 'email', auto: 'email' },
        ].map((c) => (
          <div className="campo" key={c.name}>
            <label htmlFor={c.name}>{c.label}</label>
            <input id={c.name} name={c.name} type={c.type} autoComplete={c.auto} value={datos[c.name]} onChange={cambiar}
              aria-invalid={!!errores[c.name]} aria-describedby={`${c.name}-error`} />
            {errores[c.name] && <p id={`${c.name}-error`} className="campo__error"><span aria-hidden="true">⚠</span> {errores[c.name]}</p>}
          </div>
        ))}

        <div className="campo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="5" value={datos.mensaje} onChange={cambiar}
            aria-invalid={!!errores.mensaje} aria-describedby="mensaje-error" />
          {errores.mensaje && <p id="mensaje-error" className="campo__error"><span aria-hidden="true">⚠</span> {errores.mensaje}</p>}
        </div>

        <button type="submit" className="boton boton--primario">Enviar mensaje</button>
      </form>
    </section>
  )
}
