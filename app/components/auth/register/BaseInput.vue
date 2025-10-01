<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: string
  name: string
  type?: string
  label?: string
  placeholder?: string
  modelValue: string
  helperText?: string
  error?: boolean // 👈 nueva prop para marcar error
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-slate-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :name="name"
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      :class="[
        'w-full px-3 py-2 border rounded-lg transition-all duration-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent',
        error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
      ]"
    />
    <p v-if="helperText" class="mt-1 text-xs text-slate-500">{{ helperText }}</p>
  </div>
</template>
