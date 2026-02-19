<script setup lang="ts">
import * as z from 'zod'
import { FetchError } from 'ofetch'

import type { FormSubmitEvent } from '@nuxt/ui'
const {  loggedIn, openInPopup, fetch } = useUserSession();
const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
console.log(event.data)
    try {
        await $fetch('/auth/login', {
            method: 'POST',
            body: event.data
        })
        fetch() // Refresh session data after registration
        toast.add({ title: 'Success', description: 'Benvingut. Has entrat amb èxit.', color: 'success' })
    } catch (error) {
        if (error instanceof FetchError) {
            toast.add({ title: 'Error', description: error.data.message, color: 'error' })
        } else {
            toast.add({ title: 'Error', description: 'An unexpected error occurred.', color: 'error' })
        }
    }
}
watch(loggedIn, () => {
    if (loggedIn.value) {
        navigateTo('/admin')
    }
})
</script>

<template>
    <UCard class="max-w-md m-auto my-10">
        <template>
            <h1 class="text-2xl text-center">Login</h1>
        </template>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Email" name="email">
                <UInput v-model="state.email" />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormField>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>

        <UButton type="submit" class="mt-4" @click="openInPopup('/auth/github')">
            Login with GitHub
        </UButton>
    </UCard>
</template>
