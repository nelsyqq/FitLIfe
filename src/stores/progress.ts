import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Progress, Achievement } from '@/types'
import { progressData, achievements } from '@/data/progress'

export const useProgressStore = defineStore('progress', () => {
  const progressHistory = ref<Progress[]>(progressData)
  const userAchievements = ref<Achievement[]>(achievements)

  const latestProgress = computed(() => {
    if (progressHistory.value.length === 0) return null
    return progressHistory.value[progressHistory.value.length - 1]
  })

  const totalCaloriesBurned = computed(() =>
    progressHistory.value.reduce((acc, p) => acc + p.caloriesBurned, 0)
  )

  const totalWorkouts = computed(() =>
    progressHistory.value.reduce((acc, p) => acc + p.workoutsCompleted, 0)
  )

  const averageMood = computed(() => {
    const moods = progressHistory.value.filter(p => p.mood)
    if (moods.length === 0) return 0
    return moods.reduce((acc, p) => acc + (p.mood ?? 0), 0) / moods.length
  })

  const weightChange = computed(() => {
    if (progressHistory.value.length < 2) return 0
    return progressHistory.value[0].weight! - latestProgress.value?.weight!
  })

  const unlockedAchievements = computed(() =>
    userAchievements.value.filter(a => a.unlockedAt !== null)
  )

  const lockedAchievements = computed(() =>
    userAchievements.value.filter(a => a.unlockedAt === null)
  )

  const weeklyWorkoutData = computed(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const data: { day: string; minutes: number }[] = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayName = days[date.getDay()]
      const dayProgress = progressHistory.value.find(p => p.date === dateStr)
      
      data.push({
        day: dayName,
        minutes: dayProgress?.totalDuration ?? 0
      })
    }
    
    return data
  })

  const monthlyCaloriesData = computed(() => {
    const monthly: { week: string; calories: number; workouts: number }[] = []
    const weeks = Math.ceil(progressHistory.value.length / 7)
    
    for (let i = 0; i < weeks; i++) {
      const weekData = progressHistory.value.slice(i * 7, (i + 1) * 7)
      monthly.push({
        week: `Week ${i + 1}`,
        calories: weekData.reduce((acc, p) => acc + p.caloriesBurned, 0),
        workouts: weekData.reduce((acc, p) => acc + p.workoutsCompleted, 0)
      })
    }
    
    return monthly
  })

  function addProgress(progress: Progress) {
    progressHistory.value.push(progress)
  }

  function unlockAchievement(id: string) {
    const achievement = userAchievements.value.find(a => a.id === id)
    if (achievement && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString()
    }
  }

  function updateAchievementProgress(id: string, progress: number) {
    const achievement = userAchievements.value.find(a => a.id === id)
    if (achievement) {
      achievement.progress = progress
      if (progress >= achievement.total) {
        achievement.unlockedAt = new Date().toISOString()
      }
    }
  }

  return {
    progressHistory,
    userAchievements,
    latestProgress,
    totalCaloriesBurned,
    totalWorkouts,
    averageMood,
    weightChange,
    unlockedAchievements,
    lockedAchievements,
    weeklyWorkoutData,
    monthlyCaloriesData,
    addProgress,
    unlockAchievement,
    updateAchievementProgress
  }
})