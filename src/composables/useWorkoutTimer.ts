import { ref, computed, onUnmounted } from 'vue'
import type { Workout, Exercise } from '@/types'

export type TimerPhase = 'idle' | 'prepare' | 'exercise' | 'rest' | 'paused' | 'completed'

export function useWorkoutTimer(workout: Workout | null) {
  const currentExerciseIndex = ref(0)
  const phase = ref<TimerPhase>('idle')
  const countdown = ref(0)
  const maxCountdown = ref(0)
  const elapsedExercise = ref(0)
  const elapsedRest = ref(0)
  const completedExercises = ref<Set<string>>(new Set())
  const restDuration = ref(45) // секунд отдыха по умолчанию
  const timerHandle = ref<ReturnType<typeof setInterval> | null>(null)

  const exercises = computed(() => workout?.exercises ?? [])
  const currentExercise = computed(() => exercises.value[currentExerciseIndex.value] ?? null)
  const totalExercises = computed(() => exercises.value.length)
  const progress = computed(() => {
    if (totalExercises.value === 0) return 0
    return Math.round((completedExercises.value.size / totalExercises.value) * 100)
  })
  const isLastExercise = computed(() => currentExerciseIndex.value >= totalExercises.value - 1)

  const exerciseTimerValue = computed(() => {
    const ex = currentExercise.value
    if (!ex) return 0
    // Используем duration (секунды) если есть, иначе reps * 2 (примерно)
    return ex.duration ?? ex.reps * 2
  })

  function startTimer() {
    if (phase.value === 'idle') {
      startPrepare()
    }
    startInterval()
  }

  function startPrepare() {
    phase.value = 'prepare'
    countdown.value = 3
    maxCountdown.value = 3
  }

  function startInterval() {
    clearTimer()
    timerHandle.value = setInterval(() => {
      tick()
    }, 1000)
  }

  function tick() {
    if (phase.value === 'paused') return

    if (phase.value === 'prepare') {
      countdown.value = Math.max(0, countdown.value - 1)

      if (countdown.value <= 0) {
        // Подготовка закончена — начинаем упражнение
        phase.value = 'exercise'
        countdown.value = exerciseTimerValue.value
        maxCountdown.value = exerciseTimerValue.value
        elapsedExercise.value = 0
      }
    } else if (phase.value === 'exercise') {
      elapsedExercise.value++
      countdown.value = Math.max(0, countdown.value - 1)

      if (countdown.value <= 0) {
        // Упражнение выполнено
        const ex = currentExercise.value
        if (ex) {
          completedExercises.value.add(ex.id)
        }

        if (isLastExercise.value) {
          // Тренировка завершена
          phase.value = 'completed'
          clearTimer()
          return
        }

        // Переходим к отдыху
        phase.value = 'rest'
        countdown.value = restDuration.value
        maxCountdown.value = restDuration.value
        elapsedRest.value = 0
      }
    } else if (phase.value === 'rest') {
      elapsedRest.value++
      countdown.value = Math.max(0, countdown.value - 1)

      if (countdown.value <= 0) {
        // Отдых закончен — подготовка к следующему
        currentExerciseIndex.value++
        startPrepare()
      }
    }
  }

  function pause() {
    if (phase.value === 'prepare' || phase.value === 'exercise' || phase.value === 'rest') {
      phase.value = 'paused'
      clearTimer()
    }
  }

  function togglePause() {
    if (phase.value === 'paused') {
      // Восстанавливаем фазу (до паузы была prepare, exercise или rest)
      // По умолчанию prepare, если countdown > 0, но лучше восстановить
      // Будем предполагать exercise, так как prepare уже отобразился
      phase.value = 'exercise'
      startInterval()
    } else if (phase.value === 'prepare' || phase.value === 'exercise' || phase.value === 'rest') {
      pause()
    }
  }

  function skipRest() {
    if (phase.value === 'rest') {
      currentExerciseIndex.value++
      startPrepare()
      elapsedRest.value = 0
    }
  }

  function completeWorkoutEarly() {
    phase.value = 'completed'
    clearTimer()
  }

  function reset() {
    clearTimer()
    currentExerciseIndex.value = 0
    phase.value = 'idle'
    countdown.value = 0
    elapsedExercise.value = 0
    elapsedRest.value = 0
    completedExercises.value = new Set()
  }

  function clearTimer() {
    if (timerHandle.value) {
      clearInterval(timerHandle.value)
      timerHandle.value = null
    }
  }

  onUnmounted(() => {
    clearTimer()
  })

  const totalDuration = computed(() => {
    let total = 0
    for (const ex of exercises.value) {
      total += ex.duration ?? ex.reps * 2
    }
    total += (exercises.value.length - 1) * restDuration.value
    total += exercises.value.length * 3 // 3 секунды подготовки на каждое упражнение
    return total
  })

  return {
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
  }
}