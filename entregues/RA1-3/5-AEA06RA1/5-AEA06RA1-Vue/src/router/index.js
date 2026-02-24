import { createRouter, createWebHistory } from 'vue-router'
import { auth, setAuth } from '../auth.js'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [


        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue')
        },

                {
            path: '/movies',
            name: 'movies',
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
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
        }


    ],
})

// Guard global per protegir rutes i restaurar la sessió amb el JWT de la cookie
router.beforeEach(async (to, from, next) => {
    const publicPaths = ['/login', '/register']
    const isPublic = publicPaths.includes(to.path)

    if (auth.isAuthenticated || isPublic) {
        return next()
    }

    // Intentem recuperar la sessió a partir del backend (/me)
    try {
        const res = await fetch('http://localhost:3000/me', {
            credentials: 'include'
        })
        if (res.ok) {
            const data = await res.json()
            setAuth(data.user)
            return next()
        }
    } catch (e) {
        // ignorem errors de xarxa i continuem cap al login
    }

    return next('/login')
})

export default router
