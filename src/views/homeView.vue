<template>
  <div class="page-container">
    <!-- HEADER -->
    <header class="site-header">
      <div class="logo">
        <span>BingeReview</span>
      </div>

      <nav class="main-nav">
  <router-link to="/">Home</router-link>
  <router-link to="/">Reviews</router-link>
  <router-link to="/about">About</router-link>
  <router-link to="/contact">Contact</router-link>
</nav>
    </header>

    <!-- CONTENU PRINCIPAL -->
    <main class="page-content">
      <section class="page-heading">
        <h1>All Reviews</h1>
        <p>
          Browse through all the reviews published from our Strapi backend.
        </p>
      </section>

      <!-- ÉTATS GLOBAUX : LOADING / ERREUR / AUCUNE REVIEW EN BASE -->
      <section
        v-if="isLoading || error || !reviews.length"
        class="reviews-state"
      >
        <p v-if="isLoading">Loading reviews...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else>
          No reviews found. If you added reviews in Strapi, make sure the Strapi
          server is running and the entries are published.
        </p>
      </section>

      <!-- RECHERCHE + RÉSULTATS (quand les reviews sont bien chargées) -->
      <section v-else>
        <!-- BARRE DE RECHERCHE -->
        <section class="search-section">
          <label class="search-label" for="search">
            Search by title or genre
          </label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Type a title or genre…"
          />

          <p
            v-if="searchQuery && filteredReviews.length"
            class="search-meta"
          >
            Showing {{ filteredReviews.length }} result(s) for
            “{{ searchQuery }}”.
          </p>
        </section>

        <!-- GRID DES CARTES SI RÉSULTATS -->
        <section
          v-if="filteredReviews.length"
          class="reviews-grid"
        >
          <article
            v-for="review in filteredReviews"
            :key="review.id"
            class="review-card"
          >
            <!-- Image -->
            <div class="card-image-wrapper">
              <img
                class="card-image"
                :src="getImageUrl(review)"
                :alt="
                  review.attributes?.title ||
                  review.title ||
                  'Review cover image'
                "
              />
            </div>

            <!-- Contenu -->
            <div class="card-body">
              <h2 class="card-title">
                {{ review.attributes?.title || review.title || 'Untitled review' }}
              </h2>

              <p class="card-meta">
                Rating:
                <span class="card-meta-strong">
                  {{ review.attributes?.rating ?? review.rating ?? 'N/A' }}/5
                </span>
              </p>

              <p class="card-meta">
                Genre:
                <span class="card-meta-strong">
                  {{ review.attributes?.genre ?? review.genre ?? 'Unknown' }}
                </span>
              </p>

              <p class="card-excerpt">
                {{
                  review.attributes?.shortDescription ||
                  review.shortDescription ||
                  'No description provided yet.'
                }}
              </p>
            </div>

            <!-- Bouton -->
            <div class="card-footer">
              <router-link
                :to="`/reviews/${encodeURIComponent(review.attributes?.title || review.title || review.id)}`"
                class="card-button"
              >
                View review
              </router-link>
            </div>
          </article>
        </section>

        <!-- AUCUN RÉSULTAT POUR LA RECHERCHE -->
        <section
          v-else
          class="reviews-state"
        >
          <p v-if="searchQuery">
            No results for “{{ searchQuery }}”.
          </p>
          <p v-else>
            No reviews available.
          </p>
        </section>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="site-footer">
      <p>© 2025 – Binge Review. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getReviews } from '../services/api.js'

// 🔗 Base URL de Strapi (env ou localhost)
const STRAPI_BASE_URL =
  import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

// 🖼 Fonction utilitaire pour construire l’URL de l’image
const getImageUrl = (review) => {
  const attr = review.attributes || review

  // 👉 Adapte ces champs au besoin selon ton modèle Strapi
  const mediaField =
    attr.image || attr.cover || attr.coverImage || attr.poster || null

  const rawUrl =
    mediaField?.data?.attributes?.url ||
    mediaField?.url ||
    attr.image?.url ||
    null

  if (!rawUrl) {
    return 'https://via.placeholder.com/600x400?text=Site+Review'
  }

  // Si Strapi renvoie déjà une URL absolue
  if (rawUrl.startsWith('http')) {
    return rawUrl
  }

  // Si Strapi renvoie un chemin relatif (/uploads/...)
  return `${STRAPI_BASE_URL}${rawUrl}`
}

const reviews = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')

// 🔎 Reviews filtrées (titre + genre)
const filteredReviews = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()

  if (!q) {
    return reviews.value
  }

  return reviews.value.filter((review) => {
    const attr = review.attributes || review
    const title = (attr.title || review.title || '').toLowerCase()
    const genre = (attr.genre || review.genre || '').toLowerCase()

    return title.includes(q) || genre.includes(q)
  })
})

onMounted(async () => {
  try {
    const res = await getReviews()
    console.log('getReviews() response:', res)

    // Normalisation de la réponse Strapi
    if (Array.isArray(res)) {
      reviews.value = res
    } else if (res && Array.isArray(res.data)) {
      reviews.value = res.data
    } else {
      reviews.value = []
    }

    if (reviews.value.length) {
      console.log('First review object:', reviews.value[0])
    }
  } catch (err) {
    console.error(err)
    error.value = 'Unable to load reviews'
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fafafa;
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

.main-nav a,
.main-nav :deep(a) {
  text-decoration: none;
  color: #4b5563;
  position: relative;
  padding-bottom: 2px;
}

.main-nav a:hover,
.main-nav :deep(a:hover) {
  color: #111827;
}

.main-nav a::after,
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

.main-nav a:hover::after,
.main-nav :deep(a:hover)::after {
  width: 100%;
}

/* CONTENU */
.page-content {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 16px 48px;
}

.page-heading {
  text-align: left;
  margin-bottom: 16px;
}

.page-heading h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.page-heading p {
  color: #6b7280;
  font-size: 0.98rem;
}

/* SECTION RECHERCHE */
.search-section {
  margin-bottom: 20px;
}

.search-label {
  display: block;
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 6px;
}

.search-input {
  width: 100%;
  max-width: 360px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.search-input:focus {
  border-color: #111827;
  box-shadow: 0 0 0 1px #1118271a;
}

.search-meta {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #6b7280;
}

/* ÉTATS */
.reviews-state {
  margin-top: 20px;
  font-size: 0.96rem;
  color: #4b5563;
}

/* GRID DES CARTES */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 12px;
}

/* CARDS */
.review-card {
  background-color: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.13);
}

.card-image-wrapper {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 16px 18px 8px;
}

.card-title {
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.card-meta {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 4px;
}

.card-meta-strong {
  font-weight: 500;
}

.card-excerpt {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.4;
  margin-top: 4px;
}

/* FOOTER DE LA CARTE */
.card-footer {
  padding: 10px 18px 16px;
  margin-top: auto;
  display: flex;
  justify-content: flex-start;
}

.card-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease,
    box-shadow 0.18s ease, transform 0.1s ease;
}

.card-button:hover {
  background-color: #ffffff;
  color: #111827;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2);
  transform: translateY(-1px);
}

/* FOOTER GLOBAL */
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

  .main-nav {
    gap: 14px;
    font-size: 0.9rem;
  }

  .page-content {
    padding: 24px 14px 32px;
  }

  .card-image-wrapper {
    height: 170px;
  }
}
</style>