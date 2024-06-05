import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/search',
      name: 'search',

      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/',
      name: 'login',

      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',

      component: () => import('../views/PlaylistView.vue')
    }
  ]
})

export default router
