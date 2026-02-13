---
title: Sync Deployments from CI/CD
description: Push deployment metadata to Terramate Cloud from automation workflows.
type: how-to
outline: [2, 4]
---

# Sync Deployments from CI/CD

## Steps

1) Authenticate CLI in CI with `terramate cloud login` (or OIDC/workload identity setup).

2) Run deployment commands with sync flags:

```sh
terramate run --changed --sync-deployment -- terraform apply -auto-approve
```

3) If using plan files, include the plan sync flag where supported.

## Expected result

- Terramate Cloud receives deployment runs and per-stack outcomes
- Deployment history becomes visible in Cloud UI
