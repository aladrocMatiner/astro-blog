## MODIFIED Requirements

### Requirement: Local observability stack
The project SHALL include a Docker-based observability stack using Grafana, Prometheus, and Loki for local development and demos. The stack MUST use the Grafana Alloy agent (the latest Grafana Agent distribution) to capture logs instead of the deprecated Promtail component.

#### Scenario: Access Grafana UI
- **WHEN** the observability stack is started
- **THEN** the Grafana UI is reachable at a documented endpoint

#### Scenario: Alloy ingests container logs
- **WHEN** the observability stack is running
- **THEN** the Grafana Alloy agent streams Docker logs into Loki without additional configuration changes

### Requirement: Pre-provisioned data sources
Grafana MUST be provisioned with Prometheus and Loki data sources via versioned configuration.

#### Scenario: Query metrics and logs without manual setup
- **WHEN** a developer opens Grafana Explore
- **THEN** Prometheus and Loki are available as data sources without additional configuration
### Requirement: Application and proxy monitoring dashboards
Grafana MUST include dashboards that visualize Astro container metrics (CPU/memory/logs) and HAProxy metrics/logs so the application and reverse proxy health is observable from a single view.

#### Scenario: Indeed Astro is monitored
- **WHEN** Grafana is started with the provisioned dashboard
- **THEN** Astro’s CPU, memory, and recent logs are visible without further configuration

#### Scenario: HAProxy is monitored
- **WHEN** Grafana is started with the provisioned dashboard
- **THEN** HAProxy sessions, request rate, and logs are visible without additional configuration
