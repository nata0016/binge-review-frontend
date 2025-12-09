import { createRouter, createWebHistory } from 'vue-router'

// Pages existantes
import HomeView from '../views/homeView.vue'
import ReviewDetailView from '../views/ReviewDetailView.vue'

//  Nouvelles pages
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/reviews/:title',
    name: 'reviewDetail',
    component: ReviewDetailView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router