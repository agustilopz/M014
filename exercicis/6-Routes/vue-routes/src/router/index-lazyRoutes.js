import { createRouter, createWebHistory } from 'vue-router'

/*
import Home from '@/views/Home.vue'
import Frameworks from '@/views/Frameworks.vue'
import FrameworkDetail from '@/views/FrameworkDetail.vue'
import FrameworkDetail2 from '@/views/FrameworkDetail2.vue'
import FrameworkVersion from '../views/FrameworkVersion.vue'
*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',     
        component: () => import('@/views/Home.vue') 
    },
    {
      path: '/frameworks',
      name: 'frameworks',
      component: () => import('@/views/Frameworks.vue'),
      children: [
        {
          path: ':id',
          name: 'frameworkDetail',
          component: () => import('@/views/FrameworkDetail2.vue'),
        },
      ]
    },
    {
    }


  ],
})

export default router
