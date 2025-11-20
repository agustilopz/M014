import { createRouter, createWebHistory } from 'vue-router'


//import Home from '../views/Home.vue'
//import Recipes from '../views/Recipes.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [


        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/recipes',
            name: 'recipes',
            component: () => import('../views/Recipes.vue'),
            /*
            children: [
                {
                    path: ':id',
                    name: 'recipeDetail',
                    component: () => import('../views/RecipeDetail.vue'),
                }
            ]
                */
        },
        {
            path: '/recipes/:id',
            name: 'recipeDetail',
            component: () => import('../views/RecipeDetail.vue'),
        },
        {
        path: '/provide-inject',
        name: 'provideInject',
        component: () => import('../views/ProvideInject.vue')
        
        }


    ],
})

export default router  
