<template>
  <div class="animate-fade-in min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white px-5 py-4 flex items-center gap-3 shadow-sm">
      <button
        class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
        @click="handleBack"
      >
        <ArrowLeft class="w-5 h-5 text-dark" />
      </button>
      <div class="flex-1 min-w-0">
        <h1 class="font-bold text-dark text-sm truncate">{{ workout?.title }}</h1>
        <p class="text-xs text-gray-400">{{ workout?.category }}</p>
      </div>
    </div>

    <!-- Timer Component -->
    <WorkoutTimer
      :phase="phase"
      :countdown="countdown"
      :maxCountdown="maxCountdown"
      :currentExerciseIndex="currentExerciseIndex"
      :currentExercise="currentExercise"
      :exercises="exercises"
      :totalExercises="totalExercises"
      :completedExercises="completedExercises"
      :progress="progress"
      @start="startTimer"
      @togglePause="togglePause"
      @skipRest="skipRest"
      @skipPrepare="skipPrepare"
      @complete="handleCompleteEarly"
      @reset="reset"
      @restart="handleRestart"
      @finish="handleFinish"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { useWorkoutStore } from '@/stores/workout'
import { useWorkoutTimer } from '@/composables/useWorkoutTimer'
import WorkoutTimer from '@/components/workout/WorkoutTimer.vue'

const route = useRoute()
const router = useRouter()
const workoutStore = useWorkoutStore()

const workout = computed(() => workoutStore.getWorkoutById(route.params.id as string))

const {
  currentExerciseIndex,
  phase,
  countdown,
  maxCountdown,
  elapsedExercise,
  elapsedRest,
  completedExercises,
  restDuration,
  currentExercise,
  exercises,
  totalExercises,
  progress,
  isLastExercise,
  totalDuration,
  exerciseTimerValue,
  startTimer,
  pause,
  togglePause,
  skipRest,
  completeWorkoutEarly,
  reset,
} = useWorkoutTimer(workout.value ?? null)

function handleBack() {
  if (phase.value === 'exercise' || phase.value === 'rest') {
    pause()
  }
  if (phase.value === 'paused') {
    // Просто идем назад
  }
  router.back()
}

function skipPrepare() {
  // Пропускаем подготовку 3-2-1 и сразу начинаем упражнение
  phase.value = 'exercise'
  countdown.value = exerciseTimerValue.value
  maxCountdown.value = exerciseTimerValue.value
  elapsedExercise.value = 0
}

function handleCompleteEarly() {
  completeWorkoutEarly()
}

function handleRestart() {
  reset()
  // После сброса запускаем заново
  startTimer()
}

function handleFinish() {
  // Сохраняем сессию тренировки
  if (workout.value) {
    workoutStore.completeWorkout({
      id: Date.now().toString(),
      workoutId: workout.value.id,
      userId: 'u1',
      date: new Date().toISOString().split('T')[0],
      duration: Math.floor(elapsedExercise.value / 60) || workout.value.duration,
      caloriesBurned: workout.value.calories,
      exercises: [],
      completed: true,
    })
  }
  router.push('/app/workouts')
}
</script>