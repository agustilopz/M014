<template>
  <div class="register-container">
    <h2>Registre d'usuari</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Usuari</label>
        <input v-model="username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Contrasenya</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Registrar</button>
      <p v-if="success" class="success">Registre completat! Ara pots iniciar sessió.</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)

async function handleRegister() {
  error.value = ''
  success.value = false
  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })
    if (!res.ok) {
      const msg = await res.text()
      throw new Error(msg)
    }
    success.value = true
    username.value = ''
    password.value = ''
  } catch (e) {
    error.value = e.message || 'Error en el registre'
  }
}
</script>

<style scoped>
.login-container, .register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.success {
  color: #388e3c;
  margin-top: 1rem;
}
.error {
  color: #d32f2f;
  margin-top: 1rem;
}
form > div {
  margin-bottom: 1.2rem;
}
label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: bold;
  color: #333;
}
input[type="text"], input[type="password"] {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
button {
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #e65100;
}
</style>
