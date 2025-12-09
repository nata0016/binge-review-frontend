<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getReview } from '../services/api.js'

const route = useRoute()
const review = ref(null)
const isLoading = ref(true)
const error = ref(null)

const rawContent = computed(() => {
  const c = review.value?.attributes?.content ?? review.value?.content
  return typeof c === 'string' ? c : null
})

const structuredContent = computed(() => {
  const c = review.value?.attributes?.content ?? review.value?.content
  if (Array.isArray(c)) return c
  if (c && typeof c === 'object') return [c]
  return []
})

onMounted(async () => {
  try {
    // route param named `title` in router config; component may receive an id if homeView fell back to id.
    const param = route.params.title || route.params.id
    const item = await getReview(param)
    review.value = item
    if (!item) {
      error.value = 'Review not found'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load review'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else>
      <h1>{{ review.attributes?.title || review.title }}</h1>
      <p>{{ review.attributes?.shortDescription || review.shortDescription || '' }}</p>

      <!-- If content is a raw HTML string, render with v-html -->
      <div v-if="rawContent" v-html="rawContent"></div>

      <!-- If content is structured (array/object), render blocks sensibly -->
      <div v-else>
        <div v-for="(block, i) in structuredContent" :key="i">
          <!-- common shapes: a text field, or children with text -->
          <p v-if="block.text">{{ block.text }}</p>
          <p v-else-if="block.children">
            <span v-for="(child, j) in block.children" :key="j">{{ child.text || JSON.stringify(child) }}</span>
          </p>
          <img v-else-if="block.url" :src="block.url" :alt="block.alt || ''" />
        </div>
      </div>
    </div>
  </div>
</template>