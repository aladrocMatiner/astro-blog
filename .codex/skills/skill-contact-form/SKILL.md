---
name: skill-contact-form
description: Implement a working contact form in Astro using Netlify Forms (preferred) or Formspree, including a /thanks page, basic validation, and simple anti-spam (honeypot).
metadata:
  short-description: Contact form + thanks + validation + honeypot
---

# Skill: Contact Form

## Propósito y alcance

Crear un formulario de contacto funcional para el MVP Astro, con una página `/thanks`, validación básica y anti-spam simple (honeypot). Preferencia: Netlify Forms (encaja con el deploy skill).

## Inputs (qué necesita)

- Proyecto Astro en `web-astro-mvp/app/`.
- Página `Contact` existente (`src/pages/contact.astro`).

## Pasos concretos (Netlify Forms recomendado)

1) Crear página de agradecimiento:
   - `src/pages/thanks.astro`

2) Implementar el form en `src/pages/contact.astro`:
   - Usar `method="POST"`, `data-netlify="true"`, `name="contact"`.
   - Añadir honeypot:
     - `netlify-honeypot="bot-field"`
     - Campo oculto `name="bot-field"` (no debe ser visible).
   - Añadir `<input type="hidden" name="form-name" value="contact" />`.
   - `action="/thanks"` para redirección tras submit.

3) Validación básica:
   - HTML5: `required`, `type="email"`, `minlength` razonable.
   - Mensajes simples visibles (sin JS pesado).

4) UX mínima:
   - Estado de “enviado” (en `/thanks`).
   - Campos: name, email, message.

## Alternativa: Formspree

- Sustituir `action` por el endpoint de Formspree y ajustar inputs según su docs.
- Mantener honeypot igualmente.

## Comandos a ejecutar (dentro del contenedor)

- `cd /workspace/app && pnpm dev --host 0.0.0.0`
- (Opcional) `cd /workspace/app && pnpm build`

## Criterios de aceptación (Definition of Done)

- Existe `/contact` con formulario funcional.
- Existe `/thanks` y el flujo de submit redirige ahí.
- Honeypot implementado y oculto correctamente.
- Validación HTML básica evita submits vacíos/invalid email.

## Convenciones de código y estructura

- Páginas en `src/pages/` (`contact.astro`, `thanks.astro`).
- Componentes de formulario (si se extraen) en `src/components/`.
- Mantener el form compatible con build estático (sin backend propio).
