---
title: Set Up Drift Detection
description: Set up repeatable drift detection with CI/CD, Terramate CLI, and Terramate Cloud.
---

# Set Up Drift Detection

Use this guide to detect drift continuously and route incidents to the right owners.

## Outcome

You will run scheduled and post-deployment drift checks, synchronize results to Terramate Cloud, and notify teams through alerts.

## Step 1: Understand drift workflow

- [Drift Management overview](/drift/)
- [Set Up Drift Detection](/drift/set-up-drift-detection)

## Step 2: Implement a CI/CD drift workflow

Pick your platform:

- [GitHub Actions drift check workflow](/ci-cd/github-actions/drift-check-workflow)
- [GitLab CI drift check workflow](/ci-cd/gitlab-ci/drift-check-workflow)
- [Bitbucket drift check workflow](/ci-cd/bitbucket-pipelines/drift-check-workflow)

## Step 3: Sync and inspect drift in Cloud

- [Synchronize in Automation](/drift/synchronization-in-automation)
- [Synchronize from CLI](/drift/synchronization-from-cli)
- [Dashboard resources](/dashboard/)

## Step 4: Wire up notifications

- [Get Drift Notifications](/drift/notifications)
- [Set Up Drift Alerts in Slack](/drift/set-up-drift-alerts-in-slack)
- [Alerts overview](/alerts/)

## Step 5: Add guardrails

- [Policies](/policies/)
- [Security and Data Processing](/security/)

## Related CLI references

- [`terramate run`](/cli/reference/cmdline/run)
- [`terramate cloud drift show`](/cli/reference/cmdline/cloud/drift/cloud-drift-show)
