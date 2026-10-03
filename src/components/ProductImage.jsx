import './ProductImage.css'

// Si el producto todavía no tiene foto exportada de Figma, muestra un recuadro "Imagen".
export default function ProductImage({ src, alt, className = '' }) {
  if (!src) {
    return (
      <div className={`imagen-vacia ${className}`} role="img" aria-label={alt}>
        <span aria-hidden="true">Imagen</span>
      </div>
    )
  }
  return <img src={src} alt={alt} className={`imagen-producto ${className}`} loading="lazy" />
}
