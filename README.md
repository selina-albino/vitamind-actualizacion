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
| 0 | 29/09 – 05/10 | Diseño UI/UX y setup del entorno colaborativo |
| 1 | 29/09 – 05/10 | De Figma al Pull Request: layout, Inicio, Catálogo, Detalle |
| 2 | 06/10 – 12/10 | Carrito y Checkout |
| 3 | 13/10 – 19/10 | Blog y Contacto |
| 4 | 20/10 – 26/10 | Recomendador, descargas digitales, responsive y entrega final |

**Fuera de alcance (MVP):** Mis suscripciones / Planes, Reserva online e Iniciar sesión. Quedan en el diseño de Figma y en el backlog futuro.

## Flujo de trabajo (de Figma al Pull Request)
1. Tomar la tarea en ClickUp y pasarla a *In Progress*.
2. `git checkout develop && git pull`
3. `git checkout -b feature/huXX-nombre`
4. Maquetar comparando con Figma, `npm run dev` para ver los cambios.
5. `git add . && git commit -m "feat(HUXX): ..."` y `git push -u origin feature/huXX-nombre`
6. En GitHub abrir Pull Request hacia `develop`, otro integrante revisa y aprueba.
7. Merge y mover la tarea a *Done* en ClickUp.
