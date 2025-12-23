---
name: skill-astro-bootstrap
description: Bootstrap an Astro (TypeScript) MVP in `web-astro-mvp/app` with core pages and a reusable layout (Navbar/Footer). Use when starting the Astro codebase structure.
metadata:
  short-description: Astro project bootstrap + base pages/layout
---

# Skill: Astro Bootstrap

## Propósito y alcance

Crear el esqueleto del MVP en Astro (TypeScript) dentro de `web-astro-mvp/app/`, con páginas base y un layout reutilizable (Navbar/Footer). No incluye tema Tailwind ni SEO avanzado (van en skills separadas).

## Inputs (qué necesita)

- Docker instalado y el entorno dev en `web-astro-mvp/` ya creado.
- Trabajar dentro del contenedor (no depender de Node en el host).
- Ruta objetivo del proyecto: `web-astro-mvp/app/`.

## Pasos concretos

1) Entrar al contenedor y posicionarse en `/workspace`:
   - (Ejemplo) `docker compose run --rm web bash`
   - `cd /workspace`

2) Crear el proyecto Astro en `app/` (TypeScript):
   - `pnpm create astro@latest app`
   - En el asistente, elegir:
     - Template: *minimal*
     - TypeScript: *strict*
     - Package manager: *pnpm*
     - Git: *no*

3) Instalar dependencias:
   - `cd app`
   - `pnpm install`

4) Estructura de páginas (Astro pages):
   - Crear/asegurar estas rutas en `src/pages/`:
     - `index.astro` (Home)
     - `services.astro`
     - `about.astro`
     - `contact.astro`
     - `privacy.astro`
     - `cookies.astro`

5) Layout base y componentes compartidos:
   - Crear `src/layouts/BaseLayout.astro` con `<head>` mínimo + `<Navbar />` + `<Footer />` + `<main>`.
   - Crear `src/components/Navbar.astro` y `src/components/Footer.astro`.
   - Actualizar cada página para usar `BaseLayout`.

6) Navegación mínima:
   - En `Navbar.astro`, enlaces a Home/Services/About/Contact.
   - En `Footer.astro`, enlaces a Privacy/Cookies y un texto de copyright.

## Comandos a ejecutar (dentro del contenedor)

- `cd /workspace`
- `pnpm create astro@latest app`
- `cd /workspace/app && pnpm install`
- `cd /workspace/app && pnpm dev --host 0.0.0.0`

## Criterios de aceptación (Definition of Done)

- El proyecto existe en `web-astro-mvp/app/` y compila.
- Las 6 páginas existen y renderizan sin errores.
- Todas las páginas usan `src/layouts/BaseLayout.astro`.
- Navbar y Footer son componentes reutilizables en `src/components/`.

## Convenciones de código y estructura

- Raíz app: `web-astro-mvp/app/`
- Páginas en `src/pages/*.astro` (flat, sin rutas dinámicas todavía).
- Layouts en `src/layouts/`, componentes en `src/components/`.
- Preferir contenido semántico (header/nav/main/footer) y HTML accesible.
