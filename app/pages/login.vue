<script setup lang="ts">
definePageMeta({
    layout: 'auth'
})

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
    if (!email.value || !password.value) {
        error.value = 'Todos los campos son obligatorios'
        return
    }

    // Aquí harías la petición a tu backend (ejemplo con $fetch)
    try {
        const res = await $fetch('/api/login', {
            method: 'POST',
            body: { email: email.value, password: password.value }
        })

        console.log('Login success:', res)
        // Aquí podrías redirigir a /dashboard o /
        navigateTo('/')
    } catch (err: any) {
        error.value = err.data?.message || 'Error en el login'
    }
}
</script>

<template>
    <div>
        <h2 class="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
            <input v-model="email" type="email" placeholder="Correo" class="w-full border px-3 py-2 rounded" />
            <input v-model="password" type="password" placeholder="Contraseña"
                class="w-full border px-3 py-2 rounded" />
            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Ingresar
            </button>
        </form>
    </div>
</template>
