## ADDED Requirements

### Requirement: HAProxy routes HTTP traffic
The project SHALL provide an HAProxy-based reverse proxy that routes inbound HTTP requests to the Astro service.

#### Scenario: Request homepage through proxy
- **WHEN** a request is made to the proxy endpoint for `/`
- **THEN** the response is served by the Astro service

### Requirement: Extensible routing configuration
The HAProxy configuration MUST support adding additional backends (for example, observability UIs) via versioned configuration changes.

#### Scenario: Add a new backend route
- **WHEN** a new backend is added to the HAProxy configuration
- **THEN** it can be exposed under a documented host or path without changing the Astro container
