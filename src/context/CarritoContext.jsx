import { createContext, useContext, useEffect, useState } from 'react'

const CarritoContext = createContext(null)
const CLAVE = 'vitamind-carrito'

function leerGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  // Estado inicial: lo que quedó guardado en el navegador
  const [items, setItems] = useState(leerGuardado)

  // Efecto secundario: cada vez que cambia el carrito, se guarda (persistencia)
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  }, [items])

  function agregar(producto, cantidad = 1) {
    setItems((actual) => {
      const existe = actual.find((i) => i.id === producto.id)
      if (existe) {
        return actual.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i))
      }
      return [...actual, { id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, tipo: producto.tipo, cantidad }]
    })
  }

  function cambiarCantidad(id, cantidad) {
    if (cantidad < 1) return quitar(id)
    setItems((actual) => actual.map((i) => (i.id === id ? { ...i, cantidad } : i)))
  }

  function quitar(id) {
    setItems((actual) => actual.filter((i) => i.id !== id))
  }

  function vaciar() {
    setItems([])
  }

  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0)
  const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ items, agregar, cambiarCantidad, quitar, vaciar, cantidadTotal, total }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}
