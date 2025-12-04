<script setup>
import { ref, onMounted } from "vue";
import { getReviews } from "../services/api.js";

const reviews = ref([]);

onMounted(async () => {
  try {
    reviews.value = await getReviews();
  } catch (e) {
    console.error("Failed to load reviews", e);
    reviews.value = [];
  }
});
</script>

<template>
  <div>
    <h1>All Reviews</h1>

    <ul v-if="reviews && reviews.length">
      <li
        v-for="review in reviews"
        :key="review.id"
      >
        <!-- On protège au cas où un élément serait null -->
        <router-link
          v-if="review && review.attributes"
          :to="`/reviews/${review.attributes.slug}`"
        >
          {{ review.attributes.seriesName }} – {{ review.attributes.title }}
        </router-link>
      </li>
    </ul>

    <p v-else>Loading...</p>
  </div>
</template>