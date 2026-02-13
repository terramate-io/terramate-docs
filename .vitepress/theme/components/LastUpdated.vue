<script setup>
import { useData } from 'vitepress'
import { computed, ref, onMounted, watch, nextTick } from 'vue'

const { page } = useData()
const el = ref(null)

const formattedDate = computed(() => {
  const ts = page.value.lastUpdated
  if (!ts) return null
  return new Date(ts).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

function moveAfterH1() {
  if (!el.value) return
  const container = el.value.closest('.vp-doc')
  if (!container) return
  const h1 = container.querySelector('h1')
  if (h1 && h1.parentNode) {
    h1.parentNode.insertBefore(el.value, h1.nextSibling)
  }
}

onMounted(() => {
  nextTick(moveAfterH1)
})

watch(() => page.value.relativePath, () => {
  nextTick(moveAfterH1)
})
</script>

<template>
  <p v-if="formattedDate" ref="el" class="tm-last-updated">
    Last updated {{ formattedDate }}
  </p>
</template>
