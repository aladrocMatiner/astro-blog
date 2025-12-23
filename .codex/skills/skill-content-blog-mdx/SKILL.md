---
name: skill-content-blog-mdx
description: Add a blog to the Astro MVP using Content Collections with MDX, including post list and post detail pages with typed frontmatter.
metadata:
  short-description: Blog with MDX + Content Collections
---

# Skill: Content Blog (MDX)

## Propósito y alcance

Añadir un blog simple al MVP Astro usando Content Collections + MDX: lista de posts y página de post. Mantenerlo minimalista y tipado.

## Inputs (qué necesita)

- Proyecto Astro en `web-astro-mvp/app/`.
- Layout base existente.

## Pasos concretos

1) Añadir integración MDX:
   - `cd /workspace/app`
   - `pnpm add @astrojs/mdx`
   - Configurar `astro.config.*` para incluir MDX.

2) Content Collections:
   - Crear `src/content/config.ts` con colección `blog` y schema (zod) con:
     - `title`, `description`, `pubDate`, `draft` (opcional), `tags` (opcional)
   - Crear posts en `src/content/blog/` como `.mdx` (o `.md` si aplica).

3) Listado de posts:
   - Crear `src/pages/blog/index.astro`
   - Renderizar lista ordenada por fecha, excluyendo `draft` en producción.

4) Página de post:
   - Crear `src/pages/blog/[slug].astro`
   - Resolver entry por slug y renderizar contenido + meta (title/description).

5) Navegación:
   - Añadir enlace “Blog” en el Navbar.

## Comandos a ejecutar (dentro del contenedor)

- `cd /workspace/app && pnpm add @astrojs/mdx`
- `cd /workspace/app && pnpm dev --host 0.0.0.0`
- `cd /workspace/app && pnpm build`

## Criterios de aceptación (Definition of Done)

- Existe `/blog` con listado de posts.
- Existe `/blog/[slug]` renderizando un post MDX.
- Content Collections tipa el frontmatter y falla en build si falta un campo requerido.
- Los posts `draft` no aparecen en producción (build).

## Convenciones de código y estructura

- Posts en `src/content/blog/`.
- Config en `src/content/config.ts`.
- Páginas en `src/pages/blog/`.
- Mantener MDX simple (sin plugins pesados salvo necesidad).
