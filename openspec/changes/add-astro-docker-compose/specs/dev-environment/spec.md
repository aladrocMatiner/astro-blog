## ADDED Requirements

### Requirement: Dockerized Astro development
The project SHALL provide a Docker Compose-based development environment to run the Astro dev server and the project's test commands.

#### Scenario: Start Astro in Docker
- **WHEN** a developer runs `docker compose up astro`
- **THEN** the Astro dev server is reachable from the host on a documented port

#### Scenario: Run tests in Docker
- **WHEN** a developer runs `docker compose run --rm astro npm test`
- **THEN** the configured test command executes inside the container using the local workspace source

### Requirement: Reproducible Node toolchain
The container image MUST pin a Node.js version (via the base image tag) to keep local and CI behavior consistent.

#### Scenario: Node version is stable
- **WHEN** the container image is built
- **THEN** the documented `node --version` expectation is satisfied
