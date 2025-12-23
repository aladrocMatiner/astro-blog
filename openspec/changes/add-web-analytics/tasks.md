## 1. Decision
- [ ] 1.1 Definir criterios de selección (privacidad, simplicidad, recursos, licencia, DB requerida)
- [ ] 1.2 Evaluar 2–4 candidatos (Umami/Plausible/GoatCounter/Matomo u otros) y escoger uno
- [ ] 1.3 Documentar la decisión y configuración por defecto (retención, cookies, DNT, anonimización)

## 2. Implementation
- [ ] 2.1 Añadir servicios Docker necesarios (analytics + DB si aplica)
- [ ] 2.2 Integrar el tracking en Astro (layout/base) y configurar dominios/paths
- [ ] 2.3 Exponer el dashboard vía HAProxy (si aplica) con acceso controlado para local
- [ ] 2.4 Documentar uso: cómo ver stats y cómo resetear datos en local

## 3. Validation
- [ ] 3.1 Verificar que visitar una página incrementa el contador en el dashboard
