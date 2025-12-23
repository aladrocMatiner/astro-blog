## 1. Decision
- [x] 1.1 Definir criterios de selección (privacidad, simplicidad, recursos, licencia, DB requerida)
- [x] 1.2 Evaluar 2–4 candidatos (Umami/Plausible/GoatCounter/Matomo u otros) y escoger uno
- [x] 1.3 Documentar la decisión y configuración por defecto (retención, cookies, DNT, anonimización)

## 2. Implementation
- [x] 2.1 Añadir servicios Docker necesarios (analytics + DB si aplica)
- [x] 2.2 Integrar el tracking en Astro (layout/base) y configurar dominios/paths
- [x] 2.3 Exponer el dashboard vía HAProxy (si aplica) con acceso controlado para local
- [x] 2.4 Documentar uso: cómo ver stats y cómo resetear datos en local

## 3. Validation
- [x] 3.1 Verificar que visitar una página incrementa el contador en el dashboard
