## MODIFIED Requirements

### Requirement: Local observability stack
The project SHALL include a Grafana/Prometheus/Loki stack for local development. The stack MUST use the Grafana Alloy agent (the latest Grafana Agent distribution) to capture logs instead of the deprecated Promtail component and it MUST continue to ingest Astro and HAProxy container logs into Loki without manual reconfiguration.

#### Scenario: Alloy streams Astro and HAProxy logs
- **WHEN** the observability stack is started with the Grafana Alloy agent
- **THEN** Astro and HAProxy container logs appear in Loki with their respective labels and can be explored via the pre-provisioned dashboards

#### Scenario: Alloy stays compatible with existing dashboards
- **WHEN** a developer opens Grafana after restarting the stack
- **THEN** the Astro/Haproxy panels show recent log entries and no additional configuration is required
