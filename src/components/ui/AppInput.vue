<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-dark mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="$slots.prepend" class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        <slot name="prepend" />
      </div>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :class="[
          'w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-dark placeholder-gray-400 outline-none transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
          $slots.prepend && 'pl-12',
          $slots.append && 'pr-12'
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        v-bind="$attrs"
      />
      <div v-if="$slots.append" class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
        <slot name="append" />
      </div>
    </div>
    <p v-if="error" class="mt-1.5 text-sm text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="mt-1.5 text-sm text-gray-400">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  }
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
}>()

const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`)
</script>