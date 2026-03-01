<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { movieSchema, type Movie, type MoviePayload } from "~/types/movie";

definePageMeta({
  middleware: ["auth"],
});

const toast = useToast();

const seeding = ref(false);

const {
  data: movies,
  pending,
  error,
  refresh,
} = await useFetch<Movie[]>("/api/movies", {
  lazy: true,
});

const createState = reactive<Partial<MoviePayload>>({
  title: "",
  year: new Date().getFullYear(),
  country: "",
  director: "",
  runtime: 120,
  posterUrl: "",
});

const editingId = ref<number | null>(null);
const editState = reactive<Partial<MoviePayload>>({});

function startEdit(movie: Movie) {
  editingId.value = movie.id;
  editState.title = movie.title;
  editState.year = movie.year;
  editState.country = movie.country;
  editState.director = movie.director;
  editState.runtime = movie.runtime;
  editState.posterUrl = movie.posterUrl ?? "";
}

function cancelEdit() {
  editingId.value = null;
}

async function onCreateSubmit(event: FormSubmitEvent<MoviePayload>) {
  try {
    await $fetch("/api/movies", {
      method: "POST",
      body: event.data,
    });
    toast.add({
      title: "Pel·lícula creada",
      description: "S'ha afegit correctament.",
      color: "success",
    });
    await refresh();
  } catch (error) {
    toast.add({
      title: "Error creant la pel·lícula",
      description: "Revisa les dades i torna-ho a provar.",
      color: "error",
    });
  }
}

async function onEditSubmit(event: FormSubmitEvent<MoviePayload>) {
  if (!editingId.value) return;
  try {
    await $fetch(`/api/movies/${editingId.value}`, {
      method: "PUT",
      body: event.data,
    });
    toast.add({
      title: "Pel·lícula actualitzada",
      description: "S'han desat els canvis.",
      color: "success",
    });
    editingId.value = null;
    await refresh();
  } catch (error) {
    toast.add({
      title: "Error actualitzant la pel·lícula",
      description: "No s'han pogut desar els canvis.",
      color: "error",
    });
  }
}

async function deleteMovie(id: number) {
  try {
    await $fetch(`/api/movies/${id}`, {
      method: "DELETE",
    });
    toast.add({
      title: "Pel·lícula eliminada",
      description: "S'ha eliminat correctament.",
      color: "success",
    });
    await refresh();
  } catch (error) {
    toast.add({
      title: "Error eliminant la pel·lícula",
      description: "No s'ha pogut eliminar.",
      color: "error",
    });
  }
}

async function seedDemoMovies() {
  try {
    seeding.value = true;
    const result = await $fetch<{
      seeded: boolean;
      count?: number;
      message?: string;
    }>("/api/movies/seed", {
      method: "POST",
    });

    if (result.seeded) {
      toast.add({
        title: "Pel·lícules afegides",
        description: `S'han afegit ${result.count ?? 0} pel·lícules de mostra.`,
        color: "success",
      });
      await refresh();
    } else {
      toast.add({
        title: "Sense canvis",
        description:
          result.message ??
          "No s'han afegit pel·lícules perquè ja en tens al teu compte.",
        color: "info",
      });
    }
  } catch (error) {
    toast.add({
      title: "Error afegint pel·lícules de mostra",
      description: "Torna-ho a provar més tard.",
      color: "error",
    });
  } finally {
    seeding.value = false;
  }
}
</script>

<template>
  <UContainer class="py-10 space-y-8">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Les meves pel·lícules</h1>
      <UButton :loading="seeding" size="sm" variant="outline" @click="seedDemoMovies">
        Afegir pel·lícules de mostra
      </UButton>
    </header>

    <section>
      <div v-if="pending" class="text-gray-500">Carregant pel·lícules...</div>
      <div v-else-if="error" class="text-red-500">
        Hi ha hagut un problema carregant les pel·lícules.
      </div>
      <div v-else>
        <div v-if="movies && movies.length" class="grid gap-6 md:grid-cols-3">
          <UCard v-for="movie in movies" :key="movie.id" class="flex flex-col h-full">
            <template #header>
              <div class="flex items-center justify-between gap-2">
                <h2 class="font-semibold truncate">{{ movie.title }}</h2>
                <span class="text-sm text-gray-500">{{ movie.year }}</span>
              </div>
            </template>

            <div class="space-y-2 flex-1">
              <p class="text-sm text-gray-600">
                <strong>Director:</strong> {{ movie.director }}
              </p>
              <p class="text-sm text-gray-600">
                <strong>País:</strong> {{ movie.country }}
              </p>
              <p class="text-sm text-gray-600">
                <strong>Durada:</strong> {{ movie.runtime }} min
              </p>
              <div v-if="movie.posterUrl" class="mt-2">
                <img
                  :src="movie.posterUrl"
                  :alt="movie.title"
                  class="object-cover w-full h-48 rounded-md"
                />
              </div>
            </div>

            <template #footer>
              <div class="flex justify-between gap-2">
                <UButton size="xs" @click="startEdit(movie)"> Editar </UButton>
                <UButton
                  size="xs"
                  color="red"
                  variant="outline"
                  @click="deleteMovie(movie.id)"
                >
                  Eliminar
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
        <div v-else class="text-gray-500">
          Encara no tens cap pel·lícula. Afegeix-ne una amb el formulari de sota.
        </div>
      </div>
    </section>

    <section class="grid gap-6 md:grid-cols-2">
      <UCard>
        <template #header>
          <h2 class="font-semibold">Afegir pel·lícula</h2>
        </template>

        <UForm
          :schema="movieSchema"
          :state="createState"
          class="space-y-4"
          @submit="onCreateSubmit"
        >
          <UFormField label="Títol" name="title">
            <UInput v-model="createState.title" />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Any" name="year">
              <UInput v-model="createState.year" type="number" />
            </UFormField>
            <UFormField label="Durada (minuts)" name="runtime">
              <UInput v-model="createState.runtime" type="number" />
            </UFormField>
          </div>

          <UFormField label="País" name="country">
            <UInput v-model="createState.country" />
          </UFormField>

          <UFormField label="Director" name="director">
            <UInput v-model="createState.director" />
          </UFormField>

          <UFormField label="Poster URL" name="posterUrl">
            <UInput v-model="createState.posterUrl" />
          </UFormField>

          <UButton type="submit" block>Afegeix pel·lícula</UButton>
        </UForm>
      </UCard>

      <UCard v-if="editingId !== null">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">Editar pel·lícula</h2>
            <UButton size="xs" variant="ghost" @click="cancelEdit"> Cancel·lar </UButton>
          </div>
        </template>

        <UForm
          :schema="movieSchema"
          :state="editState"
          class="space-y-4"
          @submit="onEditSubmit"
        >
          <UFormField label="Títol" name="title">
            <UInput v-model="editState.title" />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Any" name="year">
              <UInput v-model="editState.year" type="number" />
            </UFormField>
            <UFormField label="Durada (minuts)" name="runtime">
              <UInput v-model="editState.runtime" type="number" />
            </UFormField>
          </div>

          <UFormField label="País" name="country">
            <UInput v-model="editState.country" />
          </UFormField>

          <UFormField label="Director" name="director">
            <UInput v-model="editState.director" />
          </UFormField>

          <UFormField label="Poster URL" name="posterUrl">
            <UInput v-model="editState.posterUrl" />
          </UFormField>

          <UButton type="submit" block>Desar canvis</UButton>
        </UForm>
      </UCard>
    </section>
  </UContainer>
</template>

