# Astro Tech Blog
- Ejecuta `sudo bash scripts/add-hosts.sh` para asegurar que `aladroc-test.io`, `www.aladroc-test.io` y `grafana.aladroc-test.io` resuelven a la máquina local. El script ignora duplicados.
- Usa `bash scripts/validate-stack.sh` para verificar (con `curl`) que los endpoints principales están disponibles (`Astro`, `Grafana`, `/api/health`, Prometheus/Loki/cAdvisor). El script falla si alguno responde con error.
Repositorio base para un blog técnico escrito con Astro, con contenedores, observabilidad y analíticas locales.

## Vapor
- **Astro** para el front-end y la gestión de contenido técnico (Markdown + posts de prueba).
- **HAProxy** como reverse proxy para servir el blog y exponer dashboards/servicios.
- **Grafana, Prometheus y Loki** para métricas y logs básicos.
- **Analíticas self-hosted** (tracker sencillo con dashboard propio) para contabilizar visitas.
- **Docker Compose** para orquestar todo el stack en contenedores reproducibles.

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

- `astro`: servidor Astro dev (expuesto en HAProxy en el puerto **8080** y también en TLS como `www.aladroc-test.io`).
- `haproxy`: único punto de acceso (HTTP en 8080 y HTTPS en 443 con `certs/haproxy.pem`; el script `scripts/generate-certs.sh` genera los certificados para `www.aladroc-test.io` y `grafana.aladroc-test.io`).
- `haproxy-exporter`: reexpone los stats de HAProxy en formato Prometheus para que Prometheus pueda recolectarlos sin parsear HTML; escucha en `:9101` y consulta `http://haproxy:8404/;csv`.
- `grafana`: dashboard preconfigurado con Prometheus y Loki.
- `prometheus`: scraping del proxy y otros backends.
- `loki` + `alloy agent`: Grafana Alloy (agent) colecta logs Docker y los envía a Loki. El contenedor necesita acceso de solo lectura a `/var/lib/docker/containers` para capturar los registros.
- `analytics`: servicio minimalista que recibe pageviews y expone dashboard en `/analytics/dashboard`.

Consulta `docker compose ps` para ver puertos y `docker compose logs <servicio>` para diagnosticar.

## Observabilidad

- Grafana también se puede abrir en `https://aladroc-test.io/grafana` y `https://www.aladroc-test.io/grafana` gracias a las rutas del proxy; el dashboard se provisiona automáticamente.
- Prometheus UI: `http://localhost:8080/prometheus`
- Loki Explore: `http://localhost:8080/loki`
- HAProxy exporter Prometheus: `http://localhost:9101/metrics` (scraped por el job `haproxy-exporter` para alimentar los paneles de HAProxy).
- cAdvisor UI: `http://localhost:8080/metrics` (el tablero de Prometheus incluye datos gracias al job `cadvisor`).
- Grafana incluye un dashboard preconfigurado (`astro-haproxy-overview`) que muestra CPU/memoria de Astro, sesiones/requests de HAProxy y los logs relevantes de ambos servicios.
- Grafana Alloy agent lee los logs en `/var/lib/docker/containers/*/*.log` y los envía a Loki para alimentar los dashboards.
- Los dashboards y datasources de Grafana están versionados en `observability/grafana/provisioning/`.

## TLS certificates

- Genera la CA y el bundle de certificados ejecutando `bash scripts/generate-certs.sh`. Esto crea `certs/ca.crt.pem` y `certs/haproxy.pem`.
- Apunta `aladroc-test.io`, `www.aladroc-test.io` y `grafana.aladroc-test.io` a `127.0.0.1` en `/etc/hosts` para que el navegador resuelva los hosts locales.
- Confía en `certs/ca.crt.pem` en tu sistema o navegador si quieres evitar warnings durante el desarrollo.

## Analíticas self-hosted

- El tracker inyecta un `<script>` configurable (`PUBLIC_ANALYTICS_SCRIPT_URL`) y envía los eventos a `PUBLIC_ANALYTICS_ENDPOINT_URL` usando `navigator.sendBeacon`. Por defecto se conecta a `http://localhost:8080`.
- El dashboard está disponible en `http://localhost:8080/analytics/dashboard` (expuesto tras HAProxy). También puedes acceder directamente al servicio si mapeas el puerto.
- Para limpiar datos: `docker compose exec analytics rm -f /app/analytics/data/stats.json`.

## Contenido

- Guarda los artículos en `src/content/posts` con frontmatter (`title`, `summary`, `publishDate`, `tags`).
- Usa Markdown con bloques de código para documentar conceptos y fragmentos de infraestructura.
- Los posts de prueba actuales ayudan a validar listados y el sistema de rutas `/blog/[slug]`.

## Validaciones

- `npm run test` para comprobar que Astro builda y pasa `astro check`.
- `docker compose run --rm astro npm test` también funciona dentro del contenedor.
