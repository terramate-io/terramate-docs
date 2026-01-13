import type { Theme } from 'vitepress'
import mediumZoom from 'medium-zoom'
import { useRoute } from 'vitepress'
import { theme, useOpenapi } from 'vitepress-openapi/client'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import spec from './openapi.json'
import 'vitepress-openapi/dist/style.css'

import './vars.css'
import './index.css'

export default {
  extends: DefaultTheme,
  async enhanceApp(ctx) {
    useOpenapi({
      spec,
      config: {
      },
    })
    theme.enhanceApp(ctx)
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
    //   mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' })
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
  },
} satisfies Theme
