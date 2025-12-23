## ADDED Requirements

### Requirement: Self-hosted page view analytics
The project SHALL provide a self-hosted analytics solution that records page views per page (route/path) for the Astro site.

#### Scenario: Page view is recorded
- **WHEN** a visitor loads a page of the Astro site
- **THEN** a page view event is recorded and becomes visible in the analytics dashboard within a reasonable delay

### Requirement: Privacy-first defaults
The analytics deployment MUST use privacy-first defaults appropriate for a technical blog (for example: no third-party sharing and configurable retention).

#### Scenario: Default configuration is documented
- **WHEN** a developer reads the project documentation
- **THEN** the analytics defaults (retention, cookies, anonymization) are clearly described
