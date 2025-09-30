<template>
    <div
        class="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 overflow-hidden">
        <div class="w-full max-w-md">
            <div class="bg-white rounded-2xl shadow-2xl p-6">
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-slate-900 mb-1">Crear Cuenta</h1>
                    <p class="text-sm text-slate-600">Completa el formulario para registrarte</p>
                </div>

                <form class="space-y-4">
                    <div>
                        <label htmlFor="username" class="block text-sm font-medium text-slate-700 mb-1">
                            Nombre de Usuario
                        </label>
                        <input type="text" id="username" name="username"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                            placeholder="Elige un nombre de usuario" required />
                    </div>

                    <div>
                        <label htmlFor="email" class="block text-sm font-medium text-slate-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input type="email" id="email" name="email"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                            placeholder="tu@email.com" required />
                    </div>

                    <div>
                        <label htmlFor="password" class="block text-sm font-medium text-slate-700 mb-1">
                            Contraseña
                        </label>
                        <input type="password" id="password" name="password"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                            placeholder="Crea una contraseña segura" required />
                        <p class="mt-1 text-xs text-slate-500">Mínimo 8 caracteres, incluye letras y números</p>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" class="block text-sm font-medium text-slate-700 mb-1">
                            Confirmar Contraseña
                        </label>
                        <input type="password" id="confirm-password" name="confirm-password"
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400"
                            placeholder="Confirma tu contraseña" required />
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                        Crear Cuenta
                    </button>
                </form>

                <div class="mt-4 text-center">
                    <p class="text-sm text-slate-600">
                        ¿Ya tienes una cuenta?
                        <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-semibold">
                            Inicia sesión
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>