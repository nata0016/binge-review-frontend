<script setup>
import { ref, onMounted } from "vue";
import { getReviews } from "../services/api.js";

const reviews = ref([]);

onMounted(async () => {
  reviews.value = await getReviews();
});
</script>

<template>
  <div>
    <h1>All Reviews</h1>

    <ul v-if="reviews.length">
      <li v-for="review in reviews" :key="review.id">
        <router-link :to="`/reviews/${review.attributes.slug}`">
          {{ review.attributes.title }}
        </router-link>
      </li>
    </ul>

    <p v-else>Loading...</p>
  </div>
</template>