<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <div class="flex justify-between items-center">
        <h2 class="text-h6">Les meves pel·lícules</h2>
        <q-btn outline color="primary" label="Afegeix pel·lícules de mostra" @click="seedDemoMovies" :loading="seeding" />
      </div>

      <div v-if="pending" class="text-grey">Carregant pel·lícules...</div>
      <div v-else-if="error" class="text-negative">Hi ha hagut un problema carregant les pel·lícules.</div>

      <div v-else>
        <div v-if="movies && movies.length" class="q-gutter-md row">
          <q-card v-for="movie in movies" :key="movie.id" class="col-12 col-md-4">
            <q-card-section>
              <div class="text-subtitle1">{{ movie.title }}</div>
              <div class="text-caption">{{ movie.year }}</div>
            </q-card-section>
            <q-img v-if="movie.posterUrl" :src="movie.posterUrl" style="height: 180px" />
            <q-card-actions align="right">
              <q-btn flat label="Editar" @click="startEdit(movie)" />
              <q-btn flat color="negative" label="Eliminar" @click="deleteMovie(movie.id)" />
            </q-card-actions>
          </q-card>
        </div>
        <div v-else class="text-grey">Encara no tens cap pel·lícula.</div>
      </div>

      <div class="q-gutter-md row">
        <q-card class="col-12 col-md-6">
          <q-card-section>
            <div class="text-subtitle2">Afegir pel·lícula</div>
            <q-form @submit.prevent="onCreateSubmit">
              <q-input v-model="createState.title" label="Títol" />
              <div class="row q-gutter-sm">
                <q-input v-model.number="createState.year" label="Any" class="col" />
                <q-input v-model.number="createState.runtime" label="Durada (minuts)" class="col" />
              </div>
              <q-input v-model="createState.country" label="País" />
              <q-input v-model="createState.director" label="Director" />
              <q-input v-model="createState.posterUrl" label="Poster URL" />
              <q-btn type="submit" label="Afegeix pel·lícula" color="primary" />
            </q-form>
          </q-card-section>
        </q-card>

        <q-card v-if="editingId !== null" class="col-12 col-md-6">
          <q-card-section>
            <div class="flex justify-between items-center">
              <div class="text-subtitle2">Editar pel·lícula</div>
              <q-btn flat label="Cancel·lar" @click="cancelEdit" />
            </div>
            <q-form @submit.prevent="onEditSubmit">
              <q-input v-model="editState.title" label="Títol" />
              <div class="row q-gutter-sm">
                <q-input v-model.number="editState.year" label="Any" class="col" />
                <q-input v-model.number="editState.runtime" label="Durada (minuts)" class="col" />
              </div>
              <q-input v-model="editState.country" label="País" />
              <q-input v-model="editState.director" label="Director" />
              <q-input v-model="editState.posterUrl" label="Poster URL" />
              <q-btn type="submit" label="Desar canvis" color="primary" />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

const seeding = ref(false)
const movies = ref([])
const pending = ref(false)
const error = ref(null)

async function loadMovies () {
  pending.value = true
  error.value = null
  try {
    const res = await api.get('/api/movies')
    movies.value = res.data
  } catch (err) {
    error.value = err
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  loadMovies()
})

const createState = reactive({ title: '', year: new Date().getFullYear(), country: '', director: '', runtime: 120, posterUrl: '' })
const editingId = ref(null)
const editState = reactive({})

function startEdit(movie) {
  editingId.value = movie.id
  Object.assign(editState, movie)
}

function cancelEdit() {
  editingId.value = null
}

async function onCreateSubmit () {
  try {
    await api.post('/api/movies', createState)
    Notify.create({ type: 'positive', message: "Pel·lícula creada" })
    await loadMovies()
  } catch (err) {
    Notify.create({ type: 'negative', message: 'Error creant la pel·lícula, ' + err.message })
  }
}

async function onEditSubmit () {
  if (!editingId.value) return
  try {
    await api.put(`/api/movies/${editingId.value}`, editState)
    Notify.create({ type: 'positive', message: 'Pel·lícula actualitzada' })
    editingId.value = null
    await loadMovies()
  } catch (err) {
    Notify.create({ type: 'negative', message: 'Error actualitzant la pel·lícula, ' + err.message })
  }
}

async function deleteMovie (id) {
  try {
    await api.delete(`/api/movies/${id}`)
    Notify.create({ type: 'positive', message: 'Pel·lícula eliminada' })
    await loadMovies()
  } catch (err) {
    Notify.create({ type: 'negative', message: 'Error eliminant la pel·lícula, ' + err.message })
  }
}

async function seedDemoMovies () {
  try {
    seeding.value = true
    const result = await api.post('/api/movies/seed')
    if (result.data?.seeded) {
      Notify.create({ type: 'positive', message: `S'han afegit ${result.data.count ?? 0} pel·lícules` })
      await loadMovies()
    } else {
      Notify.create({ type: 'info', message: result.data?.message ?? 'Sense canvis' })
    }
  } catch (err) {
    Notify.create({ type: 'negative', message: 'Error afegint pel·lícules de mostra, ' + err.message })
  } finally {
    seeding.value = false
  }
}
</script>
