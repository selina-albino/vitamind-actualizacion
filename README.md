# VitaMind — E-commerce (Frontend)

Tienda en línea de VitaMind: snacks saludables, bebidas funcionales, suplementos, accesorios y recetas digitales.
Proyecto de la materia **Actualización 1** — Grupo 1.

## Equipo
- Selina Albino Roque
- Ariana Aguilar Otalora
- Gabriel

## Stack
- Vite + React (JavaScript)
- React Router
- Datos de prueba en `src/data/*.json` (sin backend ni base de datos)
- Diseño: Figma · Gestión Scrum: ClickUp

## Ejecutar
```bash
npm install
npm run dev
```

## Estructura
```
src/
  components/   Header, Footer y componentes reutilizables
  pages/        Inicio, Productos, DetalleProducto, Carrito, Checkout, Blog, DetallePost, Contacto
  data/         productos.json, categorias.json, posts.json
  context/      estado global (carrito)
```

## Ramas
- `main`: versión estable (nunca se trabaja directo)
- `develop`: integración
- `feature/<id-clickup>-<nombre>`: una rama por tarea, PR hacia `develop`

## Sprints
| Sprint | Fechas | Objetivo |
|---|---|---|
| 0 | 29/09 – 04/10 | Diseño UX/UI y setup del entorno |
| 1 | 05/10 – 11/10 | Layout base, Inicio, Catálogo, Detalle |
| 2 | 12/10 – 18/10 | Carrito, Checkout, Contacto |
| 3 | 19/10 – 25/10 | Blog, Recomendador, Descargas, responsive |
| Entrega | 26/10 | Presentación final |
