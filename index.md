---
title: Terramate Docs — The IaC Development Platform for Terraform & OpenTofu
description: Terramate gives every team one interface for Terraform and OpenTofu — from first deploy to production governance. Orchestrate, standardize, and automate Infrastructure as Code at any scale.
---

# Terramate Documentation

Terramate is the IaC development platform that gives every team one interface for Terraform and OpenTofu -- from first deploy to production governance.

With Terramate, you can:

- **Standardize** how environments are managed and code is structured across teams and repositories.
- **Automate** and orchestrate your IaC delivery pipelines in any CI/CD.
- **Enable self-service** so developers and AI agents can deploy even the most complex infrastructure without IaC expertise.
- **Put day-2 on autopilot** and let agents and scheduled workflows handle drift, upgrades, and remediation.
- **See everything** -- assets, changes, drift, and delivery performance, all in a single control plane.

## Start here

1. [Install Terramate CLI](/cli/installation)
2. Onboard your existing project:
   [Terraform](/get-started/terraform) |
   [OpenTofu](/get-started/opentofu) |
   [Terragrunt](/get-started/terragrunt)
3. Or alternatively: [Start from scratch]()
3. [Connect Terramate Cloud](/cloud/on-boarding/)

## Explore Terramate

### Define & structure your IaC

- **[Manage Environments](/)**: Standardize multi-environment delivery with components and bundles, and promote changes between environments with ease.
- **[Self-Service]()**: Developers can self-serve deployments of even complex infrastructure without needing to learn Terraform or OpenTofu internals.
- **[Code Generation](/cli/code-generation/)**: Keep IaC DRY while preserving native Terraform/OpenTofu output.

### Orchestrate & deliver

- **[Orchestration](/cli/orchestration/)**: Blazingly fast dependency-aware execution with change detection, parallel runs, and state-aware retries -- re-run only failed or drifted stacks instead of everything.
- **[CI/CD & GitOps](/cli/automation/)**: Automate delivery pipelines in GitHub Actions, GitLab CI, or Bitbucket Pipelines.
- **[Pull Request Previews](/cloud/previews/)**: Review proposed infrastructure changes, understand risk, and automatically merge low-risk pull requests before production.
- **[Deployments](/cloud/deployments/)**: Track delivery outcomes across repositories and teams.

### Collaborate, operate & observe

- **[Agents]()**: Use AI agents to provision infrastructure, remediate failures, and reduce day-2 effort.
- **[MCP Server & Agent Skills]()**: Use MCP servers and agent skills to bring Terramate Cloud context into your IDE and accelerate development workflows.
- **[Dashboard](/)**: Track deployments, drift, and infrastructure changes across environments in one control plane.
- **[Drift Management](/cloud/drift/)**: Detect and act on configuration drift before it becomes risk.
- **[Alerts](/)**: Get notified about drift, failures, and other critical events in real time.
- **[Policy Controls](/)**: Enforce governance and reduce misconfigurations before they reach production.
- **[DORA Insights](/)**: Measure and improve delivery performance across teams.
- **[SlackOps Workflows](/)**: Collaborate and act from team channels via Slack and Microsoft Teams integrations.
- **[Integrations]()**: Plug into OPA, Infracost, Checkov, Trivy, Terrascan, and more.

## See it in action

Learn more about Terramate in this 10-minute product walkthrough video.

<div class="tm-video-wrapper">
  <iframe
    class="tm-video-iframe"
    src="https://www.youtube.com/embed/Ryi1v62tHao"
    title="Terramate Overview"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

## Learn more

- [How Terramate works](/how-it-works)
- [Why Terramate](/why-terramate)
- [Guides](/cli/guides/)
