---
name: architect-web
description: "Architecture guide for aladroc.io (Astro + Tailwind, static-first, Docker-only dev, Netlify/Vercel/Cloudflare deploy) including i18n, SEO, routing, and delivery."
metadata:
  short-description: Architecture guide for the Astro static site
---

# Skill: Architect Web (Astro Static)

## Proposito y alcance

Definir decisiones de arquitectura para el sitio marketing/consultoria en Astro. Enfocado en informacion, routing e i18n (en root, sv prefix), SEO, performance, hosting y delivery. Mantener dependencias minimas y desarrollo 100% en Docker (sin Node en host).

## Inputs (que necesita)

- Objetivos de negocio, mercados, sitemap y CTA clave.
- Restricciones: Docker-only, Node LTS en contenedor, dependencias minimas, no Python.
- Hosting target (Netlify, Vercel, Cloudflare Pages).
- Estructura actual en `web-astro-mvp/` y rutas existentes.

## Pasos concretos

1) Verificar si el cambio requiere OpenSpec:
   - Si es nueva capacidad o plan/propuesta, leer `openspec/AGENTS.md` y preparar change proposal antes de codear.
   - Revisar `openspec list` y `openspec list --specs`.

2) Revisar estructura y constraints del repo:
   - `src/layouts`, `src/pages`, `src/components`, `src/config/site.ts`.
   - Confirmar stack: Astro + Tailwind + pnpm + Docker.

3) Definir arquitectura de informacion:
   - Sitemap y orden de navegacion.
   - Flow de conversion (hero -> outcomes -> services -> process -> CTA).

4) Definir routing e i18n:
   - English en `/` (default), Swedish bajo `/sv/...`.
   - Crear mapa de rutas y helper para alternates.
   - Language switcher que preserve la ruta equivalente.

5) Definir SEO base:
   - Title/description por pagina, OG/Twitter, sitemap y robots.
   - Canonical y hreflang por locale.
   - JSON-LD Organization con `areaServed` (Scandinavia, Europe, United States).

6) Definir patrones de contenido reutilizable:
   - Paginas de servicios con estructura fija: Problem -> Approach -> Deliverables -> Timeline -> Tools -> CTA.
   - Secciones reusable como cards, steps y CTA.

7) Definir performance y delivery:
   - Static-first, evitar JS cliente innecesario.
   - Build produce `dist/` para deploy estatico.
   - Formulario estatico (Netlify Forms o proveedor externo).

8) Documentar decisiones y tareas:
   - Lista de archivos a tocar, riesgos y criterios de aceptacion.

## Comandos a ejecutar (dentro del contenedor)

- `rg -n "pattern" src`
- `tree -L 3 src`
- `pnpm build`
- `pnpm preview --host 0.0.0.0 --port 4321`

## Criterios de aceptacion (Definition of Done)

- Arquitectura documentada (routing, i18n, SEO, hosting).
- Existe mapa de rutas EN/SV y se usa en canonical/hreflang.
- Navegacion y language switcher preservan locale y ruta.
- Build genera paginas para todo el sitemap.
- Dependencias nuevas solo si aportan valor claro (no Python).

## Convenciones de codigo y estructura

- `src/i18n/` para locales, diccionarios y rutas.
- `src/pages/` para EN root y `src/pages/sv/` para Swedish.
- `src/layouts/BaseLayout.astro` centraliza meta/canonical/hreflang.
- `src/components/` para secciones y layout compartido.
- Variables expuestas via `PUBLIC_*` (p.ej. `PUBLIC_SITE_URL`, `PUBLIC_BOOKING_URL`).
