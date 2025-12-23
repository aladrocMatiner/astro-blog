# Change: Stack de observabilidad (Grafana Labs) para el entorno en contenedor

## Why
Queremos instrumentación y visibilidad desde el principio: métricas y logs para el blog y para los servicios del stack, de forma autosuficiente y reproducible. Esto también sirve como base para documentar prácticas DevOps/SRE en el propio blog.

## What Changes
- Se añade un stack basado en Grafana Labs: Grafana + Prometheus + Loki (y un agente/collector para logs).
- Se incluyen configuraciones versionadas y persistencia local (volúmenes) para poder reiniciar sin perder datos básicos.
- Grafana queda preconfigurado con data sources (Prometheus, Loki) y un dashboard mínimo.
- Opcionalmente, se expone todo detrás de HAProxy para un único punto de acceso.

## Impact
- Affected specs: `observability`
- Dependencies: `add-astro-docker-compose`, `add-haproxy-reverse-proxy` (opcional pero recomendado)
- Security note: credenciales por defecto SOLO para entorno local; documentar endurecimiento si se usa fuera de local.
