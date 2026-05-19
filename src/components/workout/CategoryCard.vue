<template>
  <button
    :class="[
      'flex flex-col items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-300 min-w-[80px]',
      isActive ? 'bg-primary-500 text-white shadow-soft' : 'bg-white text-dark hover:bg-gray-50 shadow-card'
    ]"
    @click="$emit('select', category.id)"
  >
    <component :is="iconComponent" class="w-6 h-6" />
    <span class="text-xs font-medium whitespace-nowrap">{{ category.title }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryInfo } from '@/types'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps({
  category: {
    type: Object as () => CategoryInfo,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

defineEmits<{
  (e: 'select', id: string): void
}>()

const iconComponent = computed(() => {
  const iconName = props.category.icon as keyof typeof LucideIcons
  return (LucideIcons[iconName] as any) || LucideIcons.Dumbbell
})
</script>