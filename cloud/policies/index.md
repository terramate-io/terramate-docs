---
title: Policies in Terramate Cloud
description: Learn how to detect and prevent misconfigurations of your infrastructure resources with policies in Terramate Cloud.
---

# Terramate Cloud Policies

Policies in Terramate Cloud help secure your infrastructure by detecting misconfigurations on a per-resource level. They leverage the industry-standard [CIS Benchmarks](./index.md#the-cis-benchmarks) to automatically analyze your infrastructure as code (IaC) changes and deployed resources.

## What Do Policies Do?

- **Misconfiguration Detection:** Policies inspect each resource for potential security misconfigurations. This precise, per-resource analysis helps you catch vulnerabilities early.
- **Automated Analysis:** When you deploy changes or run scheduled [drift detection](../drift/index.md), policies automatically verify that your configurations meet the prescribed security standards.

## The CIS Benchmarks

The **Center for Internet Security (CIS)** is a nonprofit organization that promotes best security practices. CIS develops, validates, and publishes security benchmarks with prescriptive instructions for implementing industry-standard controls. These benchmarks cover:
- Major cloud providers like AWS, Google Cloud, and Microsoft Azure
- Platforms such as Kubernetes and various operating systems

Using the CIS Benchmarks within Terramate Cloud helps you secure your IT environment, reduce risk, and ensure compliance with best practices. They are widely recognized as the industry standard for securely configuring cloud infrastructure.

## How Policies Work

Terramate Cloud integrates more than 500 built-in policies based on the CIS Benchmarks. These policies run during scheduled drift detection workflows, continuously monitoring the deployed infrastructure to ensure that all resources remain compliant with defined security standards. This process regularly identifies any misconfigurations or deviations, helping you maintain a secure and compliant environment over time.

## Integration with the Resource Browser

Policies are tightly integrated with the [Resource Browser](../resources/index.md) in Terramate Cloud. This integration provides you with a comprehensive view of:
- Current misconfigurations across all your resources
- The severity of each detected issue

This centralized dashboard is handy when multiple teams manage IaC across various repositories, allowing you to maintain a strong security posture throughout your organization.
