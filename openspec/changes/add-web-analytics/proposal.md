# Change: Analíticas de visitas (self-hosted) para el blog Astro

## Why
Queremos estadísticas de visitas por página (similar a Google Analytics) pero autocontenidas y alineadas con privacidad. Además, esto encaja con el objetivo del blog: documentar proyectos técnicos y medir uso sin depender de terceros.

## What Changes
- Se selecciona una tecnología de analíticas self-hosted (a determinar) y se integra con Astro.
- Se añade un servicio (o servicios) al stack en contenedor y se expone un dashboard/endpoint para consultar estadísticas.
- Se documenta el modelo de datos mínimo: pageviews por path, referrers, navegación básica.

## Impact
- Affected specs: `web-analytics`
- Dependencies: `add-astro-docker-compose` (y opcionalmente `add-haproxy-reverse-proxy`)
- Notes: este cambio incluye una fase explícita de decisión tecnológica (TBD).
