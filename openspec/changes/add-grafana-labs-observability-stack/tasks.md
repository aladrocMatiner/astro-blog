## 1. Implementation
- [x] 1.1 Añadir servicios Docker: `grafana`, `prometheus`, `loki` y un collector de logs
- [x] 1.2 Versionar configuraciones: `prometheus.yml`, `loki` config y provisioning de Grafana (datasources/dashboards)
- [x] 1.3 Definir persistencia (volúmenes) y retención mínima razonable para local
- [x] 1.4 Añadir routing por HAProxy (si está presente) para exponer UIs bajo rutas/hosts documentados
- [x] 1.5 Documentar uso: cómo entrar a Grafana, credenciales locales, y cómo verificar logs/métricas

## 2. Validation
- [x] 2.1 Verificar que Grafana arranca y tiene data sources Prometheus y Loki sin configuración manual
- [x] 2.2 Verificar que llegan logs al menos de los contenedores del stack
