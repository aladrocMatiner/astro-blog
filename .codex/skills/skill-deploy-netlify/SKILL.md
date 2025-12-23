---
name: skill-deploy-netlify
description: "Prepare the Astro MVP for deployment on Netlify: adapter config, build/publish settings, environment variables, preview deploy, and a release checklist."
metadata:
  short-description: Netlify deployment setup + release checklist
---

# Skill: Deploy Netlify

## Propósito y alcance

Preparar el MVP Astro para desplegar en Netlify con configuración mínima: adapter, build command, publish dir, variables de entorno y checklist de release + preview deploy.

## Inputs (qué necesita)

- Proyecto Astro en `web-astro-mvp/app/`.
- Build funcionando localmente (`pnpm build`).

## Pasos concretos

1) Adapter Netlify:
   - Instalar `@astrojs/netlify`.
   - Configurar `astro.config.*` con `adapter: netlify()`.

2) Config de Netlify:
   - Crear `netlify.toml` en `web-astro-mvp/app/` con:
     - `build.command = "pnpm build"`
     - `build.publish = "dist"`
     - Variables de entorno (si aplica)
     - Redirects/headers mínimos si se necesitan

3) Variables de entorno:
   - Definir cuáles son necesarias (p.ej. `PUBLIC_SITE_URL`, flags).
   - Documentar defaults en el código (fallbacks seguros).

4) Preview deploy:
   - Asegurar que PR builds no rompen rutas (sitemap/robots/canonical con `siteUrl` correcto).

5) Checklist de release:
   - Build limpio: `pnpm build`
   - SEO: revisar meta/OG/Twitter, sitemap y robots en deploy preview
   - Formularios: validar submit en Netlify

## Comandos a ejecutar (dentro del contenedor)

- `cd /workspace/app && pnpm add @astrojs/netlify`
- `cd /workspace/app && pnpm build`

## Criterios de aceptación (Definition of Done)

- Build en Netlify funciona con `pnpm build` y publica `dist/`.
- Adapter Netlify configurado y sin warnings críticos.
- Preview deploy disponible y páginas cargan correctamente.
- Checklist de release existe (en este skill) y es ejecutable.

## Convenciones de código y estructura

- Config Netlify en `web-astro-mvp/app/netlify.toml`.
- Preferir `PUBLIC_*` para variables expuestas al cliente y defaults seguros en config.
- No introducir dependencias de backend si el MVP es estático.
