<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '~/components/auth/login/BaseInput.vue'

definePageMeta({
    layout: false
})

interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    username: string
    isSuperRoot: boolean
}

interface LoginResponse {
    accessToken: string
    refreshToken: string
    expiresAt: string
    user: User
}

const form = ref({
    userName: '',
    password: ''
})

const alertMessage = ref<string | null>(null)
const alertType = ref<'success' | 'error' | null>(null)
const isLoading = ref(false)

const isFormComplete = computed(() => {
    return form.value.userName.trim() !== '' && form.value.password.trim() !== ''
})

const router = useRouter()

const handleLogin = async () => {
    if (!isFormComplete.value) {
        alertMessage.value = '⚠️ Debes llenar todos los campos'
        alertType.value = 'error'
        return
    }

    try {
        isLoading.value = true
        const response = await $fetch<LoginResponse>('http://localhost:3001/api/v1/auth/login', {
            method: 'POST',
            body: {
                userName: form.value.userName,
                password: form.value.password,
                deviceId: "string",
                companyId: 1
            },
        })

        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('expiresAt', response.expiresAt)

        alertMessage.value = '✅ Inicio de sesión exitoso'
        alertType.value = 'success'
        console.log('✅ Login:', response)

        setTimeout(() => {
            router.push('/dashboard') // cambia '/dashboard' a la ruta que quieras
        }, 1000)

        // aquí podrías guardar el token en localStorage o en pinia
        // localStorage.setItem('token', response.access_token)
    } catch (error: any) {
        alertMessage.value = error?.data?.message || '❌ Credenciales incorrectas'
        alertType.value = 'error'
        console.error('❌ Error en login:', error?.data || error)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div class="w-full max-w-md">
            <div class="bg-white rounded-2xl shadow-2xl p-8">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-slate-900 mb-2">Iniciar Sesión</h1>
                    <p class="text-slate-600">Ingresa tus credenciales para continuar</p>
                </div>

                <!-- ALERTA -->
                <div v-if="alertMessage" class="mb-4">
                    <p :class="[
                        'text-sm font-semibold p-2 rounded-md',
                        alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    ]">
                        {{ alertMessage }}
                    </p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <BaseInput id="userName" name="userName" label="Usuario" placeholder="Ingresa tu usuario"
                        v-model="form.userName" required />

                    <BaseInput id="password" name="password" type="password" label="Contraseña"
                        placeholder="Ingresa tu contraseña" v-model="form.password" required />

                    <!-- LOADING BUTTON -->
                    <button type="submit" :disabled="!isFormComplete || isLoading"
                        class="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isLoading" class="flex items-center gap-2">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                                </path>
                            </svg>
                            Iniciando...
                        </span>
                        <span v-else>Iniciar Sesión</span>
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-slate-600">
                        ¿No tienes una cuenta?
                        <NuxtLink to="/auth/register" class="text-blue-600 hover:text-blue-700 font-semibold">
                            Regístrate aquí
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
