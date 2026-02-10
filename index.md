---
title: What is Terramate?
description: Terramate is an AI-first Infrastructure as Code development platform that helps teams deploy and manage cloud infrastructure faster, with less risk and toil, and greater value from their existing IaC investments.
---

# About Terramate

Terramate is the **Infrastructure as Code (IaC) Development Platform** that helps **platform teams**, **developers**, and **AI agents** deploy and
manage cloud infrastructure at scale with Terraform, OpenTofu, Terragrunt, and Kubernetes so they can **ship faster across teams**,
**reduce risk and platform toil**, and **maximize the value of their existing IaC** investment.

It combines:

<div class="tm-overview-grid">
  <a href="https://github.com/terramate-io/terramate" class="tm-overview-card" target="_blank" rel="noreferrer noopener">
    <h3>Terramate CLI <span class="tm-badge">OSS</span></h3>
    <p class="tm-persona">For individual platform engineers and application developers.</p>
    <p class="tm-capabilities">Boost individual productivity with environment management, developer self-service, CI/CD automation, and DRY repositories.</p>
  </a>
  <a href="https://cloud.terramate.io" class="tm-overview-card" target="_blank" rel="noreferrer noopener">
    <h3>Terramate Cloud <span class="tm-badge">SaaS</span> <span class="tm-badge">Self-host</span></h3>
    <p class="tm-persona">For platform and development teams operating multiple environments.</p>
    <p class="tm-capabilities">Improve team collaboration with full visibility, SlackOps, AI agents, governance, and DORA-based delivery insights.</p>
  </a>
</div>

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

::: tip
Terramate is **not** a CI/CD platform. It integrates with your existing CI/CD systems, such as GitHub Actions, GitLab CI/CD, Bitbucket, Azure DevOps, Atlantis, CircleCI, Jenkins, and others.
::::

## What you can do with Terramate

### Build and standardize infrastructure

Build and scale infrastructure platforms with consistent delivery:

- **Environments**: Organize infrastructure into clear deployable units and manage dev, staging, and production with consistent promotion workflows.
- **Standardization**: Separate code and configuration to keep infrastructure reproducible and roll out provider or module upgrades without blocking teams.
- **Multi-state environments**: Split state across environments and services to reduce blast radius and speed up `plan/apply` runtimes.
- **Code generation**: Keep configuration DRY and standardized without custom wrappers, including day-2 automation such as provider upgrades.
- **Native infrastructure code**: Stay in native tools like Terraform without complex wrappers or abstraction layers.

### Automate operations in any CI/CD

Automate your end-to-end infrastructure lifecycle in the CI/CD platform you already use:

- **Pull request previews**: Review proposed infrastructure changes, understand risk, and automatically merge low-risk pull requests before production.
- **Graph-based orchestration**: Run IaC deployments safely across stacks with dependency-aware execution and change detection.
- **State-aware orchestration**: Re-run only failed or drifted stacks instead of rerunning every stack after failures.
- **GitOps workflows**: Run pre-configured and fully customizable GitOps automation workflows.
- **Bring your own CI/CD**: Orchestrate IaC deployments in GitHub Actions, GitLab CI/CD, Bitbucket, Azure DevOps, and more.
- **Guardrails**: Apply policy and safety checks before infrastructure changes are executed.

### Enable self-service and AI-first workflows

Increase developer velocity while reducing operational toil:

- **Self-service**: Let developers and AI agents provision, manage, and change infrastructure without deep IaC expertise.
- **Agents**: Use AI agents to provision infrastructure, remediate failures, and reduce day-2 effort.
- **MCP integrations**: Use MCP servers and agent skills to bring Terramate Cloud context into your IDE and accelerate development workflows.

### Collaborate, operate and govern at team scale

Give teams shared visibility and stronger governance across infrastructure operations:

- **Visibility control plane**: Track deployments, drift, and infrastructure changes across environments.
- **SlackOps workflows**: Collaborate and act from team channels via Slack and Microsoft Teams integrations.
- **Policy controls**: Enforce governance and reduce misconfigurations before they reach production.
- **DORA insights**: Measure and improve delivery performance across teams.
- **Integrations and tooling**: Plug into OPA, Infracost, Checkov, Trivy, Terrascan, Terragrunt, and more.

## Next steps

- [How Terramate works](/how-it-works)
- [Why Terramate](/why-terramate)
- [Getting Started](cli/on-boarding/terraform)

Questions? Join our [Discord Community](https://terramate.io/discord) or [book a demo](https://terramate.io/discord).
