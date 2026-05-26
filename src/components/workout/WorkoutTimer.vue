<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] px-5">
    <!-- Progress bar -->
    <div class="w-full mb-8">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-400 font-medium">
          {{ completedExercises.size }} / {{ totalExercises }} выполнено
        </span>
        <span class="text-sm text-gray-400 font-medium">{{ progress }}%</span>
      </div>
      <div class="progress-bar">
        <div
          class="progress-fill bg-primary-500"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>

    <!-- Phase indicator -->
    <div
      v-if="phase === 'prepare'"
      class="text-center mb-6"
    >
      <span class="badge bg-yellow-100 text-yellow-700 text-sm px-4 py-1.5">
        <AlertTriangle class="w-4 h-4 mr-1 inline" />
        Приготовьтесь {{ currentExerciseIndex + 1 }} / {{ totalExercises }}
      </span>
    </div>
    <div
      v-if="phase === 'exercise'"
      class="text-center mb-6"
    >
      <span class="badge bg-green-100 text-green-700 text-sm px-4 py-1.5">
        <Activity class="w-4 h-4 mr-1 inline" />
        Упражнение {{ currentExerciseIndex + 1 }} / {{ totalExercises }}
      </span>
    </div>
    <div
      v-else-if="phase === 'rest'"
      class="text-center mb-6"
    >
      <span class="badge bg-orange-100 text-orange-700 text-sm px-4 py-1.5">
        <Coffee class="w-4 h-4 mr-1 inline" />
        Отдых
      </span>
    </div>
    <div
      v-else-if="phase === 'paused'"
      class="text-center mb-6"
    >
      <span class="badge bg-gray-100 text-gray-600 text-sm px-4 py-1.5">
        <Pause class="w-4 h-4 mr-1 inline" />
        На паузе
      </span>
    </div>
    <div
      v-else-if="phase === 'completed'"
      class="text-center mb-6"
    >
      <span class="badge bg-blue-100 text-blue-700 text-sm px-4 py-1.5">
        <CheckCircle class="w-4 h-4 mr-1 inline" />
        Тренировка завершена!
      </span>
    </div>

    <!-- Exercise info -->
    <div v-if="currentExercise && phase !== 'completed' && phase !== 'prepare'" class="bg-white rounded-3xl shadow-soft-lg p-8 w-full max-w-sm text-center mb-6">
      <div class="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
        <Dumbbell class="w-8 h-8 text-primary-500" />
      </div>
      <h2 class="text-xl font-bold text-dark mb-1">{{ currentExercise.name }}</h2>
      <p class="text-sm text-gray-400">
        {{ currentExercise.sets }} подходов × {{ currentExercise.reps }} повторений
        <span v-if="currentExercise.weight"> • {{ currentExercise.weight }} кг</span>
      </p>

      <!-- Timer circle -->
      <div class="mt-6 relative">
        <svg class="w-32 h-32 mx-auto transform -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64" cy="64" r="56"
            fill="none"
            stroke="#f3f4f6"
            stroke-width="8"
          />
          <circle
            cx="64" cy="64" r="56"
            fill="none"
            :stroke="timerColor"
            stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="2 * Math.PI * 56"
            :stroke-dashoffset="timerDashOffset"
            class="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <span class="text-4xl font-bold text-dark tabular-nums">{{ formattedCountdown }}</span>
            <span class="block text-xs text-gray-400 mt-1">сек</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div v-if="phase === 'idle'" class="flex flex-col items-center gap-4">
      <p class="text-gray-500 text-sm">Готовы начать тренировку?</p>
      <AppButton size="lg" @click="$emit('start')">
        <Play class="w-5 h-5 mr-2" />
        Начать
      </AppButton>
    </div>

    <!-- Prepare countdown display -->
    <div v-if="phase === 'prepare'" class="flex flex-col items-center justify-center mb-6">
      <div class="w-40 h-40 rounded-full bg-yellow-100 flex items-center justify-center animate-bounce-slow">
        <span class="text-6xl font-bold text-yellow-600">{{ countdown }}</span>
      </div>
      <p class="text-gray-500 text-sm mt-4">{{ currentExercise?.name }}</p>
      <AppButton
        variant="secondary"
        size="sm"
        class="mt-4"
        @click="$emit('skipPrepare')"
      >
        <SkipForward class="w-4 h-4 mr-1" />
        Пропустить
      </AppButton>
    </div>

    <div v-else-if="phase === 'exercise' || phase === 'rest'" class="flex flex-col items-center gap-3 w-full max-w-sm">
      <div class="flex gap-3 w-full">
        <AppButton
          variant="ghost"
          size="sm"
          class="flex-1"
          @click="$emit('togglePause')"
        >
          <Pause class="w-4 h-4 mr-1" />
          Пауза
        </AppButton>
        <AppButton
          v-if="phase === 'rest'"
          variant="secondary"
          size="sm"
          class="flex-1"
          @click="$emit('skipRest')"
        >
          <SkipForward class="w-4 h-4 mr-1" />
          Пропустить
        </AppButton>
      </div>
      <AppButton
        variant="ghost"
        size="sm"
        class="text-red-400 hover:text-red-500 w-full"
        @click="$emit('complete')"
      >
        <XCircle class="w-4 h-4 mr-1" />
        Завершить досрочно
      </AppButton>
    </div>

    <div v-else-if="phase === 'paused'" class="flex flex-col items-center gap-3 w-full max-w-sm">
      <AppButton size="lg" block @click="$emit('togglePause')">
        <Play class="w-5 h-5 mr-2" />
        Продолжить
      </AppButton>
      <AppButton variant="ghost" size="sm" class="w-full" @click="$emit('reset')">
        <RefreshCw class="w-4 h-4 mr-1" />
        Начать заново
      </AppButton>
    </div>

    <div v-else-if="phase === 'completed'" class="flex flex-col items-center gap-4 w-full max-w-sm text-center">
      <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2">
        <Trophy class="w-10 h-10 text-green-500" />
      </div>
      <h2 class="text-2xl font-bold text-dark">Отличная работа!</h2>
      <p class="text-gray-400 text-sm">
        Вы выполнили {{ completedExercises.size }} из {{ totalExercises }} упражнений
      </p>
      <div class="flex gap-3 w-full mt-2">
        <AppButton variant="secondary" class="flex-1" @click="$emit('restart')">
          <RefreshCw class="w-4 h-4 mr-1" />
          Ещё раз
        </AppButton>
        <AppButton class="flex-1" @click="$emit('finish')">
          <CheckCircle class="w-4 h-4 mr-1" />
          Завершить
        </AppButton>
      </div>
    </div>

    <!-- Exercise list progress -->
    <div v-if="phase !== 'idle' && phase !== 'completed' && phase !== 'prepare'" class="w-full max-w-sm mt-6">
      <div class="space-y-1.5">
        <div
          v-for="(ex, i) in exercises"
          :key="ex.id"
          class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors"
          :class="{
            'bg-primary-50 text-primary-700 font-medium': i === currentExerciseIndex && !isCompleted,
            'text-gray-300': i > currentExerciseIndex,
            'text-green-600': completedExercises.has(ex.id),
          }"
        >
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            :class="{
              'bg-primary-500 text-white': i === currentExerciseIndex && !isCompleted,
              'bg-gray-100 text-gray-400': i > currentExerciseIndex,
              'bg-green-500 text-white': completedExercises.has(ex.id),
            }"
          >
            <Check v-if="completedExercises.has(ex.id)" class="w-3.5 h-3.5" />
            <template v-else>{{ i + 1 }}</template>
          </div>
          <span class="truncate">{{ ex.name }}</span>
          <span v-if="completedExercises.has(ex.id)" class="ml-auto text-green-500 text-xs">Выполнено</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Exercise } from '@/types'
