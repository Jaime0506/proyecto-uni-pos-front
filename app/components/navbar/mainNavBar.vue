<script setup lang="ts"></script>

<template>
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-8">
                    <NuxtLink to="/"
                        class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                        Inicio
                    </NuxtLink>
                    <NuxtLink to="/products"
                        class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                        Productos
                    </NuxtLink>
                    <NuxtLink to="/campaigns"
                        class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                        Campañas
                    </NuxtLink>
                </div>

                <div class="flex items-center">
                    <button class="flex items-center space-x-2 rounded-full">
                        <img src="https://i.pravatar.cc/100" alt="Perfil de usuario"
                            class="h-10 w-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200" />
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>