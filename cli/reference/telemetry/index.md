---
title: Telemetry
description: Learn how Terramate collects and uses anonymous telemetry data and how to manage it.
---

# Telemetry

Terramate CLI collects anonymous usage metrics to improve the tool and enhance the user experience. These metrics help us understand how users interact with Terramate and identify areas for improvement.

## Data Collected

The following information is collected during Terramate usage:
- Command: For example, `run`.
- Command Sub-Features: Tracks whether a feature or flag, like `parallel`, was used. No additional details are collected.
- CI/CD Platform: If applicable, identify platforms like GitHub or GitLab.
- CI/CD Platform Repository Owner: Identifies the organization that owns the repository, such as terramate-io for https://github.com/terramate-io/terramate.
- Cloud Authentication Method: If used, identify methods like IDP or OIDC.
- Operating System: Captures the user’s OS.
- Terramate Version: Tracks the version in use.
- Session Signature: A randomly generated signature helps correlate metrics over time.
- Terramate Cloud Organization: Collected only if the user is logged in.
- Terramate Cloud User ID: Collected only if the user is logged in.

## Data Transmission

Collected metrics are sent to https://analytics.terramate.io using a best-effort approach. This ensures the main Terramate command execution is not delayed by telemetry operations.

## Disabling Telemetry

Telemetry collection can be disabled through either of the following methods:
- Project Configuration: Add the following setting to your project configuration:
```
terramate.config.telemetry.enabled = false
```
- User Configuration: Add the following setting in your user configuration:
```
disable_telemetry = true
```
