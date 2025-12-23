## Context
Este cambio añade un stack de observabilidad reproducible para el proyecto (local-first) con componentes ampliamente usados y documentables: Grafana, Prometheus y Loki.

## Goals / Non-Goals
- Goals:
  - Proveer métricas y logs en un entorno dockerizado.
  - Tener Grafana listo con data sources y un dashboard mínimo sin configuración manual.
  - Mantener configuraciones versionadas (Prometheus, Loki, agent/collector).
- Non-Goals:
  - No se plantea trazas (Tempo/OTel) en esta fase.
  - No se plantea un hardening completo para Internet (eso requiere decisiones adicionales).

## Decisions
- Decision: usar Grafana + Prometheus + Loki (Grafana Labs stack) con configuración en el repo.
- Decision: incluir un collector para logs (p.ej. Grafana Alloy o Promtail). La elección concreta se cierra en implementación según soporte y facilidad en Docker.
- Decision: persistencia local mediante volúmenes Docker para Grafana/Loki (retención básica).

## Risks / Trade-offs
- Credenciales por defecto en local pueden filtrarse si se expone el stack públicamente → documentar y parametrizar usuarios/passwords.
- Retención y tamaño de volúmenes pueden crecer → establecer límites/retención y documentarlo.

## Migration Plan
- Añadir servicios al `docker-compose.yml` (o a un compose adicional) y validar acceso a Grafana.
- Conectar Prometheus y Loki como data sources por provisionamiento.
- Enrutado por HAProxy (si aplica) para un único endpoint.

## Open Questions
- ¿Collector de logs: Alloy vs Promtail vs docker-driver?
- ¿Ruta/host de acceso (vía HAProxy) para Grafana/Prometheus en local?
