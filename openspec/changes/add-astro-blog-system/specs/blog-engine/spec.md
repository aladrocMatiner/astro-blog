## ADDED Requirements

### Requirement: Markdown-based technical blog
The project SHALL provide a blog system built with Astro that renders technical posts authored in Markdown (or MDX) including code blocks.

#### Scenario: Post appears from content source
- **WHEN** a developer adds a new post file in the documented content directory
- **THEN** the post appears in the blog listing and can be opened via its generated route

#### Scenario: Code blocks render correctly
- **WHEN** a post contains fenced code blocks
- **THEN** the rendered page displays the code block content in a readable format

### Requirement: Sample content for testing
The repository MUST include multiple sample posts (lorem ipsum) to exercise routing, listing, and rendering during development.

#### Scenario: Sample posts are present
- **WHEN** a developer starts the site locally
- **THEN** multiple sample posts are visible in the blog listing without additional setup
