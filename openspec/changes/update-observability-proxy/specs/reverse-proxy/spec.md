## MODIFIED Requirements

### Requirement: HAProxy routes HTTP traffic
The project SHALL provide an HAProxy-based reverse proxy that routes inbound requests to Astro, observability UIs, and analytics services. The proxy MUST also terminate HTTPS for `www.aladroc-test.io` and `grafana.aladroc-test.io` using the generated certificates and continue to expose the analytics script (`/analytics.js`) plus the tracker endpoints (`/track`, `/stats`, `/analytics/dashboard`).

#### Scenario: TLS hosts reach the right services
- **WHEN** a browser requests `https://www.aladroc-test.io/` or `https://grafana.aladroc-test.io/`
- **THEN** HAProxy terminates TLS with the local certificate bundle and forwards traffic to Astro or Grafana respectively

#### Scenario: Analytics resources are proxied
- **WHEN** a call is made to `/analytics`, `/analytics.js`, or `/track`
- **THEN** HAProxy routes the traffic to the analytics backend regardless of whether the request comes from `aladroc-test.io` or `www.aladroc-test.io`

## ADDED Requirements

### Requirement: TLS certificate generator
The stack SHALL provide a reproducible script that creates a private CA plus signed certificates for `aladroc-test.io`, `www.aladroc-test.io`, and `grafana.aladroc-test.io` so HAProxy can terminate HTTPS locally without relying on real certificates.

#### Scenario: Generate the certificate bundle
- **WHEN** a developer runs `bash scripts/generate-certs.sh`
- **THEN** the script writes a CA certificate plus `haproxy.pem` containing the required SANs under `certs/` so HAProxy can mount them on startup
