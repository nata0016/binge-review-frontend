<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getReview } from '../services/api.js'

const route = useRoute()
const review = ref(null)
const isLoading = ref(true)
const error = ref(null)

// 🔗 Base URL de Strapi (env ou localhost)
const STRAPI_BASE_URL =
  import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

// 🖼 Fonction utilitaire pour construire l’URL de l’image principale
const getImageUrl = (reviewItem) => {
  if (!reviewItem) {
    return 'https://via.placeholder.com/800x500?text=Review+Image'
  }

  const attr = reviewItem.attributes || reviewItem

  const mediaField =
    attr.image || attr.cover || attr.coverImage || attr.poster || null

  const rawUrl =
    mediaField?.data?.attributes?.url ||
    mediaField?.url ||
    attr.image?.url ||
    null

  if (!rawUrl) {
    return 'https://via.placeholder.com/800x500?text=Review+Image'
  }

  if (rawUrl.startsWith('http')) {
    return rawUrl
  }

  return `${STRAPI_BASE_URL}${rawUrl}`
}

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
  <div class="page-container">
    <!-- HEADER -->
    <header class="site-header">
      <div class="logo">
        <span>Binge Review</span>
      </div>

      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/">Reviews</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>

    <!-- CONTENT -->
    <main class="page-content">
      <!-- LOADING -->
      <section v-if="isLoading" class="state-block">
        <p>Loading review...</p>
      </section>

      <!-- ERROR -->
      <section v-else-if="error" class="state-block state-error">
        <p>{{ error }}</p>
      </section>

      <!-- REVIEW -->
      <section v-else class="review-wrapper">
        <div class="breadcrumb">
          <router-link to="/" class="back-link">
            ← Back to all reviews
          </router-link>
        </div>

        <!-- HERO -->
        <section class="review-hero">
          <div class="hero-text">
            <h1 class="review-title">
              {{ review.attributes?.title || review.title }}
            </h1>

            <p class="review-short">
              {{
                review.attributes?.shortDescription ||
                review.shortDescription ||
                ''
              }}
            </p>

            <div class="review-meta">
              <p v-if="review.attributes?.author || review.author">
                <span class="meta-label">Author:</span>
                <span class="meta-value">
                  {{ review.attributes?.author || review.author }}
                </span>
              </p>

              <p v-if="review.attributes?.rating ?? review.rating">
                <span class="meta-label">Rating:</span>
                <span class="meta-value rating-value">
                  ★ {{ review.attributes?.rating ?? review.rating }}/5
                </span>
              </p>

              <p v-if="review.attributes?.genre || review.genre">
                <span class="meta-label">Genre:</span>
                <span class="meta-value">
                  {{ review.attributes?.genre || review.genre }}
                </span>
              </p>
            </div>
          </div>

          <div class="hero-image-wrapper">
            <img
              class="hero-image"
              :src="getImageUrl(review)"
              :alt="review.attributes?.title || review.title || 'Review image'"
            />
          </div>
        </section>

        <!-- MAIN CONTENT -->
        <section class="review-content">
          <div v-if="rawContent" class="content-html" v-html="rawContent"></div>

          <div v-else class="content-structured">
            <div
              v-for="(block, i) in structuredContent"
              :key="i"
              class="content-block"
            >
              <p v-if="block.text">
                {{ block.text }}
              </p>

              <p v-else-if="block.children">
                <span v-for="(child, j) in block.children" :key="j">
                  {{ child.text || JSON.stringify(child) }}
                </span>
              </p>

              <img
                v-else-if="block.url"
                class="content-image"
                :src="block.url"
                :alt="block.alt || ''"
              />

              <pre v-else class="content-raw">
{{ JSON.stringify(block, null, 2) }}
              </pre>
            </div>
          </div>
        </section>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="site-footer">
      <p>© 2025 – Binge Review. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  color: #111827;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
}

/* HEADER */
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo span {
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: 0.04em;
}

.main-nav {
  display: flex;
  gap: 20px;
  font-size: 0.95rem;
}

.main-nav :deep(a) {
  text-decoration: none;
  color: #4b5563;
  position: relative;
  padding-bottom: 2px;
}

.main-nav :deep(a:hover) {
  color: #111827;
}

.main-nav :deep(a)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1px;
  background: #111827;
  transition: width 0.2s ease;
}

.main-nav :deep(a:hover)::after {
  width: 100%;
}

/* CONTENT */
.page-content {
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 16px 48px;
}

/* STATES */
.state-block {
  margin-top: 40px;
  font-size: 1rem;
  color: #4b5563;
}

.state-error {
  color: #b91c1c;
}

/* BREADCRUMB */
.breadcrumb {
  margin-bottom: 16px;
}

.back-link {
  font-size: 0.9rem;
  text-decoration: none;
  color: #4b5563;
}

.back-link:hover {
  color: #111827;
  text-decoration: underline;
}

/* HERO */
.review-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.1fr);
  gap: 24px;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-title {
  font-size: 2rem;
  line-height: 1.2;
}

.review-short {
  font-size: 0.98rem;
  color: #4b5563;
}

.review-meta {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-weight: 500;
  margin-right: 4px;
}

.meta-value {
  color: #111827;
}

.rating-value {
  color: #f59e0b;
}

/* HERO IMAGE */
.hero-image-wrapper {
  width: 100%;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.13);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* REVIEW CONTENT */
.review-content {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.content-html :deep(p) {
  margin-bottom: 12px;
  line-height: 1.6;
  font-size: 0.98rem;
}

.content-html :deep(h2) {
  font-size: 1.3rem;
  margin: 18px 0 8px;
}

.content-html :deep(ul),
.content-html :deep(ol) {
  margin-left: 20px;
  margin-bottom: 16px;
}

/* STRUCTURED CONTENT */
.content-structured {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.content-block p {
  font-size: 0.98rem;
  line-height: 1.6;
  color: #111827;
}

.content-image {
  max-width: 100%;
  border-radius: 10px;
  margin: 10px 0;
}

.content-raw {
  background-color: #111827;
  color: #f9fafb;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 0.78rem;
  overflow-x: auto;
}

/* FOOTER */
.site-footer {
  border-top: 1px solid #e5e7eb;
  padding: 18px 16px;
  background-color: #f3f4f6;
  text-align: center;
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 24px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .site-header {
    padding: 14px 16px;
  }

  .page-content {
    padding: 24px 14px 32px;
  }

  .review-hero {
    grid-template-columns: 1fr;
  }

  .hero-image-wrapper {
    height: 220px;
  }

  .review-title {
    font-size: 1.6rem;
  }
}
</style>

