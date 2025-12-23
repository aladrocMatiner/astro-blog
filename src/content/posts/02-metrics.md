---
title: "Monitoreo con Grafana Labs y logs en Loki"
summary: "Desde Prometheus hasta Loki, la observabilidad se monta con configuraciones versionadas."
publishDate: "2024-01-10"
tags: ["monitoring", "grafana", "loki"]
---

La idea es que cada servicio exponga métricas (Prometheus) y envíe logs (Loki) usando un
collector ligero. En esta prueba, `promtail` lee los logs de Docker y los envía a Loki, mientras
que Prometheus hace scraping del HAProxy para conocer el tráfico entrante y el tiempo de respuesta.

```js
console.log('Simplificando métricas en el blog');
```

El dashboard pre-provisionado en Grafana muestra uptime y logs recientes sin intervención manual.
