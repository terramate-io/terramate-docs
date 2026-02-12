---
title: Sync Your First Deployment to Terramate Cloud
description: Learn how to push deployment data from Terramate CLI to Terramate Cloud.
type: tutorial
outline: [2, 4]
---

# Sync Your First Deployment to Terramate Cloud

In this tutorial, you will run a deployment with Terramate CLI and verify it appears in Terramate Cloud.

## Prerequisites

- Terramate CLI installed
- Terramate Cloud account and organization
- A repository with at least one stack

## Step 1: Authenticate CLI

```sh
terramate cloud login
```

## Step 2: Run a synced deployment

```sh
terramate run --changed --sync-deployment -- terraform apply -auto-approve
```

## Step 3: Verify in Cloud

- Open Terramate Cloud
- Navigate to Deployments
- Confirm the run and stack statuses are visible

## What you learned

- How CLI execution syncs metadata to Cloud
- How deployment visibility is surfaced per stack
