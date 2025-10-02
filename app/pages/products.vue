<script setup lang="ts">
import { ref, onMounted } from "vue"

interface Product {
    id: number
    name: string
    sku: string
    barcode: string
    purchasePrice: string
    salePrice: string
    taxExempt: boolean
    stock: number
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

const products = ref<Product[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const formatPrice = (price: string) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(Number.parseFloat(price))
}

onMounted(async () => {
    try {
        const token = localStorage.getItem("accessToken")
        if (!token) {
            errorMessage.value = "No hay token disponible"
            isLoading.value = false
            return
        }

        const response = await fetch("http://localhost:3001/api/v1/products/get-all", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ companyId: 1 }),
        })

        console.log(response)

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()

        console.log(data)

        products.value = data
    } catch (error: any) {
        errorMessage.value = error.message || "Error al cargar productos"
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <!-- Loading -->
        <div v-if="isLoading" class="flex flex-col items-center gap-2">
            <svg class="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span class="text-slate-600 font-medium">Cargando productos...</span>
        </div>

        <div v-else-if="errorMessage" class="text-red-600 font-semibold">
            {{ errorMessage }}
        </div>

        <div v-else class="max-w-7xl mx-auto w-full">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="product in products" :key="product.id"
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2"></div>

                    <div class="p-6">
                        <h2 class="text-xl font-semibold text-slate-800 mb-4 line-clamp-2 min-h-[3.5rem]">
                            {{ product.name }}
                        </h2>

                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-500 font-medium">Precio Compra:</span>
                                <span class="text-base font-semibold text-slate-700">
                                    {{ formatPrice(product.purchasePrice) }}
                                </span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-500 font-medium">Precio Venta:</span>
                                <span class="text-lg font-bold text-green-600">
                                    {{ formatPrice(product.salePrice) }}
                                </span>
                            </div>

                            <div class="pt-3 border-t border-slate-200">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-slate-500 font-medium">Stock:</span>
                                    <span class="text-base font-bold px-3 py-1 rounded-full" :class="{
                                        'bg-green-100 text-green-700': product.stock > 30,
                                        'bg-yellow-100 text-yellow-700': product.stock > 15 && product.stock <= 30,
                                        'bg-red-100 text-red-700': product.stock <= 15,
                                    }">
                                        {{ product.stock }} unidades
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-slate-200">
                            <p class="text-xs text-slate-400">SKU: {{ product.sku }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