import type { TimerPhase } from '@/composables/useWorkoutTimer'
import {
  Play, Pause, CheckCircle, XCircle, SkipForward,
  RefreshCw, Trophy, Dumbbell, Activity, Coffee,
  Check, AlertTriangle
} from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps<{
  phase: TimerPhase
  countdown: number
  maxCountdown: number
  currentExerciseIndex: number
  currentExercise: Exercise | null
  exercises: Exercise[]
  totalExercises: number
  completedExercises: Set<string>
  progress: number
}>()

const isCompleted = computed(() => props.phase === 'completed')

defineEmits<{
  (e: 'start'): void
  (e: 'togglePause'): void
  (e: 'skipRest'): void
  (e: 'skipPrepare'): void
  (e: 'complete'): void
  (e: 'reset'): void
  (e: 'restart'): void
  (e: 'finish'): void
}>()

const formattedCountdown = computed(() => {
  const val = props.countdown
  const mins = Math.floor(val / 60)
  const secs = val % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const timerColor = computed(() => {
  switch (props.phase) {
    case 'prepare': return '#EAB308'
    case 'exercise': return '#4F46E5'
    case 'rest': return '#F97316'
    case 'paused': return '#9CA3AF'
    default: return '#4F46E5'
  }
})

const timerDashOffset = computed(() => {
  const circumference = 2 * Math.PI * 56
  const maxTime = Math.max(props.maxCountdown, 1)
  const fraction = Math.min(props.countdown / maxTime, 1)
  return circumference * (1 - fraction)
})
</script>