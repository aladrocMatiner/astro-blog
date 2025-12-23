## Context
El proyecto necesita analíticas de visitas por página sin depender de terceros. Aún no está decidida la tecnología, así que este cambio define requisitos y el proceso de selección.

## Goals / Non-Goals
- Goals:
  - Registrar pageviews por ruta/página y mostrar estadísticas en un dashboard.
  - Mantener el sistema self-hosted y desplegable con Docker.
  - Ser razonablemente privacy-first (sin compartir datos con terceros).
- Non-Goals:
  - No se busca replicar todo Google Analytics (embudos complejos, cohortes, etc.) en esta fase.
  - No se prioriza multi-tenant ni escalado masivo inicialmente.

## Decisions
- Decision (TBD): seleccionar una de estas opciones (o similar) en implementación:
  - Umami
  - Plausible (self-hosted)
  - GoatCounter (self-hosted)
  - Matomo (más pesado; solo si hace falta)
- Decision: integrar mediante snippet/script en el layout de Astro o mediante proxy/edge, según tecnología elegida.

## Risks / Trade-offs
- Algunas opciones requieren base de datos (Postgres, etc.) → aumenta complejidad del stack.
- Algunas opciones usan tracking que puede chocar con políticas de privacidad → definir configuración (cookies, IP anonymization, DNT).

## Migration Plan
- Evaluar opciones con una matriz de criterios (simplicidad, recursos, privacidad, facilidad de integración).
- Seleccionar tecnología y añadir servicios/config al compose.
- Integrar snippet en Astro y validar que registra pageviews.

## Open Questions
- ¿Requiere autenticación/SSO para el dashboard?
- ¿Qué nivel de anonimización/retención necesitamos por defecto?
