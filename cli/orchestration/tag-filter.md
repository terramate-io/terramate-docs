---
title: Tag Filter
description: The tag filter returns a list of stacks containing tags that satisfy the filter query.
---

# Tag Filter

The **Tag Filter** can be used in multiple Terramate features:

- [stack.after](../stacks/configuration.md#stackafter-setstringoptional)
- [stack.before](../stacks/configuration.md#stackbefore-setstringoptional)
- `terramate <cmd> --tags <filter>`
- `terramate <cmd> --no-tags <filter>`

Using the `tags` filter, you can list or run commands on stacks based on tag conditions. Use `--tags` to filter stacks having specific tags and `--no-tags` to filter those without the specified tags. The `--tags` filter support using AND (`:`) and OR (`,`) for more complex queries, while the `--no-tags` filter supports using OR (`,`).
The query language is best explained with some examples but a formal
definition can be found [here](#filter-grammar).

#### Examples of Commands with `--tags` and `--no-tags`

- **Listing stacks**:
  - `terramate list --tags abc`: Lists stacks with the tag `abc`.
  - `terramate list --no-tags xyz`: Lists stacks without the tag `xyz`.
  - `terramate list --tags abc:xyz`: Lists stacks containing both `abc` **AND** `xyz`.
  - `terramate list --tags app:k8s,app:nomad`: Lists stacks containing both `app` **AND** `k8s` or both `app` **AND** `nomad`.

- **Running commands in stacks**:
  - `terramate run --tags abc -- echo "hi from stack with tag abc"`: Runs the command in stacks with the tag `abc`.
  - `terramate run --no-tags xyz -- echo "hi from stack without tag xyz"`: Runs the command in stacks without the tag `xyz`.

- **Running Terramate scripts**:
  - `terramate script run --tags abc myscript`: Runs `myscript` in stacks with the tag `abc`.
  - `terramate script run --no-tags xyz myscript`: Runs `myscript` in stacks without the tag `xyz`.

Notes:

- The `:` character defines the **AND** operation and the `,` character the **OR**
operation. They can be freely combined but no explicit grouping is supported (yet).
- `--no-tags` flag does not support AND (`:`). In fact, it only supports OR (`,`). `terramate list --no-tags xyz,abc` will list stacks without the tag `xyz` **OR** `abc`.

## Filter Grammar

Below is the formal grammar definition:

```txt
query         ::= or_term {',' or_term}
or_term       ::= and_term {':' and_term}
and_term      ::= tagname
tagname       ::= ident
ident         ::= allowedchars { allowedchars } | allowedchars
allowedchars  ::= lowercase | digit | '-' | '_' | '.' | '/'
digit         ::= '0' ... '9'
lowercase     ::= 'a' | 'b' | ... | 'z'
```

The `ident` definition is a simplification and you should refer to
[stack.tags](../stacks/configuration.md#stacktags-setstringoptional) for the correct definition
(in prose) for the expected declaration of tag names.
