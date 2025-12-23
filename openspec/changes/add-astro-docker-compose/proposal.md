# Change: Docker Compose para Astro (dev + tests)

## Why
Hoy el repo no tiene una forma reproducible de levantar Astro ni de ejecutar tests en un entorno controlado. Un contenedor simplifica el onboarding, evita diferencias de versiones (Node/npm) y prepara el terreno para añadir proxy/observabilidad/analíticas en cambios posteriores.

## What Changes
- Se añade un proyecto base de Astro (mínimo) para poder ejecutar `dev`, `build` y `test`.
- Se añade `Dockerfile` y `docker-compose.yml` para desarrollo y ejecución de comandos (tests/build) dentro del contenedor.
- Se documentan comandos de uso (dev/test/build) en `README.md`.

## Impact
- Affected specs: `dev-environment`
- Affected code: nuevos ficheros `Dockerfile`, `docker-compose.yml`, `.dockerignore`, estructura base de Astro y documentación.
- Breaking changes: none (propuesta inicial).
