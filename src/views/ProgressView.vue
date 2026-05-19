<template>
  <div class="page-container animate-fade-in">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-dark">Ваш прогресс</h1>
      <p class="text-gray-500 text-sm mt-0.5">Отслеживайте свой фитнес-путь</p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <div class="bg-white rounded-2xl p-4 shadow-card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <Flame class="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-dark">{{ progressStore.totalCaloriesBurned }}</p>
            <p class="text-xs text-gray-400">Сожжено калорий</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-4 shadow-card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
            <Dumbbell class="w-5 h-5 text-accent-orange" />
          </div>
          <div>
            <p class="text-2xl font-bold text-dark">{{ progressStore.totalWorkouts }}</p>
            <p class="text-xs text-gray-400">Тренировок выполнено</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-4 shadow-card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <TrendingDown class="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-dark">{{ progressStore.weightChange.toFixed(1) }} кг</p>
            <p class="text-xs text-gray-400">Изменение веса</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-4 shadow-card">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
            <Smile class="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-dark">{{ progressStore.averageMood.toFixed(1) }}</p>
            <p class="text-xs text-gray-400">Среднее настроение</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Chart -->
    <div class="mb-6">
      <ProgressChart
        title="Недельная активность"
        :data="chartData"
        color="#22C55E"
        :activePeriod="activePeriod"
        @changePeriod="activePeriod = $event"
      />
    </div>

    <!-- Monthly Stats -->
    <div class="mb-6">
      <h2 class="text-lg font-bold text-dark mb-4">Статистика по месяцам</h2>
      <div class="space-y-3">
        <div
          v-for="(month, i) in progressStore.monthlyCaloriesData"
          :key="i"
          class="bg-white rounded-2xl p-4 shadow-card"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-dark">{{ month.week }}</span>
            <span class="text-xs text-primary-500 font-medium">{{ month.calories }} ккал</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400 w-16">{{ month.workouts }} тренир.</span>
            <div class="progress-bar flex-1">
              <div
                class="progress-fill bg-primary-500"
                :style="{ width: `${(month.calories / maxMonthlyCalories) * 100}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div>
      <h2 class="text-lg font-bold text-dark mb-4">Достижения</h2>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="achievement in progressStore.userAchievements"
          :key="achievement.id"
          class="bg-white rounded-2xl p-4 shadow-card text-center"
          :class="{ 'opacity-50': !achievement.unlockedAt }"
        >
          <div
            class="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2"
            :class="achievement.unlockedAt ? 'bg-primary-100' : 'bg-gray-100'"
          >
            <Trophy
              class="w-6 h-6"
              :class="achievement.unlockedAt ? 'text-primary-500' : 'text-gray-300'"
            />
          </div>
          <h3 class="text-sm font-semibold text-dark">{{ achievement.title }}</h3>
          <p class="text-xs text-gray-400 mt-0.5">{{ achievement.description }}</p>
          <div class="mt-2 progress-bar">
            <div
              class="progress-fill"
              :class="achievement.unlockedAt ? 'bg-primary-500' : 'bg-gray-300'"
              :style="{ width: `${(achievement.progress / achievement.total) * 100}%` }"
            />
          </div>
          <p class="text-[10px] text-gray-400 mt-1">
            {{ achievement.progress }}/{{ achievement.total }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Flame, Dumbbell, TrendingDown, Smile, Trophy } from 'lucide-vue-next'
import { useProgressStore } from '@/stores/progress'
import ProgressChart from '@/components/charts/ProgressChart.vue'

const progressStore = useProgressStore()
const activePeriod = ref('week')

const chartData = computed(() => {
  return progressStore.weeklyWorkoutData.map(d => ({
    label: d.day,
    value: d.minutes
  }))
})

const maxMonthlyCalories = computed(() => {
  const max = Math.max(...progressStore.monthlyCaloriesData.map((m: any) => m.calories))
  return max > 0 ? max : 1000
})
</script>