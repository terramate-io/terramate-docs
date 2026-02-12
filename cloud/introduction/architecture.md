---
title: Cloud Architecture
description: Understand how Terramate CLI and Terramate Cloud interact through a push-based data flow.
type: explanation
outline: [2, 4]
---

# Cloud Architecture

Terramate uses a push model: CLI executes workflows locally or in CI/CD, then sends metadata and status to Terramate Cloud.

## Architectural characteristics

- CLI remains execution plane for IaC commands
- Cloud acts as coordination and observability plane
- No direct Cloud access to your IaC state or cloud accounts is required for core sync

## Data flow

- Runs, previews, drifts, and deployments are produced by CLI workflows
- Metadata is sent to Cloud APIs
- Cloud enriches collaboration and visibility across teams
