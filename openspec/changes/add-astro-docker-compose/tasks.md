## 1. Implementation
- [ ] 1.1 Crear un proyecto base de Astro (mínimo) en el repo
- [ ] 1.2 Definir comando de tests (por ejemplo `npm test` ejecutando `astro check` + `astro build`)
- [ ] 1.3 Añadir `Dockerfile` (Node LTS) para desarrollo/ejecución de comandos
- [ ] 1.4 Añadir `docker-compose.yml` con servicio `astro` (volumen del workspace, puerto documentado)
- [ ] 1.5 Añadir `.dockerignore` y asegurar builds rápidos
- [ ] 1.6 Documentar en `README.md` cómo levantar `dev` y ejecutar `test` en contenedor

## 2. Validation
- [ ] 2.1 Verificar `docker compose up astro` (dev server accesible)
- [ ] 2.2 Verificar `docker compose run --rm astro npm test`
