<template>
  <q-page class="q-pa-md">
    <q-card class="max-w-md q-mx-auto">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" ref="formRef">
          <q-input v-model="form.email" label="Email" type="email" dense :disable="loading" />
          <q-input v-model="form.password" label="Password" type="password" dense class="q-mt-md" :disable="loading" />

          <div class="q-mt-md">
            <q-btn label="Login" type="submit" color="primary" :loading="loading" :disable="loading" />
          </div>
        </q-form>

        <div class="q-mt-md">
          <!-- <q-btn flat label="Login with Github" icon="fab fa-github" @click="loginWithGithub" /> -->
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserSession } from 'src/composables/useUserSession'

const $q = useQuasar()
const router = useRouter()
const formRef = ref(null)
const form = reactive({ email: '', password: '' })
const loading = ref(false)
const {login } = useUserSession()

async function onSubmit () {
  loading.value = true
  try {
    await login({ email: form.email, password: form.password })
    $q.notify({ type: 'positive', message: 'Logged in successfully' })
    router.push('/movies')
  } catch (err) {
    const msg = err?.response?.data?.message || 'Error logging in'
    $q.notify({ type: 'negative', message: msg })
  } finally {
    loading.value = false
  }
}

// function loginWithGithub () {
//   openInPopup('/auth/github')
// }
</script>
