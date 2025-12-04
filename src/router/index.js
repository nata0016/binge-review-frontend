import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import ReviewDetailView from '../views/ReviewDetailView.vue'
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/reviews/:slug', name: 'review', component: ReviewDetailView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 