<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getReview } from '../services/api.js'

const route = useRoute()
const review = ref(null)

onMounted(async () => {
  review.value = await getReview(route.params.slug)
})
</script>

<template>
  <div v-if="review">
    <h1>{{ review.data.attributes.title }}</h1>
    <p>{{ review.data.attributes.shortDescription }}</p>
  </div>
  <p v-else>Loading...</p>
</template>