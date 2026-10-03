import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import categorias from '../data/categorias.json'
import productos from '../data/productos.json'
import './Productos.css'

const ordenamientos = {
  recomendados: () => 0,
  'precio-asc': (a, b) => a.precio - b.precio,
  'precio-desc': (a, b) => b.precio - a.precio,
  nombre: (a, b) => a.nombre.localeCompare(b.nombre),
}

export default function Productos() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') ?? 'todos'

  const [orden, setOrden] = useState('recomendados')
  const [minimo, setMinimo] = useState('')
  const [maximo, setMaximo] = useState('')
  const [rango, setRango] = useState({ min: null, max: null })

  function cambiarCategoria(id) {
    setParams(id === 'todos' ? {} : { categoria: id })
  }

  function aplicarPrecio(evento) {
    evento.preventDefault()
    setRango({
      min: minimo === '' ? null : Number(minimo),
      max: maximo === '' ? null : Number(maximo),
    })
  }

  const lista = productos
    .filter((p) => categoria === 'todos' || p.categoria === categoria)
    .filter((p) => rango.min === null || p.precio >= rango.min)
    .filter((p) => rango.max === null || p.precio <= rango.max)
    .sort(ordenamientos[orden])

  return (
    <div className="contenedor catalogo">
      <h1>Todos los productos</h1>

      <aside className="filtros" aria-label="Filtros">
        <fieldset>
          <legend>Explorar por</legend>
          {[{ id: 'todos', nombre: 'Todos los productos' }, ...categorias].map((c) => (
            <label key={c.id} className="filtros__opcion">
              <input
                type="radio"
                name="categoria"
                value={c.id}
                checked={categoria === c.id}
                onChange={() => cambiarCategoria(c.id)}
              />
              {c.nombre}
            </label>
          ))}
        </fieldset>

        <form onSubmit={aplicarPrecio} className="filtros__precio">
          <fieldset>
            <legend>Precio (Bs)</legend>
            <div className="filtros__rango">
              <label>
                <span className="visualmente-oculto">Precio mínimo</span>
                <input type="number" min="0" placeholder="Mín" value={minimo} onChange={(e) => setMinimo(e.target.value)} />
              </label>
              <span aria-hidden="true">–</span>
              <label>
                <span className="visualmente-oculto">Precio máximo</span>
                <input type="number" min="0" placeholder="Máx" value={maximo} onChange={(e) => setMaximo(e.target.value)} />
              </label>
            </div>
            <button type="submit" className="boton boton--primario">Aplicar</button>
          </fieldset>
        </form>
      </aside>

      <section className="catalogo__resultados" aria-label="Resultados">
        <div className="catalogo__barra">
          <p role="status">{lista.length} productos</p>
          <label>
            Ordenar por:{' '}
            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="recomendados">Recomendados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A–Z</option>
            </select>
          </label>
        </div>

        {lista.length === 0 ? (
          <p className="catalogo__vacio">No encontramos productos con esos filtros.</p>
        ) : (
          <div className="catalogo__grilla">
            {lista.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
