---
title: Terramate Cloud Locations and Data Residency
description: Learn about the different locations available to set up your Terramate Cloud account.
---

# Terramate Cloud Locations and Data Residency

When you create an account with Terramate Cloud, you select your location, which determines where we store your data:
in the United States (US) or European Union (EU).

We ensure that all your accounts' organizations and data are stored in the location that you choose. So, if you select the EU location,
all of the information that you sync with Terramate Cloud, such as stacks, previews and deployments, are stored exclusively in data centers
within EU member countries.

You cannot have Terramate Cloud account with organizations in different locations. All data in your account, and all of
your organizations resides within the location you select when you set up your account.

## Available locations

| Location                               | Code | Platform              | API                 | Reference Location    |
| -------------------------------------- | ---- | --------------------- | ------------------- | --------------------- |
| Europe  | eu   | cloud.terramate.io    | api.terramate.io    | St. Ghislain, Belgium |
| United States                          | us   | us.cloud.terramate.io | us.api.terramate.io | Columbus, OH, USA     |

## Configure the location in Terramate CLI

You can configure the location used by Terramate CLI in your Terramate [project configuration file](https://terramate.io/docs/cli/projects/configuration#project-configuration)
using the [`terramate.config.cloud` block](../cli/reference/configuration/index.md#terramateconfigcloud).

## Does my location affect feature availability?

Your location does not affect feature availability for our products.
The only difference between location is where your data resides.We release new features to both our US and EU location simultaneously.

## Can I migrate my account to another location?

We don’t support data center migrations except in extenuating circumstances.
Reach out to [hello@terramate.io](mailto:hello@terramate.io) or your customer success manager for additional information.
