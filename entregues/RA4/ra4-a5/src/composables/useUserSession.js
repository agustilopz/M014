import { ref } from 'vue'
import { api } from 'boot/axios'

const user = ref(null)
const loggedIn = ref(false)

export function useUserSession () {
  async function fetch () {
    try {
      const res = await api.get('/auth/me')
      // Only use res.data.user; do not treat session metadata as a user object
      user.value = res.data?.user ?? null
      loggedIn.value = !!user.value
    } catch (err) {
      // network or auth error — clear session
      console.warn('useUserSession.fetch error:', err)
      user.value = null
      loggedIn.value = false
    }
  }

  async function login (credentials) {
    const res = await api.post('/auth/login', credentials, { withCredentials: true })
    // Persist JWT token if returned
    if (res.data?.token && typeof window !== 'undefined') {
      localStorage.setItem('api_jwt', res.data.token)
      api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
    }
    await fetch()
    return res.data
  }

  async function logoutBackend () {
    try {
      // clear token client-side if used
      if (typeof window !== 'undefined') {
        localStorage.removeItem('api_jwt')
        delete api.defaults.headers.common.Authorization
      }
      await api.post('/auth/logout')
    } catch (e) {
      console.warn('logoutBackend error:', e)
    }
    clear()
  }

  function clear () {
    user.value = null
    loggedIn.value = false
  }

  function openInPopup (url) {
    const popup = window.open(url, 'oauth', 'width=600,height=700')
    const timer = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(timer)
          fetch()
        }
      } catch (e) {
        // ignore cross-origin until redirect back
        console.warn('popup check error:', e)
      }
    }, 500)
  }

  // Immediately try to fetch session on composable init
  // try to load token from localStorage and set Authorization
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('api_jwt')
    if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  fetch()

  return { user, loggedIn, fetch, clear: logoutBackend, openInPopup, login }
}
