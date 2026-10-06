import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import categorias from '../data/categorias.json'
import productos from '../data/productos.json'
import './Productos.css'

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState('')
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const [orden, setOrden] = useState('recomendados')
  const [precioMinimo, setPrecioMinimo] = useState('')
  const [precioMaximo, setPrecioMaximo] = useState('')
  const [rangoPrecio, setRangoPrecio] = useState({ minimo: null, maximo: null })
  const [errorPrecio, setErrorPrecio] = useState('')
  const categoria = searchParams.get('categoria') || ''

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase('es')
    const resultado = productos.filter((producto) => {
      const coincideBusqueda = !termino
        || producto.nombre.toLocaleLowerCase('es').includes(termino)
        || producto.descripcion.toLocaleLowerCase('es').includes(termino)
      const coincideCategoria = !categoria || producto.categoria === categoria
      const coincideTipo = !tipo || producto.tipo === tipo
      const coincidePrecio = (rangoPrecio.minimo === null || producto.precio >= rangoPrecio.minimo)
        && (rangoPrecio.maximo === null || producto.precio <= rangoPrecio.maximo)
      const disponible = producto.tipo === 'digital' || producto.stock > 0

      return coincideBusqueda
        && coincideCategoria
        && coincideTipo
        && coincidePrecio
        && (!soloDisponibles || disponible)
    })

    if (orden === 'precio-asc') resultado.sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') resultado.sort((a, b) => b.precio - a.precio)
    if (orden === 'nombre') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    if (orden === 'recomendados') resultado.sort((a, b) => Number(b.destacado) - Number(a.destacado))

    return resultado
  }, [busqueda, categoria, orden, rangoPrecio, soloDisponibles, tipo])

  function aplicarRangoPrecio(evento) {
    evento.preventDefault()
    const minimo = precioMinimo === '' ? null : Number(precioMinimo)
    const maximo = precioMaximo === '' ? null : Number(precioMaximo)

    if ((minimo !== null && (!Number.isFinite(minimo) || minimo < 0))
      || (maximo !== null && (!Number.isFinite(maximo) || maximo < 0))) {
      setErrorPrecio('Ingresa precios válidos, iguales o mayores a 0 Bs.')
      return
    }

    if (minimo !== null && maximo !== null && minimo > maximo) {
      setErrorPrecio('El precio mínimo no puede ser mayor al precio máximo.')
      return
    }

    setErrorPrecio('')
    setRangoPrecio({ minimo, maximo })
  }

  function cambiarCategoria(evento) {
    const nuevaCategoria = evento.target.value
    setSearchParams((actuales) => {
      const siguientes = new URLSearchParams(actuales)
      if (nuevaCategoria) siguientes.set('categoria', nuevaCategoria)
      else siguientes.delete('categoria')
      return siguientes
    })
  }

  function limpiarFiltros() {
    setBusqueda('')
    setTipo('')
    setSoloDisponibles(false)
    setOrden('recomendados')
    setPrecioMinimo('')
    setPrecioMaximo('')
    setRangoPrecio({ minimo: null, maximo: null })
    setErrorPrecio('')
    setSearchParams({})
  }

  const hayRangoPrecio = rangoPrecio.minimo !== null || rangoPrecio.maximo !== null
  const hayFiltros = Boolean(busqueda || categoria || tipo || soloDisponibles || orden !== 'recomendados' || hayRangoPrecio)

  return (
    <section className="contenedor catalogo" aria-labelledby="catalogo-titulo">
      <header className="catalogo__encabezado">
        <p className="catalogo__sobretitulo">Vitamind · bienestar diario</p>
        <h1 id="catalogo-titulo">Encuentra lo que te hace bien</h1>
        <p>Explora nuestra selección de productos para nutrir tu energía y acompañar tu día.</p>
      </header>

      <div className="catalogo__herramientas">
        <div className="catalogo__busqueda">
          <label htmlFor="buscar-productos">Buscar productos</label>
          <input
            id="buscar-productos"
            type="search"
            placeholder="¿Qué estás buscando?"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>

        <div className="catalogo__filtros" aria-label="Filtros de productos">
          <div className="catalogo__campo">
            <label htmlFor="filtro-categoria">Categoría</label>
            <select id="filtro-categoria" value={categoria} onChange={cambiarCategoria}>
              <option value="">Todas las categorías</option>
              {categorias.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
              ))}
            </select>
          </div>

          <div className="catalogo__campo">
            <label htmlFor="filtro-tipo">Tipo de producto</label>
            <select id="filtro-tipo" value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
              <option value="">Todos los tipos</option>
              <option value="fisico">Productos físicos</option>
              <option value="digital">Productos digitales</option>
            </select>
          </div>

          <div className="catalogo__campo">
            <label htmlFor="orden-productos">Ordenar por</label>
            <select id="orden-productos" value={orden} onChange={(evento) => setOrden(evento.target.value)}>
              <option value="recomendados">Recomendados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre: A-Z</option>
            </select>
          </div>

          <label className="catalogo__disponibles">
            <input
              type="checkbox"
              checked={soloDisponibles}
              onChange={(evento) => setSoloDisponibles(evento.target.checked)}
            />
            <span>Solo disponibles</span>
          </label>

          <form className="catalogo__rango-precio" onSubmit={aplicarRangoPrecio}>
            <span className="catalogo__rango-titulo">Filtrar por precio (Bs)</span>
            <div className="catalogo__campo">
              <label htmlFor="precio-minimo">Desde</label>
              <input
                id="precio-minimo"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="0"
                value={precioMinimo}
                onChange={(evento) => {
                  setPrecioMinimo(evento.target.value)
                  setErrorPrecio('')
                }}
              />
            </div>
            <div className="catalogo__campo">
              <label htmlFor="precio-maximo">Hasta</label>
              <input
                id="precio-maximo"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="0"
                value={precioMaximo}
                onChange={(evento) => {
                  setPrecioMaximo(evento.target.value)
                  setErrorPrecio('')
                }}
              />
            </div>
            <button type="submit" className="boton boton--primario">Aplicar</button>
            {errorPrecio && <p className="catalogo__error-precio" role="alert">{errorPrecio}</p>}
          </form>
        </div>
      </div>

      <div className="catalogo__resultados">
        <p aria-live="polite">
          <strong>{productosFiltrados.length}</strong>
          {' '}{productosFiltrados.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
        {hayFiltros && (
          <button type="button" className="catalogo__limpiar" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        )}
      </div>

      {productosFiltrados.length > 0 ? (
        <div className="catalogo__grilla">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} mostrarDetalles />
          ))}
        </div>
      ) : (
        <div className="catalogo__vacio" role="status">
          <h2>No encontramos productos con esos filtros</h2>
          <p>Prueba con otra búsqueda o limpia los filtros para ver todo el catálogo.</p>
          <button type="button" className="boton boton--primario" onClick={limpiarFiltros}>
            Ver todos los productos
          </button>
        </div>
      )}
    </section>
  )
}
