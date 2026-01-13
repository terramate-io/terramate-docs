import { usePaths } from 'vitepress-openapi'
import spec from '../.vitepress/theme/openapi.json' with { type: 'json' }

export default {
  paths() {
    return usePaths({ spec })
      .getPathsByVerbs()
      .map((path) => {
        if (!path)
          return null
        const { operationId, summary } = path
        return {
          params: {
            operationId,
            pageTitle: `${summary} - vitepress-openapi`,
          },
        }
      })
  },
}
