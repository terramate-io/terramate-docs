<script setup>
import DefaultTheme from 'vitepress/theme'
import CopyPageMarkdown from './components/CopyPageMarkdown.vue'
import LastUpdated from './components/LastUpdated.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <!-- Google Tag Manager (noscript) -->
      <noscript>
        <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-5KZT64L"
        height="0"
        width="0"
        style="display:none;visibility:hidden">
        </iframe>
      </noscript>
      <!-- End Google Tag Manager (noscript) -->
    </template>
    <template #doc-before>
      <CopyPageMarkdown />
      <LastUpdated />
    </template>
  </Layout>
</template>
