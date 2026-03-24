<template>
  <q-page class="q-pa-md">
    <q-card class="max-w-md q-mx-auto">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" ref="formRef">
          <q-input v-model="form.name" label="Name" dense />
          <q-input v-model="form.email" label="Email" type="email" dense class="q-mt-md" />
          <q-input v-model="form.password" label="Password" type="password" dense class="q-mt-md" />

          <div class="q-mt-md">
            <q-btn label="Register" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const formRef = ref(null)
const form = reactive({ name: '', email: '', password: '' })

async function onSubmit () {
  try {
    await api.post('/auth/register', { ...form }, { withCredentials: true })
    $q.notify({ type: 'positive', message: 'Registered successfully' })
    // you might want to redirect or fetch session
    // consider redirecting to movies after register
    router.push('/movies')
  } catch (err) {
    const msg = err?.response?.data?.message || 'Error registering'
    $q.notify({ type: 'negative', message: msg })
  }
}
</script>
