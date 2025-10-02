<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInput from '~/components/auth/register/BaseInput.vue'
import { createUserName } from '~/utils/createUserName'

definePageMeta({
  layout: false
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  nationalId: '',
  password: '',
  confirmPassword: ''
})

const alertMessage = ref<string | null>(null)
const alertType = ref<'success' | 'error' | null>(null)
const isLoading = ref(false)

const passwordMatchError = computed(() => {
  return form.value.confirmPassword.length > 0 && form.value.password !== form.value.confirmPassword
})

const isFormComplete = computed(() => {
  return Object.values(form.value).every(value => value.trim() !== '')
})

const generatedUsername = computed(() => {
  if (form.value.firstName && form.value.lastName && form.value.nationalId) {
    return createUserName(form.value.firstName, form.value.lastName, form.value.nationalId)
  }
  return '' // vacío si faltan campos
})

const handleSubmit = async () => {
  if (!isFormComplete.value) {
    alertMessage.value = '⚠️ Faltan campos por llenar'
    alertType.value = 'error'
    return
  }
  if (passwordMatchError.value) {
    alertMessage.value = '❌ Las contraseñas no coinciden'
    alertType.value = 'error'
    return
  }

  try {
    isLoading.value = true
    const response = await $fetch('http://localhost:3001/api/v1/auth/register', {
      method: 'POST',
      body: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        nationalId: form.value.nationalId,
        password: form.value.password,
      },
    })

    alertMessage.value = '✅ Usuario creado exitosamente'
    alertType.value = 'success'
    console.log('✅ Usuario creado:', response)

    // Opcional: limpiar formulario
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      nationalId: '',
      password: '',
      confirmPassword: ''
    }
  } catch (error: any) {
    alertMessage.value = error?.data?.message || '❌ Error al registrar el usuario'
    alertType.value = 'error'
    console.error('❌ Error al registrar:', error?.data || error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-2xl p-6">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-slate-900 mb-1">Crear Cuenta</h1>

          <p class="text-sm text-slate-600">
            {{ generatedUsername || 'Completa el formulario para registrarte' }}
          </p>
        </div>

        <div v-if="alertMessage" class="mb-4">
          <p :class="[
            'text-sm font-semibold p-2 rounded-md',
            alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          ]">
            {{ alertMessage }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <BaseInput id="firstName" name="firstName" label="Nombre" placeholder="Elige un nombre de usuario"
            v-model="form.firstName" required />

          <BaseInput id="lastName" name="lastName" label="Apellido" placeholder="Elige un apellido"
            v-model="form.lastName" required />

          <BaseInput id="email" name="email" type="email" label="Correo Electrónico" placeholder="tu@email.com"
            v-model="form.email" required />

          <BaseInput id="nationalId" name="nationalId" type="number" label="Cédula" placeholder="1234567890"
            v-model="form.nationalId" required />

          <BaseInput id="password" name="password" type="password" label="Contraseña"
            placeholder="Crea una contraseña segura" helperText="Mínimo 8 caracteres, incluye letras y números"
            v-model="form.password" required />

          <BaseInput id="confirm-password" name="confirmPassword" type="password" label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña" v-model="form.confirmPassword" :error="passwordMatchError" required />
          <p v-if="passwordMatchError" class="text-red-500 text-sm">Las contraseñas no coinciden</p>

          <button type="submit" :disabled="!isFormComplete || passwordMatchError || isLoading"
            class="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">

            <span v-if="isLoading" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Creando...
            </span>
            <span v-else>Crear Cuenta</span>
          </button>

        </form>

        <div class="mt-4 text-center">
          <p class="text-sm text-slate-600">
            ¿Ya tienes una cuenta?
            <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-700 font-semibold">
              Inicia sesión
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
