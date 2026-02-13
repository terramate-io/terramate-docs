# AGENTS.md

This file provides guidance for AI coding agents working on the Terramate documentation site.

---

## Project Overview

**Terramate Docs** is the official documentation site for Terramate, built with [VitePress](https://vitepress.dev/) (v1.x). It covers two products:

- **Terramate CLI** — Open-source IaC platform for Terraform, OpenTofu, and Terragrunt: stacks, environment management, code generation, dependency-aware orchestration, change detection, parallel execution, state-aware retries, CI/CD & GitOps automation, and self-service infrastructure
- **Terramate Cloud** — SaaS/BYOC platform for visibility, collaboration, and governance: dashboard, pull request previews, deployment tracking, drift management, alerts, policy controls, DORA insights, AI agents, MCP server & skills, SlackOps workflows, and integrations

**Published at**: https://terramate.io/docs/

**Tech Stack**:
- **Static site generator**: VitePress 1.x (Vite + Vue 3)
- **Package manager**: pnpm (v10+)
- **Linting**: ESLint with `@antfu/eslint-config`
- **Hosting**: Netlify
- **Diagrams**: Mermaid (via `vitepress-plugin-mermaid`)

---

## Repository Structure

```
.
├── .agents/               # Agent skills installed via `npx skills`
├── .cursor/               # Cursor IDE skills (local)
│   └── skills/
│       ├── docs-build-preflight/   # Build & lint preflight checklist
│       └── terramate-source-verification/  # Verify docs against source code
├── .vitepress/
│   ├── config.ts          # Site config (nav, sidebar, head, plugins)
│   └── theme/             # Custom theme overrides (CSS, Vue layout)
│
│   # ── Feature-area content (flat, one directory per topic) ──
├── environments/          # Environment management, bundles, components
├── stacks/                # Stack lifecycle (create, configure, nest, clone, etc.)
├── self-service/          # Self-service scaffolding, collections, bundles
├── code-generation/       # HCL/file generation, tmgen
├── orchestration/         # Orchestration, change detection, outputs sharing
├── ci-cd/                 # CI/CD & GitOps automation
├── deployments/           # Deployment tracking
├── previews/              # Pull request previews
├── drift/                 # Drift management
├── dashboard/             # Dashboard & control plane
├── alerts/                # Alerts & notifications
├── policies/              # Policy controls
├── integrations/          # GitHub, Slack integrations
├── ai-agents-mcp/         # AI agents, MCP server & skills
├── settings/              # Administration & settings
├── security/              # Security & data residency
│
│   # ── Diataxis quadrants ──
├── get-started/           # Onboarding guides (Terraform, OpenTofu, Terragrunt)
├── guides/                # How-to guides (task-oriented)
├── explanations/          # Concepts / mental models (Diataxis Explanation)
├── reference/             # Cloud API reference
│
│   # ── Legacy paths (redirected, still contain some content) ──
├── cli/                   # CLI reference (commands, functions, blocks, variables)
├── cloud/                 # Legacy Cloud docs (being migrated to flat structure)
│
│   # ── Infrastructure & top-level files ──
├── public/                # Static assets (logos, favicons, OG images)
├── index.md               # Landing page (overview)
├── how-it-works.md        # Architecture, workflow, CLI example
├── why-terramate.md       # Value proposition
├── glossary.md            # Term definitions
├── changelog.md           # Release changelog
├── package.json
├── netlify.toml           # Redirects & deploy config
└── eslint.config.js
```

---

## Setup Commands

### Prerequisites

```bash
# Install pnpm if not already available
# See https://pnpm.io/installation

# Install Node.js (check .tool-versions for required version)
asdf install
```

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
# Start dev server with hot reload
pnpm start
# or
pnpm docs:dev
```

### Build

```bash
# Production build (must pass before committing)
pnpm docs:build
```

### Preview

```bash
# Preview the production build locally
pnpm docs:preview
```

### Lint

```bash
# Run ESLint
pnpm lint

# Auto-fix lint issues
pnpm lint:fix
```

---

## Writing & Editing Docs

### Keeping AGENTS.md Up to Date

If you make changes that affect the structure, conventions, or content organization described in this file -- such as adding or renaming directories, changing sidebar groups, updating writing conventions, or modifying build commands -- you **must** update this `AGENTS.md` file in the same changeset. This file is the single source of truth for agents; stale guidance leads to stale output.

### Grammar & Style Guide

Follow these conventions across all documentation pages:

- **Tone**: Professional, concise, and direct. Write in second person ("you") when addressing the reader.
- **Contractions**: Do not use contractions. Write "do not" instead of "don't", "does not" instead of "doesn't", "is not" instead of "isn't", etc.
- **Active voice**: Prefer active voice over passive. Write "Terramate syncs the data" instead of "The data is synced by Terramate."
- **Present tense**: Use present tense for descriptions. Write "Terramate CLI runs locally" instead of "Terramate CLI will run locally."
- **Oxford comma**: Always use the Oxford comma. Write "stacks, previews, and deployments" instead of "stacks, previews and deployments."
- **Compound modifiers**: Hyphenate compound modifiers before a noun. Write "dependency-aware execution", "push-based model", "data-center migrations."
- **Product names**: Use correct casing: "GitHub" (not "Github"), "GitLab" (not "Gitlab"), "OpenTofu" (not "Opentofu"), "Terramate" (not "terramate" in prose).
- **Filler words**: Remove filler. Write "see the section" instead of "please consider the following section." Avoid "So,", "Basically,", "In order to" (use "to").
- **Formal register**: Use "log in" (verb) not "login" (noun/adjective used as verb). Use "set up" (verb) not "setup" (noun used as verb).
- **Lists**: Use sentence fragments for bullet points when describing features. Use full sentences for instructions or explanations.
- **Consistent terminology**: Use "environment" not "env", "configuration" not "config" (in prose, not in code), "pull request" not "PR" (in prose).

### Markdown Conventions

- **File-based routing**: Each `.md` file maps to a URL path (e.g., `cli/stacks/create.md` → `/docs/stacks/create`)
- **Frontmatter**: Use YAML frontmatter for page metadata (`title`, `description`, `outline`, etc.)
- **Vue components**: Can be used directly in Markdown files
- **Code blocks**: Use fenced code blocks with language tags; VitePress supports syntax highlighting, line highlighting, diffs, and focus
- **Mermaid diagrams**: Supported via `vitepress-plugin-mermaid` — use ` ```mermaid ` code blocks
- **Internal links**: Use relative paths without `.md` extension (e.g., `[Stacks](/stacks/)`)
- **Images**: Place in the relevant `assets/` directory close to the Markdown file, or in `public/` for global assets

### Documentation Structure (Diataxis)

The docs follow a [Diataxis](https://diataxis.fr/)-inspired structure. Content is organized into four quadrants:

| Quadrant | Sidebar group | Purpose |
|----------|---------------|---------|
| **Tutorials** | Learning Terramate > Tutorials | Learning-oriented, step-by-step onboarding |
| **How-to Guides** | Learning Terramate > Guides | Task-oriented, solve a specific problem |
| **Explanation** | Concepts | Mental models for stacks, orchestration, change detection, code generation |
| **Reference** | Reference | CLI commands, functions, blocks, variables, Cloud API |

When adding new content, decide which quadrant it belongs to. Do not mix quadrants within a single page (e.g., do not put tutorial steps inside a reference page).

### Navigation & Sidebar

- **Sidebar configuration** lives in `.vitepress/config.ts` under `themeConfig.sidebar`
- **Nav bar** is configured in `themeConfig.nav`
- When adding or moving pages, update the sidebar config to match
- Validate sidebar links after navigation changes

The sidebar has seven top-level groups:

| Sidebar Group | Content |
|---------------|---------|
| Get Started | Overview, CLI installation, onboarding guides |
| Overview | How Terramate Works, Why Terramate |
| Concepts | Stacks Model, Orchestration Model, Change Detection Model, Code Generation Model |
| Learning Terramate | Tutorials (onboarding, migrations, reference architectures) and Guides (task-oriented how-tos) |
| Platform | Manage Environments, Orchestration & Automation, Operations & Governance, Integrations, AI Agents & MCP, Administration |
| Reference | Glossary, Cloud API, Variable Namespaces, Blocks, Variables, Functions, CLI Commands, CLI Authentication, Configuration Reference, Telemetry |
| Dev Tooling | MCP Server, Agent Skills, VSCode/Cursor, JetBrains, VIM, Language Server |

### Content Directories

| Directory | Covers |
|-----------|--------|
| `/environments/` | Environment management, bundles, components |
| `/stacks/` | Stack lifecycle (create, configure, nest, clone, delete, sync) |
| `/self-service/` | Self-service scaffolding, collections, bundle instantiation |
| `/code-generation/` | HCL and file generation, tmgen |
| `/orchestration/` | Orchestration, change detection, outputs sharing |
| `/ci-cd/` | CI/CD and GitOps automation |
| `/deployments/` | Deployment tracking |
| `/previews/` | Pull request previews |
| `/drift/` | Drift management |
| `/dashboard/` | Dashboard and control plane |
| `/alerts/` | Alerts and notifications |
| `/policies/` | Policy controls |
| `/integrations/` | GitHub, Slack integrations |
| `/ai-agents-mcp/` | AI agents, MCP server and skills |
| `/settings/` | Administration and settings |
| `/security/` | Security, data processing, data residency |
| `/get-started/` | Onboarding guides (Terraform, OpenTofu, Terragrunt) |
| `/guides/` | How-to guides |
| `/explanations/` | Concepts and mental models |
| `/reference/` | Cloud API reference |
| `/cli/reference/` | CLI commands, functions, blocks, variables (legacy path, still active) |

> **Note**: The path `/environment-management/` was renamed to `/environments/`. All internal links have been updated. Do not use the old path.

---

## Build & PR Guidelines

### Before Every Commit

1. **Build the docs** — the build must pass:
   ```bash
   pnpm docs:build
   ```
2. **Lint** — fix any issues:
   ```bash
   pnpm lint:fix
   ```
3. **Re-build after fixes** to confirm nothing is broken:
   ```bash
   pnpm docs:build
   ```

### Before Submitting a PR

- Ensure linting passes (`pnpm lint`)
- Ensure the build is green (`pnpm docs:build`)
- Preview the site locally if the change affects layout or navigation (`pnpm docs:preview`)
- Verify internal links are not broken
- If sidebar/nav changed, validate in `.vitepress/config.ts`

### PR Title Format

```
docs: add scaffold how-to guide
docs: fix broken links in CLI orchestration section
docs: update Cloud deployment synchronization page
```

### PR Description Should Include

- **What**: Summary of documentation changes
- **Why**: What was missing, incorrect, or outdated
- **Pages affected**: List of modified/added pages
- **Screenshots**: If layout or visual changes are involved

---

## Agent Skills

This project uses agent skills to accelerate documentation work. Skills are auto-loaded by Cursor from two locations:

| Skill | Location | Purpose |
|-------|----------|---------|
| VitePress | `.agents/skills/vitepress/SKILL.md` | VitePress SSG reference (config, routing, themes, deployment) |
| Docs Build Preflight | `.cursor/skills/docs-build-preflight/SKILL.md` | Mandatory pre-commit build & lint checklist |
| Source Verification | `.cursor/skills/terramate-source-verification/SKILL.md` | Verify docs against Terramate CLI source code |

### Managing Skills

```bash
# Update all installed skills
pnpm run skills:update

# Or update deps + skills together
pnpm run deps:update
```

---

## Common Pitfalls

### 1. Broken Internal Links

VitePress uses `cleanUrls: true` — do not include `.html` or `.md` extensions in links. Use:
- `/stacks/` (correct)
- `/stacks/create` (correct)
- `/stacks/create.md` (incorrect — will break)

### 2. Sidebar Mismatch

Adding a new page without updating `.vitepress/config.ts` sidebar config means the page exists but is unreachable from navigation. Always update both.

### 3. Image Paths

- Assets in `public/` are served from the site root (e.g., `public/logo-dark.svg` → `/docs/logo-dark.svg`)
- Assets in content directories (e.g., `cloud/assets/`) should be referenced with relative paths

### 4. Build Failures

Common causes:
- Dead links to pages that were moved or deleted
- Missing frontmatter in new pages
- Broken Vue component imports in Markdown
- Syntax errors in `.vitepress/config.ts`

Always run `pnpm docs:build` to catch these before committing.

---

## Related Repositories

- **Terramate CLI** (open source): https://github.com/terramate-io/terramate
- **Examples** (bundles, components, environments, self-service): https://github.com/terramate-io/terramate-catalyst-examples

---
