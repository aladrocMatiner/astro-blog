# Change: HAProxy como reverse proxy delante de Astro

## Why
Necesitamos un punto de entrada único para el entorno local (y más adelante producción) que permita:
- Servir el blog Astro por un único endpoint.
- Exponer UIs internas (Grafana/Prometheus) bajo rutas/hosts controlados.
- Preparar terminación TLS y reglas de routing sin acoplarlas al contenedor de Astro.

## What Changes
- Se añade un servicio `haproxy` (contenedor) y una configuración versionada (`haproxy.cfg`).
- Se enruta tráfico HTTP hacia el servicio de Astro.
- Se documentan puntos de extensión para añadir nuevos backends (observabilidad/analíticas).

## Impact
- Affected specs: `reverse-proxy`
- Dependencies: `add-astro-docker-compose`
- Breaking changes: none
