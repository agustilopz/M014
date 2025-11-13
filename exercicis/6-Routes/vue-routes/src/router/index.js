import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Frameworks from '@/views/Frameworks.vue'
import FrameworkDetail from '@/views/FrameworkDetail.vue'
import FrameworkVersion from '../views/FrameworkVersion.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home
      /*Lazy route (nomes importar el component quan es visita la ruta) 
        component: () => import('../views/Home.vue') */
    },
    {
      path: '/frameworks',
      name: 'frameworks',
      component: Frameworks,
      children: [
        {
          path: ':id',
          name: 'frameworkDetail',
          component: FrameworkDetail,
        },
      ]
    },
    {
    }


  ],
})

export default router
