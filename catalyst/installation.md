---
title: How to Install Terramate Catalyst
description: Learn how to install Terramate Catalyst.
outline: [2, 4]
---

# How to install Terramate Catalyst

> [!NOTE]
> Terramate Catalyst is a special distribution of Terramate CLI supporting all the same base features but adding additional capabilities to make it scalable for any size of teams.

This page explains how to install and configure Terramate Catalyst.

## Install the CLI

The first step you need to take is to install [Terramate Catalyst](https://github.com/terramate-io/terramate-catalyst):

::: code-group
<!-- ```sh [macOS]
brew install terramate-catalyst
``` -->

```sh [Ubuntu & Debian]
# Add the Terramate repo to your sources
echo "deb [trusted=yes] https://repo.terramate.io/apt/ /" \
  | sudo tee /etc/apt/sources.list.d/terramate.list

apt update
apt install terramate-catalyst
```

```sh [Fedora & CentOS]
# Add the Terramate repo to your sources
sudo tee /etc/yum.repos.d/terramate.repo <<EOF
[terramate]
name=Terramate Repository
baseurl=https://repo.terramate.io/yum/
enabled=1
gpgcheck=0
EOF

dnf install terramate-catalyst
```

```txt [Windows]
Download the binary from
https://github.com/terramate-io/terramate-catalyst/releases
```
:::

This will install two binaries:

- `terramate`: The CLI tool used to create, manage IaC bundles and components in self-service.
- `terramate-ls`: The Terramate Language Server to integrate Terramate Catalyst into your IDE.

For other installation methods, please see [alternative installation methods](#alternative-installation-methods).

### IDE Plugin

For the best developer experience, we recommend you install an IDE plugin of your choice that integrates the Terramate
language server and syntax highlighting into your IDE:

- Install the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=Mineiros.terramate#review-details)
- Install the [JetBrains IDEs Plugin](https://plugins.jetbrains.com/plugin/28890-terramate)
- Install the [VIM plugin](https://terramate.io/rethinking-iac/announcing-terramate-vim-plugin/)

### Auto completion

Terramate supports the autocompletion of commands for _bash_, _zsh_ and _fish_. To
install the completion just run the command below and open a new shell session:

```sh
terramate install-completions
```

## Alternative installation methods

### Using Asdf package manager

You can install Terramate Catalyst using [asdf](https://asdf-vm.com/):

```sh
asdf plugin add terramate-catalyst https://github.com/terramate-io/asdf-terramate-catalyst
asdf set -u terramate-catalyst latest
```

### Using release binaries

To install Terramate Catalyst using a release binary, follow these steps:

1. Visit the [Terramate Catalyst Releases page](https://github.com/terramate-io/terramate-catalyst/releases).

2. Download the appropriate package for your operating system and architecture.

3. Decompress the package somewhere on your disk. _Note: all files in the package other than `terramate` and `terramate-ls` can be safely deleted_.

4. Ensure that the `terramate` and `terramate-ls` binaries are available to your `PATH`.
   The process for this will vary based on your operating system.