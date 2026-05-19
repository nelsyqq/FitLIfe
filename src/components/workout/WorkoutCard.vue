<template>
  <div
    class="bg-white rounded-3xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-0.5 cursor-pointer"
    @click="$emit('click')"
  >
    <div class="relative h-36 bg-gradient-to-br from-primary-100 to-primary-200">
      <img
        v-if="workout.image"
        :src="workout.image"
        :alt="workout.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div class="absolute top-3 left-3">
        <span
          class="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm"
          :class="difficultyColor"
        >
          {{ workout.difficulty }}
        </span>
      </div>
      <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
        <span class="text-sm font-medium flex items-center gap-1">
          <Clock class="w-4 h-4" />
          {{ workout.duration }} min
        </span>
        <span class="text-sm font-medium flex items-center gap-1">
          <Flame class="w-4 h-4" />
          {{ workout.calories }} cal
        </span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-dark mb-1">{{ workout.title }}</h3>
      <p class="text-sm text-gray-500 line-clamp-1">{{ workout.description }}</p>
      <div class="flex items-center gap-2 mt-3">
        <span class="text-xs text-gray-400 flex items-center gap-1">
          <Dumbbell class="w-3.5 h-3.5" />
          {{ workout.exercises.length }} exercises
        </span>
        <span class="text-xs text-primary-500 font-medium ml-auto">
          {{ workout.completedDates.length > 0 ? '✓ Completed' : 'Start →' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Clock, Flame, Dumbbell } from 'lucide-vue-next'
import type { Workout } from '@/types'

const props = defineProps({
  workout: {
    type: Object as () => Workout,
    required: true
  }
})

defineEmits<{
  (e: 'click'): void
}>()

const difficultyColor = computed(() => {
  switch (props.workout.difficulty) {
    case 'beginner': return 'text-primary-600 bg-primary-50'
    case 'intermediate': return 'text-orange-600 bg-orange-50'
    case 'advanced': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
})
</script>