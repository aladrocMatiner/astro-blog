---
title: "Observabilidad Lorem Ipsum"
summary: "Lorem ipsum dolors tracking de métricas y logs en un stack técnico."
publishDate: "2024-01-10"
tags: ["observabilidad", "grafana", "prometheus"]
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. En este experimento documentamos cómo la observabilidad se vuelve parte del flujo de trabajo.

```
bash
# Revisión rápida del pipeline
docker compose logs --tail 20 grafana
docker compose logs --tail 20 loki
```

Vemos que Grafana carga el dashboard `Astro + HAProxy Overview` con datos frescos gracias a las métricas de Prometheus y el agente Alloy.
