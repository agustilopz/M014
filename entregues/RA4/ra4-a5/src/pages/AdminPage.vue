<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <div class="flex justify-between items-center">
        <h2 class="text-h6">Les meves pel·lícules</h2>
        <div>
          <q-btn color="primary" label="Afegeix pel·lícula" @click="showCreateDialog = true" />
        </div>
      </div>

      <ProtectedView>
        <section>
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
        </section>
      </ProtectedView>

      <!-- Create dialog -->
      <q-dialog v-model="showCreateDialog" persistent>
        <q-card style="min-width: 400px;">
          <q-card-section>
            <div class="text-h6">Afegir pel·lícula</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onCreateSubmit">
              <q-input v-model="createState.title" label="Títol" />
              <div class="row q-gutter-sm">
                <q-input v-model.number="createState.year" label="Any" class="col" />
                <q-input v-model.number="createState.runtime" label="Durada (minuts)" class="col" />
              </div>
              <q-input v-model="createState.country" label="País" />
              <q-input v-model="createState.director" label="Director" />
              <q-input v-model="createState.posterUrl" label="Poster URL" />

              <div class="row justify-end q-gutter-sm q-mt-md">
                <q-btn flat label="Cancel·lar" @click="showCreateDialog = false" />
                <q-btn color="primary" type="submit" label="Afegeix pel·lícula" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Edit dialog -->
      <q-dialog v-model="showEditDialog" persistent>
        <q-card style="min-width: 400px;">
          <q-card-section>
            <div class="text-h6">Editar pel·lícula</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onEditSubmit">
              <q-input v-model="editState.title" label="Títol" />
              <div class="row q-gutter-sm">
                <q-input v-model.number="editState.year" label="Any" class="col" />
                <q-input v-model.number="editState.runtime" label="Durada (minuts)" class="col" />
              </div>
              <q-input v-model="editState.country" label="País" />
              <q-input v-model="editState.director" label="Director" />
              <q-input v-model="editState.posterUrl" label="Poster URL" />

              <div class="row justify-end q-gutter-sm q-mt-md">
                <q-btn flat label="Cancel·lar" @click="cancelEditDialog" />
                <q-btn color="primary" type="submit" label="Desar canvis" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import ProtectedView from 'components/ProtectedView.vue'
import { useUserSession } from 'src/composables/useUserSession'

const $q = useQuasar()
const { loggedIn } = useUserSession()
const seeding = ref(false)
const movies = ref([])
const pending = ref(false)
const error = ref(null)

const showCreateDialog = ref(false)
const showEditDialog = ref(false)

async function loadMovies () {
  // avoid calling API when not authenticated
  if (!loggedIn.value) {
    movies.value = []
    pending.value = false
    return
  }

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

onMounted(async () => {
  // only load/seed if authenticated
  if (loggedIn.value) {
    await loadMovies()
    if (!movies.value || movies.value.length === 0) {
      await seedDemoMovies()
    }
  }
})

// react to login changes
watch(loggedIn, async (val) => {
  if (val) {
    await loadMovies()
    if (!movies.value || movies.value.length === 0) {
      await seedDemoMovies()
    }
  } else {
    // clear data when logged out
    movies.value = []
  }
})

const createState = reactive({ title: '', year: new Date().getFullYear(), country: '', director: '', runtime: 120, posterUrl: '' })
const editingId = ref(null)
const editState = reactive({})

function startEdit(movie) {
  editingId.value = movie.id
  Object.assign(editState, movie)
  showEditDialog.value = true
}


function cancelEditDialog () {
  // reset editState and close dialog
  editingId.value = null
  Object.keys(editState).forEach(k => delete editState[k])
  showEditDialog.value = false
}

async function onCreateSubmit () {
  try {
    await api.post('/api/movies', createState)
    $q.notify({ type: 'positive', message: 'Pel·lícula creada' })
    showCreateDialog.value = false
    // reset createState
    createState.title = ''
    createState.year = new Date().getFullYear()
    createState.country = ''
    createState.director = ''
    createState.runtime = 120
    createState.posterUrl = ''
    await loadMovies()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error creant la pel·lícula, ' + (err?.message || '') })
  }
}

async function onEditSubmit () {
  if (!editingId.value) return
  try {
    await api.put(`/api/movies/${editingId.value}`, editState)
    $q.notify({ type: 'positive', message: 'Pel·lícula actualitzada' })
    showEditDialog.value = false
    editingId.value = null
    await loadMovies()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error actualitzant la pel·lícula, ' + (err?.message || '') })
  }
}

async function deleteMovie (id) {
  try {
    await api.delete(`/api/movies/${id}`)
    $q.notify({ type: 'positive', message: 'Pel·lícula eliminada' })
    await loadMovies()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error eliminant la pel·lícula, ' + (err?.message || '') })
  }
}

async function seedDemoMovies () {
  if (!loggedIn.value) {
    // do not attempt seed when unauthenticated
    return
  }

  try {
    seeding.value = true
    const result = await api.post('/api/movies/seed')
    if (result.data?.seeded) {
      $q.notify({ type: 'positive', message: `S'han afegit ${result.data.count ?? 0} pel·lícules` })
      await loadMovies()
    } else {
      $q.notify({ type: 'info', message: result.data?.message ?? 'Sense canvis' })
    }
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error afegint pel·lícules de mostra, ' + (err?.message || '') })
  } finally {
    seeding.value = false
  }
}
</script>
