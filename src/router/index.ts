import {createRouter, createWebHistory} from 'vue-router'

import Auth from '@/pages/Auth.vue'
import SignUp from '@/pages/SignUp.vue'
import Forgot from '@/pages/Forgot'
import Terms from '@/pages/Terms.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth,
      meta: {layout: 'AppLayoutAuth'}
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {layout: 'AppLayoutAuth'}
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot,
      meta: {layout: 'AppLayoutAuth'}
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
      meta: {layout: 'AppLayoutAuth'}
    }
  ]
})

export default router
