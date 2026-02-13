<script setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const copied = ref(false)
const copyError = ref(false)

const buttonLabel = computed(() => {
  if (copyError.value) {
    return 'Copy failed'
  }

  return copied.value ? 'Copied' : 'Copy for LLM'
})

function normalizeMarkdown(text) {
  return text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim()
}

async function copyPage() {
  try {
    const docNode = document.querySelector('.vp-doc')
    const title = page.value?.title || document.title
    const pageUrl = window.location.href
    const content = docNode?.innerText || ''
    const payload = normalizeMarkdown(`# ${title}\n\nSource: ${pageUrl}\n\n${content}`)

    await navigator.clipboard.writeText(payload)
    copied.value = true
    copyError.value = false
    window.setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    copyError.value = true
    window.setTimeout(() => {
      copyError.value = false
    }, 2500)
  }
}
</script>

<template>
  <div class="tm-copy-page-wrap">
    <button type="button" class="tm-copy-page-btn" @click="copyPage">
      {{ buttonLabel }}
    </button>
  </div>
</template>
