import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import categorias from '../data/categorias.json'
import productos from '../data/productos.json'
import './Inicio.css'

const beneficios = [
  { titulo: 'Energía', texto: 'Optimiza tu vitalidad diaria con alimentos que nutren de verdad.' },
  { titulo: 'Foco', texto: 'Mejora tu productividad con una nutrición diseñada para el cerebro.' },
  { titulo: 'Consciencia', texto: 'Aprende a escuchar a tu cuerpo y comer con plena intención.' },
  { titulo: 'Fitness', texto: 'Alcanza tus objetivos físicos con el combustible adecuado.' },
]

export default function Inicio() {
  const destacados = productos.filter((p) => p.destacado)

  return (
    <>
      <section className="contenedor hero" aria-labelledby="hero-titulo">
        <div className="hero__texto">
          <h1 id="hero-titulo">Transforma tu vida con Vitamind</h1>
          <p>Alcanza tu máximo potencial con productos saludables diseñados para elevar tu energía y bienestar diario.</p>
          <div className="hero__acciones">
            <Link to="/productos" className="boton boton--acento">Comprar ahora</Link>
            <Link to="/blog" className="boton boton--borde">Ver blog</Link>
          </div>
        </div>
        <ProductImage alt="Bowl de frutas y jugos naturales" className="hero__imagen" />
      </section>

      <section className="contenedor seccion" aria-labelledby="categorias-titulo">
        <h2 id="categorias-titulo">Nuestras Categorías</h2>
        <p className="seccion__bajada">Explora soluciones diseñadas para tu bienestar integral y nutrición consciente.</p>
        <ul className="categorias">
          {categorias.map((c) => (
            <li key={c.id}>
              <Link to={`/productos?categoria=${c.id}`} className="categoria">
                <ProductImage alt="" />
                <h3>{c.nombre}</h3>
                <p>{c.descripcion}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="contenedor seccion" aria-labelledby="destacados-titulo">
        <h2 id="destacados-titulo" className="seccion__titulo-centrado">Productos destacados</h2>
        <div className="grilla-productos">
          {destacados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>

      <section className="contenedor seccion" aria-labelledby="beneficios-titulo">
        <h2 id="beneficios-titulo" className="visualmente-oculto">Beneficios</h2>
        <ul className="beneficios">
          {beneficios.map((b) => (
            <li key={b.titulo}>
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="contenedor cta" aria-labelledby="cta-titulo">
        <div>
          <h2 id="cta-titulo">Eleva tu Energía con Nutrición Consciente</h2>
          <p>Transforma tu estilo de vida con productos pensados para jóvenes adultos que buscan rendimiento, claridad mental y bienestar.</p>
          <Link to="/productos" className="boton boton--acento">Ver productos</Link>
        </div>
        <ProductImage alt="Ensalada de palta y granada" />
      </section>
    </>
  )
}
