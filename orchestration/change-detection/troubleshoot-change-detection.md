---
title: Troubleshoot Change Detection
description: Diagnose why stacks are unexpectedly included or excluded by --changed.
type: how-to
outline: [2, 4]
---

# Troubleshoot Change Detection

## Checks

1) Verify changed set:

```sh
terramate list --changed
```

2) Compare with and without dependency filters:

```sh
terramate list --changed --include-all-dependencies
terramate list --changed --exclude-all-dependencies
```

3) Review local change settings (`untracked`, `uncommitted`) in config.

4) Confirm integration behavior for Git/Terraform/Terragrunt.

## Common causes

- Untracked or uncommitted local files included by policy
- Dependency filters widening/replacing the set
- Module changes outside stack dirs captured by integration settings
