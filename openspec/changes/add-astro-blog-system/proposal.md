# Change: Sistema de blog en Astro orientado a proyectos técnicos + posts de prueba

## Why
El objetivo del repo es crear un sistema de blog/documentación para proyectos técnicos IT, donde sea fácil publicar artículos con código, enlaces a repos, y notas de arquitectura. Para poder validar navegación, listados y performance, también necesitamos contenido de prueba.

## What Changes
- Se define la estructura del blog (colecciones de contenido, layouts, rutas) usando capacidades nativas de Astro.
- Se soportan artículos en Markdown (y opcionalmente MDX) con bloques de código y resaltado.
- Se implementan listados (home/blog), tags/categorías mínimas y páginas de detalle.
- Se generan varios artículos “lorem ipsum” como dataset de prueba (incluyendo ejemplos con bloques de código).

## Impact
- Affected specs: `blog-engine`
- Dependencies: `add-astro-docker-compose`
- Notes: esta fase se centra en el “motor” del blog; refinamientos de UI/SEO avanzados pueden ir en cambios posteriores.
