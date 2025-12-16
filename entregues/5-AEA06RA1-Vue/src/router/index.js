import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [


        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue')
        },
        
        {
            path: '/editMovie/:idMovie',
            name: 'editMovie',
            component: () => import('../views/updateMovie.vue'),
        }


    ],
})

export default router  
