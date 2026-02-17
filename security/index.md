---
title: Security and Data Access Overview
description: Learn about the required data access for Terramate CLI and Terramate Cloud.
outline: [2, 4]
---

# Security and Data Access Overview

This page provides an overview of what data [Terramate CLI](https://github.com/terramate-io/terramate) and
[Terramate Cloud](https://cloud.terramate.io/) access and process through the various integrations.
Terramate follows a unique approach by shifting all orchestration capabilities to the client side via
[Terramate CLI](https://github.com/terramate-io/terramate).

As a result, Terramate CLI and Terramate Cloud are designed to be highly secure:

- Terramate does not require any access to your cloud accounts.
- Terramate does not require any access to your state files.
- Terramate does not require any access to your source code.

This differentiates Terramate from other solutions such as purpose-built CI/CD
platforms for IaC, which typically require broad access to your state and cloud
accounts in order to deploy changes.

For details, see the following sections on this page.

## Terramate CLI

By default, Terramate CLI does not process or sync any data to Terramate Cloud.

When authenticating Terramate CLI with Terramate Cloud via the
[`terramate cloud login`](https://terramate.io/docs/cli/reference/cmdline/cloud/cloud-login)
command, plan files such as Terraform plans and metadata such as Git metadata can be synced **optionally** for
[Pull Requests](../previews/index.md), [Deployments](../deployments/index.md), and [Drift Detection Checks](../drift/index.md).

For details, see the [Cloud Sync](#cloud-sync) section.

### Cloud Sync

Terramate CLI optionally allows you to sync plans and metadata to Terramate Cloud,
allowing you to provide better Pull Request Previews, Deployment Insights,
Drift Detection, Asset Management, Policies, and more.

Syncing data to Terramate Cloud requires explicit **opt-in**, and is available for
the following operations:

- Syncing Pull Requests to Terramate Cloud via [`terramate run`](../cli/reference/cmdline/run.md) or custom workflows configured with [Terramate Scripts](https://terramate.io/docs/orchestration/scripts#command-options).
- Syncing Deployments to Terramate Cloud via [`terramate run`](../cli/reference/cmdline/run.md) or custom workflows configured with [Terramate Scripts](https://terramate.io/docs/orchestration/scripts#command-options).
- Syncing Health Checks such as Drift Checks to Terramate Cloud via [`terramate run`](../cli/reference/cmdline/run.md) or custom workflows configured with [Terramate Scripts](https://terramate.io/docs/orchestration/scripts#command-options).

For example, the following command creates a plan file `preview.tfplan` in all stacks, and syncs those as Pull Request Previews to Terramate Cloud:

```sh
terramate run \
  --sync-preview
  --terraform-plan-file=preview.tfplan \
  -- \
  terraform plan -out preview.tfplan -detailed-exitcode
```

This will:
1. Run the command `terraform plan -out preview.tfplan -detailed-exitcode` in each stack, which runs `terraform plan` and saves the plan to a file `preview.tfplan` in each stack.
2. Terramate then sanitizes those plans locally to redact all sensitive values.
3. Once sanitized, Terramate syncs all plan files to Terramate Cloud and bundles them as a new Pull Request Preview.

Sanitizing the plans guarantees that no sensitive data such as secrets, certificates, or any other form of sensitive data
is sent to Terramate Cloud. To learn more about how plan sanitization works, see the
[Plan Sanitization](#plan-sanitization) section on this page.

Once finished, Terramate Cloud summarizes all plans inside the pull request in your VCS.

![Pull Request Preview](./assets/pull-request-preview.png "Pull Request Preview")

### Which Data gets synced from Terramate CLI to Terramate Cloud

When syncing operations such as Pull Request Previews, Deployments, and Drift Checks from Terramate CLI to Terramate Cloud,
Terramate CLI syncs the following data:

- **[Extracted and sanitized data from plans](#plan-sanitization)**
- **GitHub metadata** (user has granular control of the token permissions)

| Scope              | Access / Data Processed                                                                                                                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pull Request API   | Number, Title, Body, Labels, Draft, Head branch, base branch, author, HEAD commit, URL, reviewers (name, username), Review Decision (approved, requested change, etc.)                                    |
| Checks API         | Successful / failed / pending jobs                                                                                                                                                                        |
| Github Actions API | Deployment Actor (`GITHUB_ACTOR` env), Triggered By Actor (`GITHUB_TRIGGERING_ACTOR` env), Run ID (`GITHUB_RUN_ID` env) and Run Attempt (`GITHUB_RUN_ATTEMPT` env), Workflow name (`GITHUB_WORKFLOW` env) |

- **GitLab metadata** (user has granular control of the token permissions)

| Scope             | Access / Data Processed                                                                               |
|-------------------|-------------------------------------------------------------------------------------------------------|
| Merge Request API | ID / IID, Project, Title, Body, Labels, Author, Target branch, Source branch, Draft, HEAD Commit, URL |
| CI/CD Info        | Pipeline Information (ID, Source, URL, etc), Job Information (ID, Name, Started At, etc)              |

- **Bitbucket metadata** (user has granular control of the token permissions)

| Scope             | Access / Data Processed                                                                               |
|-------------------|-------------------------------------------------------------------------------------------------------|
| Pull Request API | ID, Title, State, Author, Source/Destination branch, Reviewers, Participants |
| Pipelines Info   | Pipeline Information (UUID, Build Number, Step UUID, etc), Workspace and Project (Name, UUID, Slug name, etc) |

### Plan Sanitization

When syncing plans to Terramate Cloud, Terramate CLI first sanitizes plans locally using an
[open-source library](https://github.com/terramate-io/tfjson) that we maintain and welcome you to audit.

The following data is extracted from all JSON plan files and synced to Terramate Cloud if cloud sync is explicitly enabled via
opt-in:

- Resources
  - Name
  - Values (**REDACTED**)
- Providers used
- Data sources
  - Name
  - Values (**REDACTED**)
- Variables
  - Name
  - Values (**REDACTED**)
- Outputs
  - Name
  - Values (**REDACTED**)
- Provider config (**REDACTED**)
- Planned Values / Module Calls / Previous State, etc (all **REDACTED**)

## Terramate Cloud

### Data processed when authenticating with SSO

You can log in to Terramate Cloud using various SSO providers. Below is an overview of the data access requested for each provider.

#### Google SSO

- name, email address, language preferences and profile picture.

#### GitHub SSO

- Personal user data, email addresses

#### Microsoft Entra SSO

- name, email address, profile picture

#### GitLab SSO

- openid (Authenticate using OpenID Connect)
- profile (Allows read-only access to the user's personal information using OpenID Connect)
- email (Allows read-only access to the user's primary email address using OpenID Connect)

### Integrations

The following section explains the access scopes required by the individual integrations available in Terramate Cloud.

#### App for GitHub

::: info
The App for GitHub does not require any access to your source code.
:::

The [Terramate App for GitHub](https://github.com/apps/terramate-cloud) is required to provide previews inside [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) and to integrate
policy checks with the [GitHub Checks API](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks).

The following scopes are required when installing the App for GitHub.

- **Read** access to metadata
- **Read** and **write** access to actions, commit statuses, environments, and pull requests
- **Read** access to email addresses

![App for GitHub Required Scopes](./assets/github-app-scopes.png "App for GitHub Required Scopes")

#### GitLab

• **openid** (Authenticate using OpenID Connect)
• **profile** (Allows read-only access to the user's personal information using OpenID Connect)
• **email** (Allows read-only access to the user's primary email address using OpenID Connect)

When integrating [GitLab CI/CD](https://docs.gitlab.com/ee/ci/), the following scopes of permissions are required:

#### App for Slack

The App for Slack is used to integrate notifications such as [Alerts](../alerts/index.md) with your Slack Workspace
by providing a bot for Slack.

The following scopes of permissions are required to install the App for Slack in your workspace:

- For sending messages in public channels in your Workspace:
  - View basic information about public channels in your workspace
  - Send messages as @terramate
  - Send messages to channels @terramate is not a member of
- For mapping users with their Terramate Cloud profiles:
  - View people in your workspace
  - View email addresses of people in your workspace

![App for Slack Required Scopes](./assets/slack-app-scopes.png "App for Slack Required Scopes")

#### Webhook for Slack

In addition to the App for Slack, Terramate Cloud also allows you to configure a webhook for sending notifications about
failed deployments, detected drift, and other events to a centralized Slack channel.

This requires you to [configure a webhook](https://api.slack.com/messaging/webhooks) in your Slack workspace, authorized to
send messages to a selected channel. For details, see the [webhook documentation for Slack](https://api.slack.com/messaging/webhooks).
