import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/form',
      name: 'form',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SuperFormTest.vue'),
    },
    {
      path: '/level1',
      name: 'level1',
      component: () => import('../views/example/Level1.vue'),
    },
    {
      path: '/level1/level2',
      name: 'level2',
      component: () => import('../views/example/Level2.vue'),
    },
    {
      path: '/level1/level2/level3',
      name: 'level3',
      component: () => import('../views/example/Level3.vue'),
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/SuperTableTest.vue'),
    },
  ],
})

export default router
