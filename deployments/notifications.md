---
title: Deployment Notifications
description: Learn how to get notified about new deployments via Terramate Cloud.
---

# Deployment Notifications

When the WebHook URL for Slack is configured in the [General Organization settings](/settings/settings.md), notifications will be sent to the corresponding Slack Channel.

## Deployment Notifications

For every deployment, a notification will be sent that summarizes the results of all stacks involved in the deployment.

The number of successful and failed deployments will be shown and links to deployment details pages in Terramate Cloud will grant access to the logs of the failed deployments and show each stack's detailed status.

## Deployment Grouping

When a deployment runs through multiple workflows or within a matrix (e.g., in GitHub Actions), Terramate Cloud uses a best-effort strategy to group the different flows. In rare cases, this may result in delayed grouping and duplicated notifications.

If deployment grouping fails, multiple deployments will appear in Terramate Cloud.
