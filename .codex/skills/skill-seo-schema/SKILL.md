---
name: skill-seo-schema
description: Implement technical SEO for the Astro MVP (titles/descriptions, OpenGraph, Twitter cards, sitemap, robots.txt) and configurable JSON-LD schema (Organization/LocalBusiness).
metadata:
  short-description: SEO meta + OG/Twitter + sitemap/robots + JSON-LD schema
---

# Skill: SEO + Schema

## Propósito y alcance

Agregar SEO técnico al MVP Astro: metadatos por página, OpenGraph/Twitter, sitemap y robots.txt. Añadir JSON-LD configurable para `Organization` o `LocalBusiness` sin dependencias pesadas.

## Inputs (qué necesita)

- Proyecto Astro en `web-astro-mvp/app/`.
- Layout base existente (`src/layouts/BaseLayout.astro`).

## Pasos concretos

1) Config base del sitio:
   - Crear `src/config/site.ts` con:
     - `siteUrl`, `siteName`, `defaultTitle`, `defaultDescription`
     - `twitterHandle` (opcional)
     - Datos para schema (nombre, logo, address si aplica)

2) Componente SEO reutilizable:
   - Crear `src/components/Seo.astro` con props: `title`, `description`, `canonical`, `image`, `noindex`.
   - Renderizar:
     - `<title>` y `<meta name="description">`
     - `og:*`, `twitter:*`
     - `<link rel="canonical">`

3) JSON-LD:
   - En `Seo.astro` (o `src/components/SchemaOrg.astro`), emitir `<script type="application/ld+json">`.
   - Soportar `Organization` y `LocalBusiness` mediante una config en `src/config/site.ts`.

4) Sitemap:
   - Instalar y configurar `@astrojs/sitemap`.
   - Asegurar `site` en `astro.config.*` (usando `siteUrl`).

5) robots.txt:
   - Crear `public/robots.txt` (permitir todo + enlazar sitemap).

6) Aplicar SEO por página:
   - Pasar `title/description` desde cada página al layout/SEO.

## Comandos a ejecutar (dentro del contenedor)

- `cd /workspace/app && pnpm add @astrojs/sitemap`
- `cd /workspace/app && pnpm dev --host 0.0.0.0`
- `cd /workspace/app && pnpm build`

## Criterios de aceptación (Definition of Done)

- Cada página tiene `title` y `description` correctos.
- OpenGraph y Twitter cards presentes en HTML renderizado.
- `sitemap.xml` se genera en build.
- `public/robots.txt` existe y referencia el sitemap.
- JSON-LD válido (Organization/LocalBusiness) configurable desde `src/config/site.ts`.

## Convenciones de código y estructura

- Config del sitio en `src/config/site.ts`.
- SEO reusable en `src/components/Seo.astro` (evitar duplicación de meta tags).
- Archivos estáticos en `public/` (robots, og image si aplica).
