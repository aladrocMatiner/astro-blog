# Astro Tech Blog

Repositorio base para un blog técnico escrito con Astro, con contenedores, observabilidad y analíticas locales.

## Vapor
- **Astro** para el front-end y la gestión de contenido técnico (Markdown + posts de prueba).
- **HAProxy** como reverse proxy para servir el blog y exponer dashboards/servicios.
- **Grafana, Prometheus y Loki** para métricas y logs básicos.
- **Umami (self-hosted)** como analíticas privacy-first.
- **Docker Compose** para orchestración reproducible y pruebas dentro del contenedor.

## Desarrollo local

1. Instala dependencias: `npm install`
2. Ejecuta el entorno en caliente: `npm run dev`
3. Para verificar el sitio en producción local: `npm run build`
4. `npm run test` ejecuta `astro check` y `astro build` para validar el contenido.

## Stack en Docker

Construye y levanta todos los servicios:

```bash
docker compose up --build
```

Servicios principales:

- `astro`: servidor Astro dev (expuesto en HAProxy en el puerto **8080**).
- `haproxy`: único punto de acceso (cookie para rutas `/grafana`, `/prometheus`, `/loki`, `/analytics`).
- `grafana`: dashboard preconfigurado con Prometheus y Loki.
- `prometheus`: scraping del proxy y otros backends.
- `loki` + `promtail`: ingesta de logs Docker. Para que `promtail` lea `/var/lib/docker/containers/*/*.log` en Linux necesitarás dar acceso de solo lectura a esa ruta para el contenedor (el compose actual monta el host directamente).
- `umami` + `postgres`: analíticas locales (busca el script en `/analytics`).

Consulta `docker compose ps` para ver puertos y `docker compose logs <servicio>` para diagnosticar.

## Observabilidad

- Grafana está disponible vía `http://localhost:8080/grafana` (accesible detrás de HAProxy).
- Prometheus UI: `http://localhost:8080/prometheus`
- Loki Explore: `http://localhost:8080/loki`
- Promtail lee archivos de logs de Docker (`/var/lib/docker/containers/*/*.log`) y los envía a Loki.
- Los dashboards y datasources de Grafana están versionados en `observability/grafana/provisioning/`.

## Analíticas (Umami)

- El snippet de Umami se carga automáticamente si defines `PUBLIC_UMAMI_SCRIPT_URL` y `PUBLIC_UMAMI_WEBSITE_ID` en tu entorno (variable `.env` para `npm run dev` o `docker compose`).
- El dashboard expone páginas vistas por ruta y referers.
- Para resetear datos: `docker compose exec umami npm run db:reset`.

## Contenido

- Guarda los artículos en `src/content/posts` con frontmatter (`title`, `summary`, `publishDate`, `tags`).
- Usa Markdown con bloques de código para documentar conceptos y fragmentos de infraestructura.
- Los posts de prueba actuales ayudan a validar listados y el sistema de rutas `/blog/[slug]`.

## Validaciones

- `npm run test` para comprobar que Astro builda y pasa `astro check`.
- `docker compose run --rm astro npm test` también funciona dentro del contenedor.
