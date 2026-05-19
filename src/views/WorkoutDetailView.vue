<template>
  <div class="animate-fade-in">
    <!-- Hero -->
    <div class="relative h-56 bg-gradient-to-br from-primary-100 to-primary-200">
      <img
        v-if="workout?.image"
        :src="workout.image"
        :alt="workout?.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div class="absolute bottom-0 left-0 right-0 p-5">
        <span class="badge-primary mb-2 inline-block">{{ difficultyLabel }}</span>
        <h1 class="text-2xl font-bold text-white">{{ workout?.title }}</h1>
        <div class="flex items-center gap-4 mt-2 text-white/80 text-sm">
          <span class="flex items-center gap-1">
            <Clock class="w-4 h-4" /> {{ workout?.duration }} мин
          </span>
          <span class="flex items-center gap-1">
            <Flame class="w-4 h-4" /> {{ workout?.calories }} ккал
          </span>
          <span class="flex items-center gap-1">
            <Dumbbell class="w-4 h-4" /> {{ workout?.exercises.length }} упр.
          </span>
        </div>
      </div>
    </div>

    <div class="px-5 py-6">
      <!-- Description -->
      <p class="text-gray-600 mb-6">{{ workout?.description }}</p>

      <!-- Exercises List -->
      <h2 class="text-lg font-bold text-dark mb-4">Упражнения</h2>
      <div class="space-y-3 mb-6">
        <div
          v-for="(exercise, i) in workout?.exercises"
          :key="exercise.id"
          class="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4"
        >
          <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 font-bold text-sm flex-shrink-0">
            {{ i + 1 }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-dark text-sm">{{ exercise.name }}</h3>
            <p class="text-xs text-gray-400 mt-0.5">
              {{ exercise.sets }} подходов × {{ exercise.reps }} повтор.
              <span v-if="exercise.weight"> • {{ exercise.weight }} кг</span>
              <span v-if="exercise.duration"> • {{ exercise.duration }} с</span>
            </p>
          </div>
          <Play class="w-5 h-5 text-gray-300 flex-shrink-0" />
        </div>
      </div>

      <!-- Start Button -->
      <AppButton block size="lg" @click="startWorkout">
        <Play class="w-5 h-5 mr-2" />
        Начать тренировку
      </AppButton>

      <!-- Similar Workouts -->
      <div v-if="similarWorkouts.length > 0" class="mt-8">
        <h2 class="text-lg font-bold text-dark mb-4">Похожие тренировки</h2>
        <div class="space-y-3">
          <WorkoutCard
            v-for="w in similarWorkouts"
            :key="w.id"
            :workout="w"
            @click="router.push(`/app/workouts/${w.id}`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Clock, Flame, Dumbbell, Play } from 'lucide-vue-next'
import { useWorkoutStore } from '@/stores/workout'
import AppButton from '@/components/ui/AppButton.vue'
import WorkoutCard from '@/components/workout/WorkoutCard.vue'

const route = useRoute()
const router = useRouter()
const workoutStore = useWorkoutStore()

const workout = computed(() => workoutStore.getWorkoutById(route.params.id as string))

const difficultyLabel = computed(() => {
  switch (workout.value?.difficulty) {
    case 'beginner': return 'Для начинающих'
    case 'intermediate': return 'Средний уровень'
    case 'advanced': return 'Продвинутый'
    default: return workout.value?.difficulty
  }
})

const similarWorkouts = computed(() => {
  if (!workout.value) return []
  return workoutStore.allWorkouts
    .filter(w => w.category === workout.value?.category && w.id !== workout.value?.id)
    .slice(0, 3)
})

function startWorkout() {
  if (workout.value) {
    workoutStore.startWorkout(workout.value)
    workoutStore.completeWorkout({
      id: Date.now().toString(),
      workoutId: workout.value.id,
      userId: 'u1',
      date: new Date().toISOString().split('T')[0],
      duration: workout.value.duration,
      caloriesBurned: workout.value.calories,
      exercises: [],
      completed: true
    })
  }
}
</script>