<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../services/api'

const reviews = ref([])

onMounted(async () => {
  const res = await api.get('/reviews?populate=*')
  reviews.value = res.data.data
})
</script>

<template>
  <div>
    <h1>All Reviews</h1>

    <ul>
      <li v-for="r in reviews" :key="r.id">
        <router-link :to="`/reviews/${r.attributes.slug}`">
          {{ r.attributes.seriesName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>