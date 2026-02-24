import { reactive } from 'vue'

// Estat global d'autenticació
export const auth = reactive({
  isAuthenticated: false,
  user: null
})

// Intentem restaurar l'usuari des de localStorage en carregar l'app
try {
  const stored = localStorage.getItem('auth_user')
  if (stored) {
    const parsed = JSON.parse(stored)
    auth.isAuthenticated = true
    auth.user = parsed
  }
} catch (e) {
  // Si hi ha cap error amb localStorage, simplement ignorem i seguim sense sessió
}

// Funció per establir l'estat d'autenticació globalment
export function setAuth(user) {
  auth.isAuthenticated = true
  auth.user = user
  try {
    localStorage.setItem('auth_user', JSON.stringify(user))
  } catch (e) {
    // Si localStorage falla, no trenquem el login
  }
}

// Funció per netejar l'estat d'autenticació
export function clearAuth() {
  auth.isAuthenticated = false
  auth.user = null
  try {
    localStorage.removeItem('auth_user')
  } catch (e) {
    // Ignorem errors de localStorage
  }
}
