---
title: "Analíticas self-hosted para el blog"
summary: "Exploramos Umami (u otra alternativa) para evitar depender de Google Analytics."
publishDate: "2024-02-02"
tags: ["analytics", "privacy", "umami"]
---

El objetivo es capturar pageviews y eventos simples sin enviar datos a terceros. Usamos un snippet
JS que dispara un `window.umami.trackView()` en cada plantilla de Astro, y un dashboard que muestra
visitas agrupadas por ruta.

```html
<script async defer data-website-id="tu-web-id" src="http://localhost:3001/umami.js"></script>
```

En la siguiente fase conectaremos métricas personalizadas y exportaremos datos hacia el observability stack.
