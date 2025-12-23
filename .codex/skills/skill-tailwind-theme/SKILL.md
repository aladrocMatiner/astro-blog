---
name: skill-tailwind-theme
description: Add Tailwind CSS to the Astro MVP, define design tokens (CSS variables), light/dark mode, basic UI components (Button, Card, SectionTitle), and integrate Lucide icons (or a lightweight alternative).
metadata:
  short-description: Tailwind + theme tokens + UI primitives + icons
---

# Skill: Tailwind Theme

## Propósito y alcance

Añadir Tailwind al MVP Astro, definir tokens (variables CSS), habilitar modo light/dark, y crear componentes UI básicos reutilizables. Integrar iconos con Lucide (o alternativa ligera) de forma consistente.

## Inputs (qué necesita)

- Proyecto Astro ya creado en `web-astro-mvp/app/` (ver `skill-astro-bootstrap`).
- Dependencias instaladas (`pnpm install`).

## Pasos concretos

1) Instalar Tailwind para Astro:
   - `cd /workspace/app`
   - `pnpm astro add tailwind`

2) Definir tokens y tema (light/dark):
   - Crear/actualizar `src/styles/theme.css` con variables CSS para colores/spacing/radius.
   - Importar `theme.css` desde el layout base (p.ej. en `BaseLayout.astro`).
   - Estrategia recomendada: usar clase `dark` en `<html>` o `<body>` (Tailwind dark mode por clase).

3) Configurar Tailwind para dark mode por clase:
   - En `tailwind.config.*`, asegurar `darkMode: "class"`.

4) Componentes UI básicos (Astro):
   - `src/components/ui/Button.astro`
   - `src/components/ui/Card.astro`
   - `src/components/ui/SectionTitle.astro`
   - Deben aceptar props mínimas (por ejemplo: `variant`, `href`, `as`, `class`).

5) Iconos (Lucide o alternativa ligera):
   - Opción recomendada (ligera): `pnpm add lucide-static`
   - Crear `src/components/ui/Icon.astro` que renderice SVG desde `lucide-static` por nombre.

6) Aplicar UI en páginas existentes:
   - Usar `SectionTitle` en encabezados.
   - Usar `Card` en Services.
   - Usar `Button` en CTA (p.ej. Contact).

## Comandos a ejecutar (dentro del contenedor)

- `cd /workspace/app && pnpm astro add tailwind`
- `cd /workspace/app && pnpm add lucide-static`
- `cd /workspace/app && pnpm dev --host 0.0.0.0`

## Criterios de aceptación (Definition of Done)

- Tailwind funciona y estilos se aplican sin errores.
- Existe un set de tokens en `src/styles/theme.css`.
- Dark mode funciona (toggle puede venir después; al menos soporta clase `dark`).
- Existen `Button`, `Card`, `SectionTitle` en `src/components/ui/`.
- Iconos se pueden renderizar vía `Icon.astro` (o alternativa documentada).

## Convenciones de código y estructura

- UI primitives en `src/components/ui/`.
- Tokens en `src/styles/` con variables CSS; Tailwind consume vía clases + variables.
- Preferir componentes accesibles (focus ring, `aria-*`, contraste AA).
