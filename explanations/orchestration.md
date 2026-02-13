---
title: Orchestration Model
description: Learn how Terramate builds and executes safe stack execution plans.
type: explanation
---

# Orchestration Model

Orchestration turns a selected set of stacks into an execution plan that preserves required ordering while maximizing safe parallelism.

## Execution planning phases

1. Select candidate stacks (scope, tags, status, changed)
2. Build dependency/ordering constraints
3. Compute execution groups (parallelizable batches)
4. Execute with safeguards and failure behavior

## Conceptual model

```mermaid
flowchart LR
  selection[Stack Selection] --> graph[Execution Graph]
  graph --> batches[Parallel Batches]
  batches --> run[terramate run]
  run --> results[Per-Stack Results]
```

## Ordering vs data dependencies

- **Ordering constraints** (`before`, `after`, hierarchy) define execution sequence.
- **Data dependencies** (outputs sharing, Terragrunt dependencies) define data flow.

These overlap sometimes, but they are different concerns and should be modeled separately.

## Why this separation matters

- predictable and auditable runs
- higher safe parallelism
- reduced accidental coupling

## Related docs

- How-to: [Run Commands in Stacks](/orchestration/run-commands-in-stacks)
- How-to: [Order of Execution](/orchestration/order-of-execution)
- How-to: [Parallel Execution](/orchestration/parallel-execution)
- Reference: [`terramate run`](/cli/reference/cmdline/run)
