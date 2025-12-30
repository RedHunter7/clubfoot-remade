import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/league/:id',
      name: 'league',
      component: () => import('../views/LeagueView.vue'),
    },
    {
      path: '/club',
      name: 'search-club',
      component: () => import('../views/SearchClubView.vue'),
    },
    {
      path: '/club/:id',
      name: 'club-detail',
      component: () => import('../views/ClubDetailView.vue'),
    }
  ],
})

export default router
