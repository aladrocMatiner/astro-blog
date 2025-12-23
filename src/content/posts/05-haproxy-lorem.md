---
title: "HAProxy y Lorem Routing"
summary: "Lorem ipsum y configuración de HAProxy para múltiples hosts en un único proxy."
publishDate: "2024-01-08"
tags: ["haproxy", "proxy", "routing"]
---
Lorem ipsum dolor sit amet, pero en este post guardamos notas sobre ACL y backends.

```
backend grafana
  http-request replace-path ^/grafana/(.*) /\1
```

Ese fragmento se asegura de que Grafana esté bajo `/grafana` mientras que `/analytics` mantiene su propio backend.
