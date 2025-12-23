# Change: Upgrade observability collector and HAProxy TLS surface

## Why
(1) The observability change added Grafana/Prometheus/Loki but relies on Promtail, which is deprecated in favor of Grafana Alloy (Agent) for log collection. (2) HAProxy still exposes only HTTP routes; we need HTTPS termination for the documented domains and a repeatable way to generate CA and certificates for `aladroc-test.io`.

## What Changes
- Replace the log collector with the Grafana Alloy agent and document the migration.
- Update HAProxy configuration to expose www.aladroc-test.io and grafana.aladroc-test.io over HTTPS using generated certificates and document the process.
- Provide a script that creates a private CA plus certs for the required hosts and explains how to trust them locally.

## Impact
- Affected specs: `observability`, `reverse-proxy`
- Files: `docker-compose.yml` (Alloy, volumes, ports), `haproxy/haproxy.cfg`, `scripts/generate-certs.sh`, new cert outputs, README/AGENTS updates.
