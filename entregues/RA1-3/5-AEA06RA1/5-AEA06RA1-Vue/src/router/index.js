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
            component: () => import('../views/editMovie.vue'),
        },

        {
            path: '/newMovie',
            name: 'newMovie',
            component: () => import('../views/newMovie.vue'),
        }


    ],
})

export default router  
