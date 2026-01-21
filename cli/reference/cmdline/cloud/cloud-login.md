---
title: terramate cloud login - Command
description: Sign in to Terramate Cloud and create a session for Terramate CLI to interact with Terramate Cloud features from your local machine by using the `terramate cloud login` command.
---

# Cloud Login

The `terramate cloud login` command authorizes Terramate CLI to access Terramate Cloud.

::: info
To sign in from the CLI, the Account needs to be created on [Terramate Cloud](https://cloud.terramate.io) first.
:::

::: tip
You can link your Account to multiple social login providers in your Account Settings on Terramate Cloud.
:::

## Usage

### Authenticate using Google Social Login

```sh
terramate cloud login --google
```

### Authenticate using GitHub Social Login

```sh
terramate cloud login --github
```

### Authenticate using SSO

```sh
terramate cloud login --sso
```

### Authenticate using Microsoft Social Login

::: warning
Microsoft Login from CLI is not yet supported.

Please use GitHub or another social login.

You can link your account to other social login providers in your 'Account Settings' on Terramate Cloud.
:::
