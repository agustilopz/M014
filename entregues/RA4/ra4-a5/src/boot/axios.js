import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Determine API base URL:
// - If API_BASE_URL env var provided (useful for build/dev), use it
// - If running on Android emulator, use 10.0.2.2
// - Otherwise default to localhost:3000
function getBaseURL () {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL
  }
  if (typeof window !== 'undefined' && /Android/i.test(navigator.userAgent)) {
    return 'http://10.0.2.2:3000'
  }
  return 'http://localhost:3000'
}

const api = axios.create({ baseURL: getBaseURL(), withCredentials: true })

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
