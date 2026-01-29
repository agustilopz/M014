import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserSessionStore = defineStore('userSession', () => {
  // Estat: nom d'usuari
  const username = ref('Guest Builder')

  // Acció: visitar perfil de GitHub
  function visitGithub() {
    // Simula obrir el perfil de GitHub de l'usuari
    const url = `https://github.com/${username.value.replace(/\\s+/g, '')}`
    window.open(url, '_blank')
  }

  return { username, visitGithub }
})