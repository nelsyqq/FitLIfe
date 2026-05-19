<template>
  <div
    :class="[
      'bg-white rounded-3xl shadow-card transition-all duration-300',
      hover && 'card-hover cursor-pointer',
      padding && 'p-5',
      className
    ]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  padding: {
    type: Boolean,
    default: true
  },
  className: {
    type: String,
    default: ''
  }
})
</script>