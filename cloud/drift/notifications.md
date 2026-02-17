---
title: Drift Notifications
description: Learn how to configure Slack notifications for drift detection in Terramate Cloud.
---

# Drift Notifications

When the Webhook URL for Slack is configured in the [General Organization settings](../organization/settings.md), notifications will be sent to the corresponding Slack Channel.

## New Drift Notification

A notification will be sent for each stack that newly drifts, even if multiple stacks drift in the same drift check run.

If a stack is already in a drifted state, no further notification will be sent until the drift is resolved and the stack drifts again.

The notification will include detailed information about the drifted stack and provide a link to Terramate Cloud to view the detailed drift as a Terraform Plan.

## Initial Drift Run

When onboarding to Terramate Cloud, we recommended running a drift check before setting up notifications, especially if the initial run is expected to detect many drifted stacks.

After completing the initial drift check, you can set up the Webhook for Slack to notify the channel only of new drifts.
