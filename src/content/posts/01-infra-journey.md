---
title: "Infra as Code y despliegues reproducibles"
summary: "Documentamos cómo levantamos contenedores, proxies y métricas en un stack coherente."
publishDate: "2024-01-04"
tags: ["infra", "docker", "devops"]
---

```
docker compose up -d
docker compose logs -f astro
```

En este artículo revisamos cómo estructuramos la carpeta `infra/` y cómo usamos `docker-compose`
para combinar Astro, HAProxy y un stack de observabilidad. Los contenedores se conectan a una red
privada y comparten volúmenes para persistir dashboards y logs básicos.
