---
title: "Analytics Lorem para Astro"
summary: "Lorem ipsum y medición de visitas mediante un tracker simple."
publishDate: "2024-01-06"
tags: ["analytics", "web", "telemetría"]
---
Lorem ipsum dolor sit amet, consectetur tracking.

El tracker registra cada carga de página y expone estadísticas en `/analytics/dashboard`.

```
POST /track HTTP/1.1
Host: localhost:4000
Content-Type: application/json

{ "path": "/blog", "referrer": "https://aladroc-test.io" }
```

Observa que `navigator.sendBeacon` se usa primero para evitar bloqueos de navegación.
