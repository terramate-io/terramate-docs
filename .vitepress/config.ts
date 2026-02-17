import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

function getPath(path: string) {
  const uri = path.replace(/(?:(^|\/)index)?\.md$/, '$1')

  return uri === 'index' ? '' : uri
}

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  lastUpdated: true,
  title: 'Terramate Docs',
  // titleTemplate: ':title - Terramate',
  description: 'Terramate CLI is an open-source Infrastructure as Code (IaC) orchestration tool for Terraform, OpenTofu and Terragrunt.',
  // Mermaid enabled via vitepress-plugin-mermaid
  sitemap: {
    hostname: 'https://terramate.io/docs/',
  },
  cleanUrls: true,
  transformHead: async ({ pageData, siteData }) => {
    const head: HeadConfig[] = [
      [
        'link',
        {
          rel: 'canonical',
          href: `https://terramate.io/docs/${getPath(
            pageData.relativePath,
          )}`,
        },
      ],
      // Google Tag Manager
      [
        'script',
        { id: 'register-gtm' },

        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-5KZT64L');`,
      ],
      [
        'link',
        {
          rel: 'icon',
          sizes: '48x48',
          href: `${siteData.base}favicons/favicon.ico`,
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/svg+xml',
          sizes: 'any',
          href: `${siteData.base}favicons/favicon.svg`,
        },
      ],
      [
        'link',
        {
          rel: 'apple-touch-icon',
          href: `${siteData.base}favicons/apple-touch-icon.png`,
        },
      ],
      [
        'meta',
        {
          name: 'og:type',
          content: 'website',
        },
      ],
      [
        'meta',
        {
          property: 'og:image',
          content: `https://terramate.io${siteData.base}terramate-og_linkedin.png`,
        },
      ],
      [
        'meta',
        {
          property: 'twitter:image',
          content: `https://terramate.io${siteData.base}terramate-og_twitter.png`,
        },
      ],
      [
        'meta',
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
      [
        'meta',
        {
          name: 'twitter:creator',
          content: '@terramateio',
        },
      ],
      // [
      //   'link',
      //   {
      //     rel: 'manifest',
      //     href: `${siteData.base}favicons/site.webmanifest`,
      //   },
      // ],
      // ["meta", { name: "msapplication-TileColor", content: "#3a0839" }],
      // [
      //   "meta",
      //   {
      //     name: "msapplication-config",
      //     content: "/favicons/browserconfig.xml",
      //   },
      // ],
      // ["meta", { name: "theme-color", content: "#ffffff" }],
    ]

    return head
  },
  // https://vitepress.dev/reference/site-config#appearance
  appearance: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config#sitetitle
    // siteTitle: '🦄 Terramate',
    siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config#logo
    logo: {
      light: '/logo-white.svg',
      dark: '/logo-dark.svg',
      alt: 'Terramate',
    },
    outline: [2, 3],

    // https://vitepress.dev/reference/default-theme-search#local-search
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          },
        },
      },
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/' },
      { text: 'Get Started', link: '/get-started/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'API Reference', link: '/reference/cloud-api/' },
      {
        text: 'Resources',
        items: [
          { text: 'Glossary', link: '/glossary' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Releases', link: 'https://github.com/terramate-io/terramate/releases' },
        ],
      },
      { text: 'Blog', link: 'https://terramate.io/rethinking-iac' },
      { text: 'Terramate Cloud', link: 'https://cloud.terramate.io/' },
    ],

    sidebar: [
      {
        text: 'Get Started',
        collapsed: false,
        items: [
          { text: 'Welcome', link: '/' },
          { text: 'Install Terramate CLI', link: '/cli/installation' },
          { text: 'Onboard Terraform', link: '/get-started/terraform' },
          { text: 'Onboard OpenTofu', link: '/get-started/opentofu' },
          { text: 'Onboard Terragrunt', link: '/get-started/terragrunt' },
        ],
      },
      {
        text: 'Overview',
        items: [
          { text: 'How Terramate Works', link: '/how-it-works' },
          { text: 'Why Terramate', link: '/why-terramate' },

        ],
      },
      {
        text: 'Concepts',
        collapsed: true,
        items: [
          { text: 'Stacks Model', link: '/explanations/stacks' },
          { text: 'Orchestration Model', link: '/explanations/orchestration' },
          { text: 'Change Detection Model', link: '/explanations/change-detection' },
          { text: 'Code Generation Model', link: '/explanations/code-generation' },
        ],
      },
      {
        text: 'Learning Terramate',
        collapsed: true,
        items: [
          {
            text: 'Tutorials',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/tutorials/' },
              { text: 'Learn Terramate from scratch', link: '/tutorials/migrate-from-terragrunt' },
              { text: 'Migrate from Terragrunt', link: '/tutorials/migrate-from-terragrunt' },
              { text: 'Migrate from Terraform', link: '/tutorials/migrate-from-plain-terraform' },
              {
                text: 'Reference Architectures',
                collapsed: true,
                items: [
                  { text: 'AWS', link: 'https://github.com/terramate-io/terramate-catalyst-examples' },
                  { text: 'Microsoft Azure', link: 'https://github.com/terramate-io/terramate-quickstart-azure' },
                  {
                    text: 'Terragrunt',
                    link: 'https://github.com/terramate-io/terramate-terragrunt-infrastructure-live-example',
                  },
                ],
              },
            ],
          },
          {
            text: 'Guides',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/guides/' },
              { text: 'Migrate from Terragrunt', link: '/guides/migrate-from-terragrunt' },
              { text: 'Migrate from Terraform', link: '/guides/migrate-from-plain-terraform' },
              { text: 'Manage Terraform at Scale', link: '/guides/manage-terraform-at-scale' },
              { text: 'Set Up Terramate Cloud', link: '/guides/set-up-terramate-cloud' },
              { text: 'Set Up Drift Detection', link: '/guides/set-up-drift-detection' },
              { text: 'Migrate from Terragrunt', link: '/guides/migrate-from-terragrunt' },
              { text: 'Migrate from Terraform', link: '/guides/migrate-from-plain-terraform' },
            ],
          },

        ],

      },
      {
        text: 'Platform',
        items: [
          {
            text: 'Manage Environments',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/environments/' },
              { text: 'Environments', link: '/environments/environments' },
              {
                text: 'Bundles',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/environments/bundles' },
                  { text: 'Create a Component and Bundle', link: '/environments/create-a-component-and-bundle' },
                  { text: 'Reference Bundle Values in Codegen', link: '/environments/reference-bundle-values-in-codegen' },
                  { text: 'Package a Catalog', link: '/environments/package-catalog' },
                  { text: 'Bundle Definition (Reference)', link: '/environments/reference/bundle-definition' },
                ],
              },
              {
                text: 'Components',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/environments/components' },
                  { text: 'Convert Module to Component', link: '/environments/convert-module-to-component' },
                  { text: 'Component Definition (Reference)', link: '/environments/reference/component-definition' },
                ],
              },
              {
                text: 'Stacks',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/stacks/' },
                  { text: 'Create Stacks', link: '/stacks/create' },
                  { text: 'Configure Stacks', link: '/stacks/configuration' },
                  { text: 'Nesting Stacks', link: '/stacks/nesting' },
                  { text: 'Clone Stacks', link: '/stacks/clone' },
                  { text: 'Manage Stacks', link: '/stacks/manage' },
                  { text: 'Delete Stacks', link: '/stacks/delete' },
                  { text: 'Stack Status', link: '/stacks/status' },
                  { text: 'View Stacks', link: '/stacks/list' },
                  { text: 'View Stack Details', link: '/stacks/details' },
                  { text: 'Synchronize Stacks', link: '/stacks/sync' },
                  { text: 'Using Workspaces', link: '/stacks/using-workspaces' },
                ],
              },
              {
                text: 'Self-Service',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/self-service/' },
                  { text: 'Scaffolding & Generation', link: '/self-service/scaffolding-and-generation' },
                  { text: 'Collections', link: '/self-service/collections' },
                  { text: 'Instantiate Your First Bundle', link: '/self-service/instantiate-your-first-bundle' },
                  { text: 'Instantiate a Bundle via CLI', link: '/self-service/instantiate-bundle-cli' },
                  { text: 'Reconfigure a Bundle', link: '/self-service/reconfigure-bundle' },
                  { text: 'Use a Remote Catalog', link: '/self-service/use-remote-catalog' },
                  { text: 'Bundle Instantiation (Reference)', link: '/self-service/reference/bundle-instantiation' },
                ],
              },
              {
                text: 'Code Generation',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/code-generation/' },
                  { text: 'Generate ad-hoc HCL', link: '/code-generation/tmgen' },
                  { text: 'Generate HCL', link: '/code-generation/generate-hcl' },
                  { text: 'Generate Files', link: '/code-generation/generate-file' },
                  { text: 'Generate Backend and Provider Config', link: '/code-generation/generate-backend-and-provider-configuration' },
                ],
              },
            ],
          },
        {
          text: 'Orchestration & Automation',
          collapsed: true,
          items: [
            {
              text: 'Orchestration',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/orchestration/' },
                { text: 'Run Commands in Stacks', link: '/orchestration/run-commands-in-stacks' },
                { text: 'Order of Execution', link: '/orchestration/order-of-execution' },
                { text: 'Configure Order of Execution', link: '/orchestration/configure-order-of-execution' },
                { text: 'Parallel Execution', link: '/orchestration/parallel-execution' },
                { text: 'Set Up Parallel Execution', link: '/orchestration/set-up-parallel-execution' },
                { text: 'Tag Filter', link: '/orchestration/tag-filter' },
                { text: 'Scripts', link: '/orchestration/scripts' },
                { text: 'Safeguards', link: '/orchestration/safeguards' },
                { text: 'Runtime Configuration', link: '/orchestration/runtime-configuration' },
                { text: 'Outputs Sharing', link: '/orchestration/outputs-sharing' },
                { text: 'Share Outputs Between Stacks', link: '/orchestration/share-outputs-between-stacks' },
              ],
            },
            {
              text: 'Change Detection',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/orchestration/change-detection/' },
                { text: 'Run Commands Across Changed Stacks', link: '/orchestration/change-detection/run-commands-across-changed-stacks' },
                { text: 'File Watchers', link: '/orchestration/change-detection/file-watchers' },
                { text: 'Stack Triggers', link: '/orchestration/change-detection/stack-triggers' },
                { text: 'Troubleshoot Change Detection', link: '/orchestration/change-detection/troubleshoot-change-detection' },
                {
                  text: 'Integrations',
                  collapsed: true,
                  items: [
                    { text: 'Git', link: '/orchestration/change-detection/integrations/git' },
                    { text: 'Terraform', link: '/orchestration/change-detection/integrations/terraform' },
                    { text: 'OpenTofu', link: '/orchestration/change-detection/integrations/opentofu' },
                    { text: 'Terragrunt', link: '/orchestration/change-detection/integrations/terragrunt' },
                  ],
                },
              ],
            },
            {
              text: 'CI/CD',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/ci-cd/' },
                {
                  text: 'GitHub Actions',
                  collapsed: true,
                  items: [
                    { text: 'Overview', link: '/ci-cd/github-actions/' },
                    { text: 'Deployment Workflow', link: '/ci-cd/github-actions/deployment-workflow' },
                    { text: 'Drift Check Workflow', link: '/ci-cd/github-actions/drift-check-workflow' },
                    { text: 'Preview Workflow', link: '/ci-cd/github-actions/preview-workflow' },
                  ],
                },
                {
                  text: 'GitLab CI',
                  collapsed: true,
                  items: [
                    { text: 'Overview', link: '/ci-cd/gitlab-ci/' },
                    { text: 'Deployment Workflow', link: '/ci-cd/gitlab-ci/deployment-workflow' },
                    { text: 'Drift Check Workflow', link: '/ci-cd/gitlab-ci/drift-check-workflow' },
                    { text: 'Preview Workflow', link: '/ci-cd/gitlab-ci/preview-workflow' },
                  ],
                },
                {
                  text: 'Bitbucket Pipelines',
                  collapsed: true,
                  items: [
                    { text: 'Overview', link: '/ci-cd/bitbucket-pipelines/' },
                    { text: 'Deployment Workflow', link: '/ci-cd/bitbucket-pipelines/deployment-workflow' },
                    { text: 'Drift Check Workflow', link: '/ci-cd/bitbucket-pipelines/drift-check-workflow' },
                    { text: 'Preview Workflow', link: '/ci-cd/bitbucket-pipelines/preview-workflow' },
                  ],
                },
              ],
            },
          ],
        },
          {
            text: 'Operations & Governance',
            collapsed: true,
            items: [
              { text: 'Dashboard', link: '/dashboard/' },
              { text: 'Deployments', link: '/deployments/' },
              { text: 'Pull Request Previews', link: '/previews/' },
              { text: 'Drift Management', link: '/drift/' },
              { text: 'Alerts', link: '/alerts/' },
              { text: 'Policies', link: '/policies/' },
            ],
          },
          {
            text: 'Integrations',
            collapsed: true,
            items: [
              { text: 'GitHub', link: '/integrations/github/' },
              { text: 'Slack', link: '/integrations/slack' },
            ],
          },
          {
            text: 'AI Agents & MCP',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/ai-agents-mcp/' },
            ],
          },
          {
            text: 'Administration',
            collapsed: true,
            items: [
              { text: 'Settings & Admin', link: '/settings/' },
              { text: 'Security', link: '/security/' },
            ],
          },
        ],

      },
      {
        text: 'Reference',
        collapsed: true,
        items: [
          { text: 'Glossary', link: '/glossary' },
          {
            text: 'Cloud API',
            collapsed: true,
            link: '/reference/cloud-api/',
            items: [
              { text: 'Overview', link: '/reference/cloud-api/' },
              { text: 'Authentication', link: '/reference/cloud-api/authentication' },
              { text: 'Rate Limits', link: '/reference/cloud-api/rate-limits' },
              { text: 'Errors', link: '/reference/cloud-api/errors' },
              { text: 'Deployments API', link: '/reference/cloud-api/deployments' },
              { text: 'Drift API', link: '/reference/cloud-api/drift' },
              { text: 'Previews API', link: '/reference/cloud-api/previews' },
              { text: 'Stacks API', link: '/reference/cloud-api/stacks' },
              { text: 'Alerts API', link: '/reference/cloud-api/alerts' },
            ],
          },
          {
            text: 'Variable Namespaces',
            collapsed: true,
            link: '/cli/reference/variables/',
            items: [
              { text: 'Metadata', link: '/cli/reference/variables/metadata' },
              { text: 'Bundle & Component', link: '/environments/reference/variables' },
            ],
          },
          {
            text: 'Blocks',
            collapsed: true,
            items: [
              { text: 'terramate', link: '/cli/reference/blocks/terramate' },
              { text: 'stack', link: '/cli/reference/blocks/stack' },
              { text: 'environment', link: '/environments/environments' },
              { text: 'define bundle', link: '/environments/reference/bundle-definition' },
              { text: 'define component', link: '/environments/reference/component-definition' },
              { text: 'generate_hcl', link: '/cli/reference/blocks/generate-hcl' },
              { text: 'generate_file', link: '/cli/reference/blocks/generate-file' },
              { text: 'globals', link: '/cli/reference/blocks/globals' },
              { text: 'lets', link: '/cli/reference/blocks/lets' },
              { text: 'map', link: '/cli/reference/blocks/map' },
              { text: 'script', link: '/cli/reference/blocks/script' },
              { text: 'assert', link: '/cli/reference/blocks/assert' },
              { text: 'import', link: '/cli/reference/blocks/import' },
              { text: 'input / output', link: '/orchestration/outputs-sharing' },
              { text: 'sharing_backend', link: '/orchestration/outputs-sharing' },
              { text: 'vendor', link: '/cli/reference/configuration/' },
            ],
          },
          {
            text: 'Variables',
            collapsed: true,
            items: [
              { text: 'Globals', link: '/cli/reference/variables/globals' },
              { text: 'Lets', link: '/cli/reference/variables/lets' },
              { text: 'Metadata', link: '/cli/reference/variables/metadata' },
              { text: 'Map', link: '/cli/reference/variables/map' },
            ],
          },
          {
            text: 'Functions',
            collapsed: true,
            link: '/cli/reference/functions/',
            items: [
              {
                text: 'Terramate',
                collapsed: true,
                items: [
                  { text: 'tm_ternary', link: '/cli/reference/functions/tm_ternary' },
                  { text: 'tm_hcl_expression', link: '/cli/reference/functions/tm_hcl_expression' },
                  { text: 'tm_version_match', link: '/cli/reference/functions/tm_version_match' },
                  { text: 'tm_bundle', link: '/environments/reference/functions/tm_bundle' },
                  { text: 'tm_bundles', link: '/environments/reference/functions/tm_bundles' },
                  { text: 'tm_source', link: '/environments/reference/functions/tm_source' },
                ],
              },
              {
                text: 'Numeric Functions',
                collapsed: true,
                items: [
                  { text: 'tm_abs', link: '/cli/reference/functions/tm_abs' },
                  { text: 'tm_ceil', link: '/cli/reference/functions/tm_ceil' },
                  { text: 'tm_floor', link: '/cli/reference/functions/tm_floor' },
                  { text: 'tm_log', link: '/cli/reference/functions/tm_log' },
                  { text: 'tm_max', link: '/cli/reference/functions/tm_max' },
                  { text: 'tm_min', link: '/cli/reference/functions/tm_min' },
                  { text: 'tm_parseint', link: '/cli/reference/functions/tm_parseint' },
                  { text: 'tm_pow', link: '/cli/reference/functions/tm_pow' },
                  { text: 'tm_signum', link: '/cli/reference/functions/tm_signum' },
                ],
              },
              {
                text: 'String Functions',
                collapsed: true,
                items: [
                  { text: 'tm_chomp', link: '/cli/reference/functions/tm_chomp' },
                  { text: 'tm_format', link: '/cli/reference/functions/tm_format' },
                  { text: 'tm_formatlist', link: '/cli/reference/functions/tm_formatlist' },
                  { text: 'tm_indent', link: '/cli/reference/functions/tm_indent' },
                  { text: 'tm_join', link: '/cli/reference/functions/tm_join' },
                  { text: 'tm_lower', link: '/cli/reference/functions/tm_lower' },
                  { text: 'tm_regex', link: '/cli/reference/functions/tm_regex' },
                  { text: 'tm_regexall', link: '/cli/reference/functions/tm_regexall' },
                  { text: 'tm_replace', link: '/cli/reference/functions/tm_replace' },
                  { text: 'tm_split', link: '/cli/reference/functions/tm_split' },
                  { text: 'tm_strcontains', link: '/cli/reference/functions/tm_strcontains' },
                  { text: 'tm_startswith', link: '/cli/reference/functions/tm_startswith' },
                  { text: 'tm_endswith', link: '/cli/reference/functions/tm_endswith' },
                  { text: 'tm_strrev', link: '/cli/reference/functions/tm_strrev' },
                  { text: 'tm_substr', link: '/cli/reference/functions/tm_substr' },
                  { text: 'tm_title', link: '/cli/reference/functions/tm_title' },
                  { text: 'tm_trim', link: '/cli/reference/functions/tm_trim' },
                  { text: 'tm_trimprefix', link: '/cli/reference/functions/tm_trimprefix' },
                  { text: 'tm_trimsuffix', link: '/cli/reference/functions/tm_trimsuffix' },
                  { text: 'tm_trimspace', link: '/cli/reference/functions/tm_trimspace' },
                  { text: 'tm_unslug', link: '/cli/reference/functions/tm_unslug' },
                  { text: 'tm_upper', link: '/cli/reference/functions/tm_upper' },
                ],
              },
              {
                text: 'Collection Functions',
                collapsed: true,
                items: [
                  { text: 'tm_alltrue', link: '/cli/reference/functions/tm_alltrue' },
                  { text: 'tm_anytrue', link: '/cli/reference/functions/tm_anytrue' },
                  { text: 'tm_chunklist', link: '/cli/reference/functions/tm_chunklist' },
                  { text: 'tm_coalesce', link: '/cli/reference/functions/tm_coalesce' },
                  { text: 'tm_coalescelist', link: '/cli/reference/functions/tm_coalescelist' },
                  { text: 'tm_compact', link: '/cli/reference/functions/tm_compact' },
                  { text: 'tm_concat', link: '/cli/reference/functions/tm_concat' },
                  { text: 'tm_contains', link: '/cli/reference/functions/tm_contains' },
                  { text: 'tm_distinct', link: '/cli/reference/functions/tm_distinct' },
                  { text: 'tm_element', link: '/cli/reference/functions/tm_element' },
                  { text: 'tm_flatten', link: '/cli/reference/functions/tm_flatten' },
                  { text: 'tm_index', link: '/cli/reference/functions/tm_index' },
                  { text: 'tm_joinlist', link: '/cli/reference/functions/tm_joinlist' },
                  { text: 'tm_keys', link: '/cli/reference/functions/tm_keys' },
                  { text: 'tm_length', link: '/cli/reference/functions/tm_length' },
                  { text: 'tm_lookup', link: '/cli/reference/functions/tm_lookup' },
                  { text: 'tm_matchkeys', link: '/cli/reference/functions/tm_matchkeys' },
                  { text: 'tm_merge', link: '/cli/reference/functions/tm_merge' },
                  { text: 'tm_one', link: '/cli/reference/functions/tm_one' },
                  { text: 'tm_range', link: '/cli/reference/functions/tm_range' },
                  { text: 'tm_reverse', link: '/cli/reference/functions/tm_reverse' },
                  { text: 'tm_setintersection', link: '/cli/reference/functions/tm_setintersection' },
                  { text: 'tm_setproduct', link: '/cli/reference/functions/tm_setproduct' },
                  { text: 'tm_setsubtract', link: '/cli/reference/functions/tm_setsubtract' },
                  { text: 'tm_setunion', link: '/cli/reference/functions/tm_setunion' },
                  { text: 'tm_slice', link: '/cli/reference/functions/tm_slice' },
                  { text: 'tm_sort', link: '/cli/reference/functions/tm_sort' },
                  { text: 'tm_sum', link: '/cli/reference/functions/tm_sum' },
                  { text: 'tm_transpose', link: '/cli/reference/functions/tm_transpose' },
                  { text: 'tm_tree', link: '/cli/reference/functions/tm_tree' },
                  { text: 'tm_values', link: '/cli/reference/functions/tm_values' },
                  { text: 'tm_zipmap', link: '/cli/reference/functions/tm_zipmap' },
                ],
              },
              {
                text: 'Encoding Functions',
                collapsed: true,
                items: [
                  { text: 'tm_base64decode', link: '/cli/reference/functions/tm_base64decode' },
                  { text: 'tm_base64encode', link: '/cli/reference/functions/tm_base64encode' },
                  { text: 'tm_base64gzip', link: '/cli/reference/functions/tm_base64gzip' },
                  { text: 'tm_csvdecode', link: '/cli/reference/functions/tm_csvdecode' },
                  { text: 'tm_jsondecode', link: '/cli/reference/functions/tm_jsondecode' },
                  { text: 'tm_jsonencode', link: '/cli/reference/functions/tm_jsonencode' },
                  { text: 'tm_tomlencode', link: '/cli/reference/functions/tm_tomlencode' },
                  { text: 'tm_tomldecode', link: '/cli/reference/functions/tm_tomldecode' },
                  { text: 'tm_hclencode', link: '/cli/reference/functions/tm_hclencode' },
                  { text: 'tm_hcldecode', link: '/cli/reference/functions/tm_hcldecode' },
                  { text: 'tm_textdecodebase64', link: '/cli/reference/functions/tm_textdecodebase64' },
                  { text: 'tm_textencodebase64', link: '/cli/reference/functions/tm_textencodebase64' },
                  { text: 'tm_urlencode', link: '/cli/reference/functions/tm_urlencode' },
                  { text: 'tm_yamldecode', link: '/cli/reference/functions/tm_yamldecode' },
                  { text: 'tm_yamlencode', link: '/cli/reference/functions/tm_yamlencode' },
                ],
              },
              {
                text: 'Filesystem Functions',
                collapsed: true,
                items: [
                  { text: 'tm_abspath', link: '/cli/reference/functions/tm_abspath' },
                  { text: 'tm_dirname', link: '/cli/reference/functions/tm_dirname' },
                  { text: 'tm_pathexpand', link: '/cli/reference/functions/tm_pathexpand' },
                  { text: 'tm_basename', link: '/cli/reference/functions/tm_basename' },
                  { text: 'tm_file', link: '/cli/reference/functions/tm_file' },
                  { text: 'tm_fileexists', link: '/cli/reference/functions/tm_fileexists' },
                  { text: 'tm_fileset', link: '/cli/reference/functions/tm_fileset' },
                  { text: 'tm_filebase64', link: '/cli/reference/functions/tm_filebase64' },
                  { text: 'tm_templatefile', link: '/cli/reference/functions/tm_templatefile' },
                ],
              },
              {
                text: 'Date and Time Functions',
                collapsed: true,
                items: [
                  { text: 'tm_formatdate', link: '/cli/reference/functions/tm_formatdate' },
                  { text: 'tm_timeadd', link: '/cli/reference/functions/tm_timeadd' },
                  { text: 'tm_timecmp', link: '/cli/reference/functions/tm_timecmp' },
                  { text: 'tm_timestamp', link: '/cli/reference/functions/tm_timestamp' },
                ],
              },
              {
                text: 'Hash and Crypto Functions',
                collapsed: true,
                items: [
                  { text: 'tm_base64sha256', link: '/cli/reference/functions/tm_base64sha256' },
                  { text: 'tm_base64sha512', link: '/cli/reference/functions/tm_base64sha512' },
                  { text: 'tm_bcrypt', link: '/cli/reference/functions/tm_bcrypt' },
                  { text: 'tm_filebase64sha256', link: '/cli/reference/functions/tm_filebase64sha256' },
                  { text: 'tm_filebase64sha512', link: '/cli/reference/functions/tm_filebase64sha512' },
                  { text: 'tm_filemd5', link: '/cli/reference/functions/tm_filemd5' },
                  { text: 'tm_filesha1', link: '/cli/reference/functions/tm_filesha1' },
                  { text: 'tm_filesha256', link: '/cli/reference/functions/tm_filesha256' },
                  { text: 'tm_filesha512', link: '/cli/reference/functions/tm_filesha512' },
                  { text: 'tm_md5', link: '/cli/reference/functions/tm_md5' },
                  { text: 'tm_rsadecrypt', link: '/cli/reference/functions/tm_rsadecrypt' },
                  { text: 'tm_sha1', link: '/cli/reference/functions/tm_sha1' },
                  { text: 'tm_sha256', link: '/cli/reference/functions/tm_sha256' },
                  { text: 'tm_sha512', link: '/cli/reference/functions/tm_sha512' },
                  { text: 'tm_uuid', link: '/cli/reference/functions/tm_uuid' },
                  { text: 'tm_uuidv5', link: '/cli/reference/functions/tm_uuidv5' },
                ],
              },
              {
                text: 'IP Network Functions',
                collapsed: true,
                items: [
                  { text: 'tm_cidrhost', link: '/cli/reference/functions/tm_cidrhost' },
                  { text: 'tm_cidrnetmask', link: '/cli/reference/functions/tm_cidrnetmask' },
                  { text: 'tm_cidrsubnet', link: '/cli/reference/functions/tm_cidrsubnet' },
                  { text: 'tm_cidrsubnets', link: '/cli/reference/functions/tm_cidrsubnets' },
                  { text: 'tm_cidrcontains', link: '/cli/reference/functions/tm_cidrcontains' },
                ],
              },
              {
                text: 'Type Conversion Functions',
                collapsed: true,
                items: [
                  { text: 'tm_can', link: '/cli/reference/functions/tm_can' },
                  { text: 'tm_tobool', link: '/cli/reference/functions/tm_tobool' },
                  { text: 'tm_tolist', link: '/cli/reference/functions/tm_tolist' },
                  { text: 'tm_tomap', link: '/cli/reference/functions/tm_tomap' },
                  { text: 'tm_tonumber', link: '/cli/reference/functions/tm_tonumber' },
                  { text: 'tm_toset', link: '/cli/reference/functions/tm_toset' },
                  { text: 'tm_tostring', link: '/cli/reference/functions/tm_tostring' },
                  { text: 'tm_try', link: '/cli/reference/functions/tm_try' },
                ],
              },
            ],
          },
          {
            text: 'CLI Commands',
            link: '/cli/reference/cmdline/',
            collapsed: true,
            items: [
              {
                text: 'Stacks and Orchestration',
                collapsed: false,
                items: [
                  { text: 'create', link: '/cli/reference/cmdline/create' },
                  { text: 'list', link: '/cli/reference/cmdline/list' },
                  { text: 'run', link: '/cli/reference/cmdline/run' },
                  { text: 'trigger', link: '/cli/reference/cmdline/trigger' },
                  { text: 'debug show runtime-env', link: '/cli/reference/cmdline/debug/show/debug-show-runtime-env' },
                  { text: 'experimental clone', link: '/cli/reference/cmdline/experimental/experimental-clone' },
                ],
              },
              {
                text: 'Terramate Scripts',
                collapsed: false,
                items: [
                  { text: 'script run', link: '/cli/reference/cmdline/script/script-run' },
                  { text: 'script info', link: '/cli/reference/cmdline/script/script-info' },
                  { text: 'script list', link: '/cli/reference/cmdline/script/script-list' },
                  { text: 'script tree', link: '/cli/reference/cmdline/script/script-tree' },
                ],
              },
              {
                text: 'Code Generation',
                collapsed: false,
                items: [
                  { text: 'fmt', link: '/cli/reference/cmdline/fmt' },
                  { text: 'generate', link: '/cli/reference/cmdline/generate' },
                  { text: 'debug show metadata', link: '/cli/reference/cmdline/debug/show/debug-show-metadata' },
                  { text: 'debug show globals', link: '/cli/reference/cmdline/debug/show/debug-show-globals' },
                  { text: 'debug show generate-origins', link: '/cli/reference/cmdline/debug/show/debug-show-generate-origins' },
                ],
              },
              {
                text: 'Self-Service and Environment Management',
                collapsed: false,
                items: [
                  { text: 'scaffold', link: '/cli/reference/cmdline/scaffold' },
                  { text: 'bundle reconfigure', link: '/cli/reference/cmdline/bundle/bundle-reconfigure' },
                  { text: 'component create', link: '/cli/reference/cmdline/component/component-create' },
                  { text: 'package create', link: '/cli/reference/cmdline/package/package-create' },
                ],
              },
              {
                text: 'Terramate Cloud',
                items: [
                  { text: 'cloud login', link: '/cli/reference/cmdline/cloud/cloud-login' },
                  { text: 'cloud info', link: '/cli/reference/cmdline/cloud/cloud-info' },
                  { text: 'cloud drift show', link: '/cli/reference/cmdline/cloud/drift/cloud-drift-show' },
                ],
              },
              {
                text: 'Misc',
                collapsed: true,
                items: [
                  { text: 'install-completions', link: '/cli/reference/cmdline/install-completions' },
                  { text: 'version', link: '/cli/reference/cmdline/version' },
                ],
              },
              {
                text: 'Experimental',
                collapsed: true,
                items: [
                  { text: 'experimental eval', link: '/cli/reference/cmdline/experimental/experimental-eval' },
                  { text: 'experimental partial-eval', link: '/cli/reference/cmdline/experimental/experimental-partial-eval' },
                  { text: 'experimental get-config-value', link: '/cli/reference/cmdline/experimental/experimental-get-config-value' },
                  { text: 'experimental run-graph', link: '/cli/reference/cmdline/experimental/experimental-run-graph' },
                  { text: 'experimental vendor download', link: '/cli/reference/cmdline/experimental/experimental-vendor-download' },
                ],
              },
              { text: 'Upgrade Check', link: '/cli/reference/configuration/upgrade-check' },
            ],
          },
          { text: 'CLI Authentication', link: '/cli/reference/cmdline/cloud/' },
          { text: 'Configuration Reference', link: '/cli/reference/configuration/' },
          { text: 'Telemetry', link: '/cli/reference/telemetry/' },
        ],
      },
      {
        text: 'Dev Tooling',
        collapsed: true,
        items: [
          { text: 'MCP Server', link: 'https://github.com/terramate-io/terramate-mcp-server' },
          { text: 'Agent Skills', link: 'http://github.com/terramate-io/agent-skills  ' },
          { text: 'Cursor/VSCode Extension', link: 'https://marketplace.visualstudio.com/items?itemName=Mineiros.terramate' },
          { text: 'JetBrains IDEs Plugin', link: 'https://plugins.jetbrains.com/plugin/28890-terramate' },
          { text: 'VIM Plugin', link: 'https://github.com/terramate-io/vim-terramate' },
          { text: 'Language Server', link: '/cli/editor-plugins/language-server' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/terramate-io/terramate' },
      { icon: 'discord', link: 'https://terramate.io/discord' },
      { icon: 'twitter', link: 'https://twitter.com/terramateio' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/terramate-io/' },
      { icon: 'youtube', link: 'https://www.youtube.com/@terramate_io' },
    ],
  },
}))
