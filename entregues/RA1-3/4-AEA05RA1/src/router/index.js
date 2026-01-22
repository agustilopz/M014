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
            path: '/meals/:idMeal',
            name: 'mealDetail',
            component: () => import('../views/MealDetail.vue'),
        }


    ],
})

export default router  
