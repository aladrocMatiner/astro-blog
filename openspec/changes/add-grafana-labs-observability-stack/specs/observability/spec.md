## ADDED Requirements

### Requirement: Local observability stack
The project SHALL include a Docker-based observability stack using Grafana, Prometheus, and Loki for local development and demos.

#### Scenario: Access Grafana UI
- **WHEN** the observability stack is started
- **THEN** the Grafana UI is reachable at a documented endpoint

### Requirement: Pre-provisioned data sources
Grafana MUST be provisioned with Prometheus and Loki data sources via versioned configuration.

#### Scenario: Query metrics and logs without manual setup
- **WHEN** a developer opens Grafana Explore
- **THEN** Prometheus and Loki are available as data sources without additional configuration
