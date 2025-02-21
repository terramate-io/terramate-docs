---
title: Data Residency
description: Learn about the required data access for Terramate CLI and Terramate Cloud.
---
# Data Residency

Terramate Cloud is built on multiple Google Cloud Platform (GCP) data centres distributed across defined regions.
Critical components, such as the database and cluster, are confined to a single region to ensure data consistency. At the same time, other services may operate across multiple regions in the US or the EU for enhanced performance and resiliency.
Configuration is managed through the[`terramate.config.cloud` block](../cli/reference/configuration/index.md#terramateconfigcloud). 
After configuring the hosting location, users access Terramate Cloud through the corresponding endpoint. 
For the EU region, use https://cloud.terramate.io, and for the US region, use https://us.cloud.terramate.io. 