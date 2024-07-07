import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'

function getPath(path: string) {
  const uri = path.replace(/(?:(^|\/)index)?\.md$/, '$1')

  return uri === 'index' ? '' : uri
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Terramate Docs',
  // titleTemplate: ':title - Terramate',
  description: 'Terramate CLI is an open-source Infrastructure as Code (IaC) orchestration tool for Terraform, OpenTofu and Terragrunt.',
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
  appearance: 'dark',
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
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/' },
      { text: 'Blog', link: 'https://terramate.io/rethinking-iac' },
      { text: 'We are hiring!', link: 'https://jobs.ashbyhq.com/terramate' },
      {
        text: 'Releases',
        link: 'https://github.com/terramate-io/terramate/releases',
      },
      { text: 'Playground', link: 'https://play.terramate.io/' },
      { text: 'Terramate Cloud', link: 'https://cloud.terramate.io/' },
    ],

    sidebar: {
      // '/cloud': [
      // ],
      // This sidebar gets displayed when a user
      // is on `cli` directory.
      '/': [
        {
          text: '👋 Introduction',
          collapsed: false,
          items: [
            { text: 'About Terramate', link: '/' },
            { text: 'How it works', link: '/how-it-works' },
            { text: 'Why Terramate', link: '/why-terramate' },
            { text: 'Product Roadmap', link: 'https://terramate.io/roadmap' },
            { text: 'Discord Community', link: 'https://terramate.io/discord' },
          ],
        },
        {
          text: '🚀 Getting Started',
          collapsed: false,
          items: [
            { text: 'Install Terramate CLI', link: '/cli/installation' },
            { text: 'Quickstart', link: '/cli/getting-started/' },
            { text: 'Start with Terraform', link: '/cli/on-boarding/terraform' },
            { text: 'Start with OpenTofu', link: '/cli/on-boarding/opentofu' },
            { text: 'Start with Terragrunt', link: '/cli/on-boarding/terragrunt' },
            { text: 'Start using the Cloud', link: '/cloud/on-boarding/' },
          ],
        },

        {
          text: '💻 Terramate CLI',
          collapsed: false,
          items: [
            {
              text: 'Stacks',
              link: '/cli/stacks/',
              collapsed: true,
              items: [
                { text: 'Create Stacks', link: '/cli/stacks/create' },
                { text: 'Nesting Stacks', link: '/cli/stacks/nesting' },
                { text: 'Configure Stacks', link: '/cli/stacks/configuration' },
                { text: 'Clone Stacks', link: '/cli/stacks/clone' },
                { text: 'Manage Stacks', link: '/cli/stacks/manage' },
                { text: 'Delete Stacks', link: '/cli/stacks/delete' },
                // { text: 'Deployment Targets', link: '/cli/stacks/nesting' },
              ],
            },
            {
              text: 'Orchestration',
              link: '/cli/orchestration/',
              collapsed: true,
              items: [
                { text: 'Run Commands', link: '/cli/orchestration/run-commands-in-stacks' },
                { text: 'Workflows', link: '/cli/orchestration/scripts' },
                {
                  text: 'Change Detection',
                  link: '/cli/change-detection/',
                  collapsed: true,
                  items: [
                    { text: 'Integration: Git', link: '/cli/change-detection/integrations/git' },
                    { text: 'Integration: Terraform', link: '/cli/change-detection/integrations/terraform' },
                    { text: 'Integration: Terragrunt', link: '/cli/change-detection/integrations/terragrunt' },
                    { text: 'Integration: OpenTofu', link: '/cli/change-detection/integrations/opentofu' },
                  ],
                },
                { text: 'Parallel Execution', link: '/cli/orchestration/parallel-execution' },
                {
                  text: 'Order of Execution ',
                  link: '/cli/orchestration/order-of-execution',
                },
                { text: 'Environment Variables', link: '/cli/orchestration/runtime-configuration' },
                { text: 'Disable Safeguards', link: '/cli/orchestration/safeguards' },
              ],
            },
            {
              text: 'CI/CD',
              link: '/cli/automation/',
              collapsed: true,
              items: [
                {
                  text: 'GitHub Actions',
                  link: '/cli/automation/github-actions/',
                  collapsed: true,
                  items: [
                    {
                      text: 'Deployment Workflow',
                      link: '/cli/automation/github-actions/deployment-workflow',
                    },
                    {
                      text: 'Drift Check Workflow',
                      link: '/cli/automation/github-actions/drift-check-workflow',
                    },
                    {
                      text: 'Preview Workflow',
                      link: '/cli/automation/github-actions/preview-workflow',
                    },
                  ],
                },
                {
                  text: 'GitLab CI',
                  link: '/cli/automation/gitlab-ci/',
                  collapsed: true,
                  items: [
                    {
                      text: 'Preview Workflow',
                      link: '/cli/automation/gitlab-ci/preview-workflow',
                    },
                    {
                      text: 'Deployment Workflow',
                      link: '/cli/automation/gitlab-ci/deployment-workflow',
                    },
                    // The drift detection section will be added once support for Gitlab integration is released
                    // {
                    //   text: 'Drift Check Workflow',
                    //   link: '/cli/automation/gitlab-ci/drift-check-workflow',
                    // },
                  ],
                },
                {
                  text: 'Atlantis 🚧',
                  // link: '/cli/automation/azure-devops'
                },
                {
                  text: 'Digger 🚧',
                  // link: '/cli/automation/bitbucket'
                },
                {
                  text: 'BitBucket Pipelines 🚧',
                  // link: '/cli/automation/bitbucket'
                },
                {
                  text: 'Azure DevOps 🚧',
                  // link: '/cli/automation/azure-devops'
                },
                {
                  text: 'AWS CodeBuild 🚧',
                  // link: '/cli/automation/azure-devops'
                },
                {
                  text: 'BuildKite 🚧',
                  // link: '/cli/automation/azure-devops'
                },
                {
                  text: 'CircleCI 🚧',
                  // link: '/cli/automation/azure-devops'
                },
                {
                  text: 'Jenkins 🚧',
                  // link: '/cli/automation/azure-devops'
                },
                {
                  text: 'Teamcity 🚧',
                  // link: '/cli/automation/azure-devops'
                },
              ],
            },
            {
              text: 'Code Generation',
              link: '/cli/code-generation/',
              collapsed: true,
              items: [
                {
                  text: 'Generate ad-hoc HCL',
                  link: '/cli/code-generation/tmgen',
                },
                {
                  text: 'Generate HCL',
                  link: '/cli/code-generation/generate-hcl',
                },
                {
                  text: 'Generate Files',
                  link: '/cli/code-generation/generate-file',
                },
                // {
                //   text: 'Global Variables',
                //   link: '',
                // },
              ],
            },
          ],
        },
        {
          text: '☁️ Terramate Cloud',
          collapsed: false,
          items: [
            {
              text: 'Dashboard',
              link: '/cloud/dashboard/',
            },
            {
              text: 'Alerts',
              link: '/cloud/alerts/',
            },
            {
              text: 'Stacks Inventory',
              link: '/cloud/stacks/',
              collapsed: true,
              items: [
                {
                  text: 'Stack Status',
                  link: '/cloud/stacks/status',
                },
                {
                  text: 'View Stacks',
                  link: '/cloud/stacks/list',
                },
                {
                  text: 'View Stack Details',
                  link: '/cloud/stacks/details',
                },
                {
                  text: 'Synchronize Stacks',
                  link: '/cloud/stacks/sync',
                },
                // {
                //   text: 'Use Stack Status in CLI 🚧',
                //   // link: '/cloud/deployments/use-cloud-status-in-cli'
                // },
              ],
            },
            {
              text: 'Pull Request Previews',
              link: '/cloud/previews/',
              collapsed: true,
              items: [
                // {
                //   text: 'View Pull Requests 🚧',
                //   // link: '/cloud/previews/view-pull-requests'
                // },
                // {
                //   text: 'View Previews 🚧',
                //   // link: '/cloud/previews/view-previews'
                // },
                {
                  text: 'Synchronize in Automation',
                  link: '/cloud/previews/synchronization-in-automation',
                },
                {
                  text: 'Synchronize via Scripts',
                  link: '/cloud/previews/synchronization-with-scripts',
                },
              ],
            },
            {
              text: 'Deployments',
              link: '/cloud/deployments/',
              collapsed: true,
              items: [
                // {
                //   text: 'View Deployments 🚧',
                //   // link: '/cloud/deployments/view-deployments'
                // },
                {
                  text: 'Get Deployment Notification',
                  link: '/cloud/deployments/notifications',
                },
                {
                  text: 'Synchronize in Automation',
                  link: '/cloud/deployments/synchronization-in-automation',
                },
                {
                  text: 'Synchronize from CLI',
                  link: '/cloud/deployments/synchronization-from-cli',
                },
                {
                  text: 'Synchronize via Scripts',
                  link: '/cloud/deployments/synchronization-with-scripts',
                },
              ],
            },
            {
              text: 'Drift Management',
              link: '/cloud/drift/',
              collapsed: true,
              items: [
                {
                  text: 'Get Drift Notifications',
                  link: '/cloud/drift/notifications',
                },
                {
                  text: 'Synchronize in Automation',
                  link: '/cloud/drift/synchronization-in-automation',
                },
                {
                  text: 'Synchronize from CLI',
                  link: '/cloud/drift/synchronization-from-cli',
                },
                {
                  text: 'Synchronize via Scripts',
                  link: '/cloud/drift/synchronization-with-scripts',
                },
                // {
                //   text: 'View Drifted Stacks',
                //   // link: '/cloud/drifts/view-drifts'
                // },
                // {
                //   text: 'Reconcile Drifts 🚧',
                //   // link: '/cloud/drifts/reconcile-drifts'
                // },
              ],
            },

            {
              text: 'Integrations',
              collapsed: true,
              items: [
                { text: 'Slack', link: '/cloud/integrations/slack' },
                { text: 'GitHub', link: '/cloud/integrations/github' },
                {
                  text: 'GitLab 🚧',
                  // link: '/cloud/integrations/gitlab/',
                },
              ],
            },
            {
              text: 'Profile',
              collapsed: false,
              items: [
                // { text: 'Introduction', link: '/cli/introduction' },
              ],
            },
            {
              text: 'Organization',
              link: '/cloud/organization/',
              collapsed: true,
              items: [
                { text: 'General Settings', link: '/cloud/organization/settings' },
                { text: 'User Management', link: '/cloud/organization/user-management' },
              ],
            },
          ],
        },

        {
          text: '👷 How-to Guides',
          collapsed: false,
          items: [
            // {
            //   text: 'About Stacks',
            //   collapsed: true,
            //   items: [
            //     {
            //       text: 'How to size Stacks 🚧',
            //       // link: 'https://github.com/terramate-io/terramate-example-code-generation',
            //     },
            //     {
            //       text: 'Share Data between Stacks 🚧',
            //       // link: 'https://github.com/terramate-io/terramate-example-code-generation',
            //     },
            //     // {
            //     //   text: 'Manage environments with Stacks',
            //     //   link: 'https://github.com/terramate-io/terramate-example-code-generation',
            //     // },
            //   ],
            // },
            // {
            //   text: 'Manage Environments',
            //   collapsed: true,
            //   items: [
            //     {
            //       text: 'Structuring Stacks 🚧',
            //       // link: '/cli/stacks/create',
            //     },
            //     {
            //       text: 'Using Directories',
            //       link: '/cli/stacks/create',
            //     },
            //     {
            //       text: 'Using Workspaces 🚧',
            //       // link: '/cli/stacks/clone'
            //     },
            //     // {
            //     //   text: 'Variables',
            //     //   link: '/cli/stacks/configuration'
            //     // },
            //   ],
            // },
            {
              text: 'Reference Architectures',
              collapsed: true,
              items: [
                { text: 'AWS', link: 'https://github.com/terramate-io/terramate-quickstart-aws' },
                { text: 'Microsoft Azure', link: 'https://github.com/terramate-io/terramate-quickstart-azure' },
                {
                  text: 'Google Cloud 🚧',
                  link: '/cli/guides/reference-architectures/aws',
                },
                {
                  text: 'Terragrunt',
                  link: 'https://github.com/terramate-io/terramate-terragrunt-infrastructure-live-example',
                },
              ],
            },
            {
              text: 'Code Generation',
              collapsed: true,
              items: [
                {
                  text: 'Basic DRY Code Generation',
                  link: 'https://github.com/terramate-io/terramate-example-code-generation',
                },
                {
                  text: 'Terraform Backend and Provider Generation',
                  link: 'https://github.com/terramate-io/terramate-examples/tree/main/01-keep-terraform-dry',
                },
                {
                  text: 'Dynamic Provider Generation',
                  link: 'https://github.com/terramate-io/terramate-examples/tree/main/02-manage-providers-programmatically',
                },
                // {
                //   text: 'Load Globals from YAML 🚧',
                //   // link: 'https://github.com/terramate-io/terramate-examples/tree/main/02-manage-providers-programmatically',
                // },
              ],
            },
          ],
        },
        // {
        //   text: '🔌 Integrations',
        //   collapsed: true,
        //   items: [
        //     {
        //       text: 'Slack',
        //     },
        //     {
        //       text: 'Infracost',
        //     },
        //     {
        //       text: '🚧 Checkov',
        //     },
        //     {
        //       text: '🚧 Trivy',
        //     },
        //   ],
        // },

        {
          text: '⚙️ Reference',
          collapsed: true,
          items: [
            {
              text: 'Variable Namespaces',
              collapsed: true,
              link: '/cli/reference/variables/',
              items: [
                { text: 'Metadata', link: '/cli/reference/variables/metadata' },
              ],
            },
            {
              text: 'Blocks',
              collapsed: true,
              items: [
                { text: 'terramate', link: '/cli/reference/blocks/terramate' },
                { text: 'stack', link: '/cli/reference/blocks/stack' },
                { text: 'generate_hcl', link: '/cli/reference/blocks/generate-hcl' },
                { text: 'generate_file', link: '/cli/reference/blocks/generate-file' },
                { text: 'globals', link: '/cli/reference/blocks/globals' },
                { text: 'lets', link: '/cli/reference/blocks/lets' },
                { text: 'map', link: '/cli/reference/blocks/map' },
                { text: 'script', link: '/cli/reference/blocks/script' },
                { text: 'assert', link: '/cli/reference/blocks/assert' },
                { text: 'import', link: '/cli/reference/blocks/import' },
                // { text: 'vendor', link: '/cli/code-generation/variables/vendor' },
              ],
            },
            {
              text: 'Variables',
              collapsed: true,
              // link: '/cli/reference/variables/',
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
                    {
                      text: 'tm_ternary',
                      link: '/cli/reference/functions/tm_ternary',
                    },
                    {
                      text: 'tm_hcl_expression',
                      link: '/cli/reference/functions/tm_hcl_expression',
                    },
                    {
                      text: 'tm_version_match',
                      link: '/cli/reference/functions/tm_version_match',
                    },
                  ],
                },
                {
                  text: 'Numeric Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_abs',
                      link: '/cli/reference/functions/tm_abs',
                    },
                    {
                      text: 'tm_ceil',
                      link: '/cli/reference/functions/tm_ceil',
                    },
                    {
                      text: 'tm_floor',
                      link: '/cli/reference/functions/tm_floor',
                    },
                    {
                      text: 'tm_log',
                      link: '/cli/reference/functions/tm_log',
                    },
                    {
                      text: 'tm_max',
                      link: '/cli/reference/functions/tm_max',
                    },
                    {
                      text: 'tm_min',
                      link: '/cli/reference/functions/tm_min',
                    },
                    {
                      text: 'tm_parseint',
                      link: '/cli/reference/functions/tm_parseint',
                    },
                    {
                      text: 'tm_pow',
                      link: '/cli/reference/functions/tm_pow',
                    },
                    {
                      text: 'tm_signum',
                      link: '/cli/reference/functions/tm_signum',
                    },
                  ],
                },
                {
                  text: 'String Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_chomp',
                      link: '/cli/reference/functions/tm_chomp',
                    },
                    {
                      text: 'tm_format',
                      link: '/cli/reference/functions/tm_format',
                    },
                    {
                      text: 'tm_formatlist',
                      link: '/cli/reference/functions/tm_formatlist',
                    },
                    {
                      text: 'tm_indent',
                      link: '/cli/reference/functions/tm_indent',
                    },
                    {
                      text: 'tm_join',
                      link: '/cli/reference/functions/tm_join',
                    },
                    {
                      text: 'tm_lower',
                      link: '/cli/reference/functions/tm_lower',
                    },
                    {
                      text: 'tm_regex',
                      link: '/cli/reference/functions/tm_regex',
                    },
                    {
                      text: 'tm_regexall',
                      link: '/cli/reference/functions/tm_regexall',
                    },
                    {
                      text: 'tm_replace',
                      link: '/cli/reference/functions/tm_replace',
                    },
                    {
                      text: 'tm_split',
                      link: '/cli/reference/functions/tm_split',
                    },
                    {
                      text: 'tm_strrev',
                      link: '/cli/reference/functions/tm_strrev',
                    },
                    {
                      text: 'tm_substr',
                      link: '/cli/reference/functions/tm_substr',
                    },
                    {
                      text: 'tm_title',
                      link: '/cli/reference/functions/tm_title',
                    },
                    {
                      text: 'tm_trim',
                      link: '/cli/reference/functions/tm_trim',
                    },
                    {
                      text: 'tm_trimprefix',
                      link: '/cli/reference/functions/tm_trimprefix',
                    },
                    {
                      text: 'tm_trimsuffix',
                      link: '/cli/reference/functions/tm_trimsuffix',
                    },
                    {
                      text: 'tm_trimspace',
                      link: '/cli/reference/functions/tm_trimspace',
                    },
                    {
                      text: 'tm_upper',
                      link: '/cli/reference/functions/tm_upper',
                    },
                  ],
                },
                {
                  text: 'Collection Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_alltrue',
                      link: '/cli/reference/functions/tm_alltrue',
                    },
                    {
                      text: 'tm_anytrue',
                      link: '/cli/reference/functions/tm_anytrue',
                    },
                    {
                      text: 'tm_chunklist',
                      link: '/cli/reference/functions/tm_chunklist',
                    },
                    {
                      text: 'tm_coalesce',
                      link: '/cli/reference/functions/tm_coalesce',
                    },
                    {
                      text: 'tm_coalescelist',
                      link: '/cli/reference/functions/tm_coalescelist',
                    },
                    {
                      text: 'tm_compact',
                      link: '/cli/reference/functions/tm_compact',
                    },
                    {
                      text: 'tm_concat',
                      link: '/cli/reference/functions/tm_concat',
                    },
                    {
                      text: 'tm_contains',
                      link: '/cli/reference/functions/tm_contains',
                    },
                    {
                      text: 'tm_distinct',
                      link: '/cli/reference/functions/tm_distinct',
                    },
                    {
                      text: 'tm_element',
                      link: '/cli/reference/functions/tm_element',
                    },
                    {
                      text: 'tm_flatten',
                      link: '/cli/reference/functions/tm_flatten',
                    },
                    {
                      text: 'tm_index',
                      link: '/cli/reference/functions/tm_index',
                    },
                    {
                      text: 'tm_keys',
                      link: '/cli/reference/functions/tm_keys',
                    },
                    {
                      text: 'tm_length',
                      link: '/cli/reference/functions/tm_length',
                    },
                    {
                      text: 'tm_lookup',
                      link: '/cli/reference/functions/tm_lookup',
                    },
                    {
                      text: 'tm_matchkeys',
                      link: '/cli/reference/functions/tm_matchkeys',
                    },
                    {
                      text: 'tm_merge',
                      link: '/cli/reference/functions/tm_merge',
                    },
                    {
                      text: 'tm_one',
                      link: '/cli/reference/functions/tm_one',
                    },
                    {
                      text: 'tm_range',
                      link: '/cli/reference/functions/tm_range',
                    },
                    {
                      text: 'tm_reverse',
                      link: '/cli/reference/functions/tm_reverse',
                    },
                    {
                      text: 'tm_setintersection',
                      link: '/cli/reference/functions/tm_setintersection',
                    },
                    {
                      text: 'tm_setproduct',
                      link: '/cli/reference/functions/tm_setproduct',
                    },
                    {
                      text: 'tm_setsubtract',
                      link: '/cli/reference/functions/tm_setsubtract',
                    },
                    {
                      text: 'tm_setunion',
                      link: '/cli/reference/functions/tm_setunion',
                    },
                    {
                      text: 'tm_slice',
                      link: '/cli/reference/functions/tm_slice',
                    },
                    {
                      text: 'tm_sort',
                      link: '/cli/reference/functions/tm_sort',
                    },
                    {
                      text: 'tm_sum',
                      link: '/cli/reference/functions/tm_sum',
                    },
                    {
                      text: 'tm_transpose',
                      link: '/cli/reference/functions/tm_transpose',
                    },
                    {
                      text: 'tm_values',
                      link: '/cli/reference/functions/tm_values',
                    },
                    {
                      text: 'tm_zipmap',
                      link: '/cli/reference/functions/tm_zipmap',
                    },
                  ],
                },
                {
                  text: 'Encoding Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_base64decode',
                      link: '/cli/reference/functions/tm_base64decode',
                    },
                    {
                      text: 'tm_base64encode',
                      link: '/cli/reference/functions/tm_base64encode',
                    },
                    {
                      text: 'tm_base64gzip',
                      link: '/cli/reference/functions/tm_base64gzip',
                    },
                    {
                      text: 'tm_csvdecode',
                      link: '/cli/reference/functions/tm_csvdecode',
                    },
                    {
                      text: 'tm_jsondecode',
                      link: '/cli/reference/functions/tm_jsondecode',
                    },
                    {
                      text: 'tm_jsonencode',
                      link: '/cli/reference/functions/tm_jsonencode',
                    },
                    {
                      text: 'tm_textdecodebase64',
                      link: '/cli/reference/functions/tm_textdecodebase64',
                    },
                    {
                      text: 'tm_textencodebase64',
                      link: '/cli/reference/functions/tm_textencodebase64',
                    },
                    {
                      text: 'tm_urlencode',
                      link: '/cli/reference/functions/tm_urlencode',
                    },
                    {
                      text: 'tm_yamldecode',
                      link: '/cli/reference/functions/tm_yamldecode',
                    },
                    {
                      text: 'tm_yamlencode',
                      link: '/cli/reference/functions/tm_yamlencode',
                    },
                  ],
                },
                {
                  text: 'Filesystem Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_abspath',
                      link: '/cli/reference/functions/tm_abspath',
                    },
                    {
                      text: 'tm_dirname',
                      link: '/cli/reference/functions/tm_dirname',
                    },
                    {
                      text: 'tm_pathexpand',
                      link: '/cli/reference/functions/tm_pathexpand',
                    },
                    {
                      text: 'tm_basename',
                      link: '/cli/reference/functions/tm_basename',
                    },
                    {
                      text: 'tm_file',
                      link: '/cli/reference/functions/tm_file',
                    },
                    {
                      text: 'tm_fileexists',
                      link: '/cli/reference/functions/tm_fileexists',
                    },
                    {
                      text: 'tm_fileset',
                      link: '/cli/reference/functions/tm_fileset',
                    },
                    {
                      text: 'tm_filebase64',
                      link: '/cli/reference/functions/tm_filebase64',
                    },
                    {
                      text: 'tm_templatefile',
                      link: '/cli/reference/functions/tm_templatefile',
                    },
                  ],
                },
                {
                  text: 'Date and Time Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_formatdate',
                      link: '/cli/reference/functions/tm_formatdate',
                    },
                    {
                      text: 'tm_timeadd',
                      link: '/cli/reference/functions/tm_timeadd',
                    },
                    {
                      text: 'tm_timestamp',
                      link: '/cli/reference/functions/tm_timestamp',
                    },
                  ],
                },
                {
                  text: 'Hash and Crypto Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_base64sha256',
                      link: '/cli/reference/functions/tm_base64sha256',
                    },
                    {
                      text: 'tm_base64sha512',
                      link: '/cli/reference/functions/tm_base64sha512',
                    },
                    {
                      text: 'tm_bcrypt',
                      link: '/cli/reference/functions/tm_bcrypt',
                    },
                    {
                      text: 'tm_filebase64sha256',
                      link: '/cli/reference/functions/tm_filebase64sha256',
                    },
                    {
                      text: 'tm_filebase64sha512',
                      link: '/cli/reference/functions/tm_filebase64sha512',
                    },
                    {
                      text: 'tm_filemd5',
                      link: '/cli/reference/functions/tm_filemd5',
                    },
                    {
                      text: 'tm_filesha1',
                      link: '/cli/reference/functions/tm_filesha1',
                    },
                    {
                      text: 'tm_filesha256',
                      link: '/cli/reference/functions/tm_filesha256',
                    },
                    {
                      text: 'tm_filesha512',
                      link: '/cli/reference/functions/tm_filesha512',
                    },
                    {
                      text: 'tm_md5',
                      link: '/cli/reference/functions/tm_md5',
                    },
                    {
                      text: 'tm_rsadecrypt',
                      link: '/cli/reference/functions/tm_rsadecrypt',
                    },
                    {
                      text: 'tm_sha1',
                      link: '/cli/reference/functions/tm_sha1',
                    },
                    {
                      text: 'tm_sha256',
                      link: '/cli/reference/functions/tm_sha256',
                    },
                    {
                      text: 'tm_sha512',
                      link: '/cli/reference/functions/tm_sha512',
                    },
                    {
                      text: 'tm_uuid',
                      link: '/cli/reference/functions/tm_uuid',
                    },
                    {
                      text: 'tm_uuidv5',
                      link: '/cli/reference/functions/tm_uuidv5',
                    },
                  ],
                },
                {
                  text: 'IP Network Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_cidrhost',
                      link: '/cli/reference/functions/tm_cidrhost',
                    },
                    {
                      text: 'tm_cidrnetmask',
                      link: '/cli/reference/functions/tm_cidrnetmask',
                    },
                    {
                      text: 'tm_cidrsubnet',
                      link: '/cli/reference/functions/tm_cidrsubnet',
                    },
                    {
                      text: 'tm_cidrsubnets',
                      link: '/cli/reference/functions/tm_cidrsubnets',
                    },
                  ],
                },
                {
                  text: 'Type Conversion Functions',
                  collapsed: true,
                  items: [
                    {
                      text: 'tm_can',
                      link: '/cli/reference/functions/tm_can',
                    },
                    {
                      text: 'tm_tobool',
                      link: '/cli/reference/functions/tm_tobool',
                    },
                    {
                      text: 'tm_tolist',
                      link: '/cli/reference/functions/tm_tolist',
                    },
                    {
                      text: 'tm_tomap',
                      link: '/cli/reference/functions/tm_tomap',
                    },
                    {
                      text: 'tm_tonumber',
                      link: '/cli/reference/functions/tm_tonumber',
                    },
                    {
                      text: 'tm_toset',
                      link: '/cli/reference/functions/tm_toset',
                    },
                    {
                      text: 'tm_tostring',
                      link: '/cli/reference/functions/tm_tostring',
                    },
                    {
                      text: 'tm_try',
                      link: '/cli/reference/functions/tm_try',
                    },
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
                    { text: 'debug show runtime-env', link: '/cli/reference/cmdline/debug/show/debug-show-runtime-env' },
                    { text: 'experimental clone', link: '/cli/reference/cmdline/experimental/experimental-clone' },
                    { text: 'experimental trigger', link: '/cli/reference/cmdline/experimental/experimental-trigger' },
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
                {
                  text: 'Upgrade Check',
                  link: '/cli/reference/configuration/upgrade-check',
                },
              ],
            },
            {
              text: 'Configuration Reference',
              link: '/cli/reference/configuration/',
            },
          ],
        },
        {
          text: '👨🏽‍💻 Dev Tooling',
          collapsed: true,
          items: [
            { text: 'VSCode Extension', link: 'https://marketplace.visualstudio.com/items?itemName=Mineiros.terramate' },
            { text: 'VIM Plugin', link: 'https://github.com/terramate-io/vim-terramate' },
            { text: 'Language Server', link: '/cli/editor-plugins/language-server' },
          ],
        },
        // {
        //   text: '📖 Conceptual Guides',
        //   collapsed: true,
        //   items: [
        //     {
        //       text: 'Create your Account',
        //       link: '/cloud/signup/',
        //     },
        //     {
        //       text: 'Nesting Stacks',
        //       link: '/cli/stacks/nesting',
        //     },
        //   ],
        // },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/terramate-io/terramate' },
      { icon: 'discord', link: 'https://terramate.io/discord' },
      { icon: 'twitter', link: 'https://twitter.com/terramateio' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/terramate-io/' },
    ],
  },
})
