<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: string
  name: string
  type?: string
  label?: string
  placeholder?: string
  modelValue: string
  error?: boolean
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
    <label :for="id" class="block text-sm font-medium text-slate-700 mb-2">
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
        'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder:text-slate-400',
        error ? 'border-red-500' : 'border-slate-300'
      ]"
    />
  </div>
</template>
