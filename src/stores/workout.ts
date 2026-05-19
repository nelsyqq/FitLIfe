import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Workout, WorkoutSession, WorkoutCategory } from '@/types'
import { workouts } from '@/data/workouts'

export const useWorkoutStore = defineStore('workout', () => {
  const allWorkouts = ref<Workout[]>(workouts)
  const sessions = ref<WorkoutSession[]>([])
  const currentWorkout = ref<Workout | null>(null)
  const isActive = ref(false)
  const selectedCategory = ref<WorkoutCategory | 'all'>('all')

  const filteredWorkouts = computed(() => {
    if (selectedCategory.value === 'all') return allWorkouts.value
    return allWorkouts.value.filter(w => w.category === selectedCategory.value)
  })

  const totalWorkoutsCompleted = computed(() => sessions.value.filter(s => s.completed).length)
  
  const totalCaloriesBurned = computed(() => 
    sessions.value.filter(s => s.completed).reduce((acc, s) => acc + s.caloriesBurned, 0)
  )

  const totalDuration = computed(() =>
    sessions.value.filter(s => s.completed).reduce((acc, s) => acc + s.duration, 0)
  )

  const currentStreak = computed(() => {
    if (sessions.value.length === 0) return 0
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const hasSession = sessions.value.some(
        s => s.date === dateStr && s.completed
      )
      if (hasSession) streak++
      else break
    }
    return streak
  })

  const workoutByCategory = computed(() => {
    const grouped: Record<string, Workout[]> = {}
    allWorkouts.value.forEach(w => {
      if (!grouped[w.category]) grouped[w.category] = []
      grouped[w.category].push(w)
    })
    return grouped
  })

  const recentSessions = computed(() => 
    [...sessions.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)
  )

  function setCategory(category: WorkoutCategory | 'all') {
    selectedCategory.value = category
  }

  function getWorkoutById(id: string): Workout | undefined {
    return allWorkouts.value.find(w => w.id === id)
  }

  function startWorkout(workout: Workout) {
    currentWorkout.value = workout
    isActive.value = true
  }

  function completeWorkout(session: WorkoutSession) {
    sessions.value.push(session)
    isActive.value = false
    currentWorkout.value = null
    if (currentWorkout.value) {
      const workout = allWorkouts.value.find(w => w.id === currentWorkout.value!.id)
      if (workout) {
        workout.completedDates.push(session.date)
      }
    }
  }

  function cancelWorkout() {
    currentWorkout.value = null
    isActive.value = false
  }

  function getSessionsByDate(date: string): WorkoutSession[] {
    return sessions.value.filter(s => s.date === date)
  }

  return {
    allWorkouts,
    sessions,
    currentWorkout,
    isActive,
    selectedCategory,
    filteredWorkouts,
    totalWorkoutsCompleted,
    totalCaloriesBurned,
    totalDuration,
    currentStreak,
    workoutByCategory,
    recentSessions,
    setCategory,
    getWorkoutById,
    startWorkout,
    completeWorkout,
    cancelWorkout,
    getSessionsByDate
  }
})