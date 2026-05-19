<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' && 'bg-primary-500 text-white hover:bg-primary-600',
      variant === 'secondary' && 'bg-gray-100 text-dark hover:bg-gray-200',
      variant === 'outline' && 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
      variant === 'ghost' && 'text-dark hover:bg-gray-100',
      variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
      size === 'sm' && 'px-4 py-2 text-sm',
      size === 'md' && 'px-6 py-3.5 text-base',
      size === 'lg' && 'px-8 py-4 text-lg',
      block && 'w-full',
      loading && 'opacity-70 cursor-wait'
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot v-else name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String as () => 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger',
    default: 'primary'
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md'
  },
  block: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>