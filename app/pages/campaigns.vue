<script setup lang="ts">
import { ref, watch } from "vue"

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

interface SelectedProduct {
    productId: number,
    discountValue: number,
    minQty: number,
    maxQty: number,
}

interface Campaign {
    title: string
    description: string
    startsAt: string
    endsAt: string
}

const isModalOpen = ref(false)
const products = ref<Product[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const campaign = ref<Campaign>({
    title: "",
    description: "",
    startsAt: "",
    endsAt: ""
})

const selectedProducts = ref<SelectedProduct[]>([])

const formatPrice = (price: string) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(Number.parseFloat(price))
}

function formatToISO(date: string, endOfDay = false): string {
    if (!date) return ''
    const d = new Date(date)
    if (endOfDay) {
        d.setHours(23, 59, 59, 999)
    } else {
        d.setHours(0, 0, 0, 0)
    }
    return d.toISOString()
}

const fetchProducts = async () => {
    isLoading.value = true
    errorMessage.value = null

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

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        console.log("data", data)
        products.value = data
    } catch (error: any) {
        errorMessage.value = error.message || "Error al cargar productos"
    } finally {
        isLoading.value = false
    }
}

const handleSave = () => {
    console.log("Productos seleccionados:", selectedProducts.value)
    console.log("Campana info:", campaign.value)
    isModalOpen.value = false
}

async function createRewardRule() {
    errorMessage.value = "";

    const body = {
        title: campaign.value.title,
        description: campaign.value.description,
        startsAt: campaign.value.startsAt ? new Date(campaign.value.startsAt).toISOString() : null,
        endsAt: campaign.value.endsAt ? new Date(campaign.value.endsAt).toISOString() : null,
        isActive: true,
        companyId: 1,
        storeId: 1,
        products: selectedProducts.value.map((p) => ({
            productId: p.productId,
            discountValue: p.discountValue ?? 10,
            minQty: p.minQty ?? 1,
            maxQty: p.maxQty ?? 10
        }))
    };

    try {
        const token = localStorage.getItem("accessToken")
        if (!token) {
            errorMessage.value = "No hay token disponible"
            isLoading.value = false
            return
        }

        const response = await $fetch("http://localhost:3001/api/v1/rewards/create", {
            method: "POST",
            body,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(response)

        // if (error.value) {
        //     errorMessage.value = "Error al crear la regla de recompensa";
        //     console.error(error.value);
        // } else {
        //     console.log("Reward Rule creada:", data.value);
        // }
    } catch (err) {
        console.error("Error inesperado", err);
        errorMessage.value = "Ocurrió un error inesperado";
    } finally {
        isModalOpen.value = false
    }
}

const toggleProduct = (product: Product, checked: boolean) => {
    if (checked) {
        selectedProducts.value.push({
            productId: product.id,
            discountValue: 0,
            minQty: 0,
            maxQty: 1,
        })
    } else {
        selectedProducts.value = selectedProducts.value.filter(
            (p: any) => p.productId !== product.id
        )
    }
}

// Obtener un producto seleccionado por ID
const getSelectedProduct = (id: number) =>
    selectedProducts.value.find((p: any) => p.productId === id)

watch(isModalOpen, (newVal) => {
    if (newVal) {
        fetchProducts()
        selectedProducts.value = []
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Botón superior -->
            <div class="mb-6">
                <button @click="isModalOpen = true"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Nueva Campaña
                </button>
            </div>

            <!-- Contenido -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h1 class="text-3xl font-bold text-gray-800 mb-4">Campañas</h1>
                <p class="text-gray-600">Aquí puedes gestionar todas tus campañas.</p>
            </div>
        </div>

        <!-- Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black/50 transition-opacity" @click="isModalOpen = false"></div>

                    <!-- Contenido modal -->
                    <div
                        class="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 p-6 transform transition-all max-h-[90vh] overflow-y-auto">
                        <!-- Cerrar -->
                        <button @click="isModalOpen = false"
                            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 class="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Campaña</h2>

                        <!-- Info campaña -->
                        <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">Información de la Campaña</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="md:col-span-2">
                                    <label for="titulo"
                                        class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input id="titulo" type="text" v-model="campaign.title"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Ingrese el título de la campaña" />
                                </div>
                                <div class="md:col-span-2">
                                    <label for="descripcion"
                                        class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea id="descripcion" rows="3" v-model="campaign.description"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="Ingrese la descripción de la campaña"></textarea>
                                </div>
                                <div>
                                    <label for="fechaInicio" class="block text-sm font-medium text-gray-700 mb-1">Fecha
                                        Inicio</label>
                                    <input id="fechaInicio" type="date"
                                        @change="campaign.startsAt = formatToISO(($event.target as HTMLInputElement).value, false)"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                                <div>
                                    <label for="fechaFin" class="block text-sm font-medium text-gray-700 mb-1">Fecha
                                        Fin</label>
                                    <input id="fechaFin" type="date"
                                        @change="campaign.endsAt = formatToISO(($event.target as HTMLInputElement).value, false)"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                            </div>
                        </div>

                        <!-- Lista de productos -->
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Seleccionar Productos</h3>

                        <div v-if="isLoading" class="flex flex-col items-center gap-2">
                            <svg class="animate-spin h-7 w-7 text-blue-600" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                                </path>
                            </svg>
                            <span class="text-slate-600 font-medium">Cargando productos...</span>
                        </div>

                        <div v-else-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>
                        <div v-else class="space-y-3 mb-6">
                            <div v-for="product in products" :key="product.id"
                                class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-gray-800 mb-1">{{ product.name }}</h4>
                                        <div class="flex gap-4 text-sm text-gray-600">
                                            <span><span class="font-medium">Compra:</span> {{
                                                formatPrice(product.purchasePrice) }}</span>
                                            <span><span class="font-medium">Venta:</span> {{
                                                formatPrice(product.salePrice) }}</span>
                                        </div>
                                    </div>
                                    <input type="checkbox" :checked="!!getSelectedProduct(product.id)"
                                        @change="toggleProduct(product, ($event.target as HTMLInputElement).checked)" />

                                </div>

                                <!-- Inputs extra -->
                                <div v-if="getSelectedProduct(product.id)"
                                    class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">

                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 mb-1">
                                            Descuento (%)
                                        </label>
                                        <input type="number"
                                            v-model.number="getSelectedProduct(product.id)!.discountValue" min="0"
                                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="0" />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 mb-1">
                                            Cantidad Mínima
                                        </label>
                                        <input type="number" v-model.number="getSelectedProduct(product.id)!.minQty"
                                            min="0"
                                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="0" />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 mb-1">
                                            Cantidad Máxima
                                        </label>
                                        <input type="number" v-model.number="getSelectedProduct(product.id)!.maxQty"
                                            min="0"
                                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="0" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Acciones -->
                        <div class="flex gap-3 pt-4 border-t border-gray-200">
                            <button type="button" @click="isModalOpen = false"
                                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                Cancelar
                            </button>
                            <button type="submit" @click="createRewardRule"
                                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
                                Crear Campaña
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>