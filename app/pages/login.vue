<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div class="w-full max-w-md">
            <div class="bg-white rounded-2xl shadow-2xl p-8">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-slate-900 mb-2">Iniciar Sesión</h1>
                    <p class="text-slate-600">Ingresa tus credenciales para continuar</p>
                </div>

                <form class="space-y-6">
                    <div>
                        <label htmlFor="username" class="block text-sm font-medium text-slate-700 mb-2">
                            Usuario
                        </label>
                        <input type="text" id="username" name="username"
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                            placeholder="Ingresa tu usuario" required />
                    </div>

                    <div>
                        <label htmlFor="password" class="block text-sm font-medium text-slate-700 mb-2">
                            Contraseña
                        </label>
                        <input type="password" id="password" name="password"
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                            placeholder="Ingresa tu contraseña" required />
                    </div>

                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input type="checkbox"
                                class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                            <span class="ml-2 text-sm text-slate-600">Recordarme</span>
                        </label>
                        <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                        Iniciar Sesión
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-slate-600">
                        ¿No tienes una cuenta?
                        <NuxtLink href="/register" class="text-blue-600 hover:text-blue-700 font-semibold">
                            Regístrate aquí
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
