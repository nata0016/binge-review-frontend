<template>
  <div>
    <h1>All Reviews</h1>

    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-else-if="reviews.length">
      <li v-for="review in reviews" :key="review.id">
        <router-link :to="review.attributes?.slug ? `/reviews/${review.attributes.slug}` : `/reviews/${review.id}`">
          <h3>{{ review.attributes?.title || 'Untitled review' }}</h3>
        </router-link>
        <p>Rating: {{ review.attributes?.rating ?? 'N/A' }}</p>
        <p>Genre: {{ review.attributes?.genre ?? 'Unknown' }}</p>
      </li>
    </ul>

    <p v-else>No reviews found. If you added reviews in Strapi, make sure the Strapi server is running and the entries are published.</p>

    <!-- DEBUG: show raw reviews JSON to help inspect response shape -->
    <details style="margin-top:1rem;">
      <summary>Debug: raw reviews payload</summary>
      <pre style="max-height:300px;overflow:auto;background:#f6f8fa;padding:8px;border-radius:4px">{{ JSON.stringify(reviews, null, 2) }}</pre>
    </details>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getReviews } from '../services/api.js'

const reviews = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await getReviews()
    console.log('getReviews() response:', res)

    // `getReviews()` returns the Strapi response object (res.data),
    // normalize to an array for rendering.
    if (Array.isArray(res)) {
      reviews.value = res
    } else if (res && Array.isArray(res.data)) {
      reviews.value = res.data
    } else {
      reviews.value = []
    }
  } catch (err) {
    console.error(err)
    error.value = 'Unable to load reviews'
  } finally {
    isLoading.value = false
  }
})
</script>