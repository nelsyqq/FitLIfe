<template>
  <div class="animate-fade-in">
    <!-- Mobile Layout -->
    <div class="mobile-only page-container">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-dark">{{ i18n.t('dashboard.greeting.hi') }}, {{ authStore.userName }}! 👋</h1>
          <p class="text-gray-500 text-sm mt-0.5">{{ getGreeting }}</p>
        </div>
        <div class="relative">
          <div class="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center overflow-hidden">
            <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userName" class="w-full h-full object-cover" />
            <User v-else class="w-6 h-6 text-primary-500" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-6">
        <div v-for="stat in todayStats" :key="stat.label" class="bg-white rounded-2xl p-4 shadow-card text-center">
          <component :is="stat.icon" class="w-5 h-5 mx-auto mb-2" :style="{ color: stat.color }" />
          <p class="text-xl font-bold text-dark">{{ stat.value }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ stat.label }}</p>
        </div>
      </div>
      <div class="bg-gradient-to-r from-primary-500 to-primary-400 rounded-3xl p-5 mb-6 shadow-soft-lg text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white/80 text-sm font-medium">{{ i18n.t('dashboard.streak.title') }}</p>
            <p class="text-3xl font-bold mt-1">{{ workoutStore.currentStreak }} {{ i18n.t('dashboard.stats.streak') }}</p>
            <p class="text-white/60 text-xs mt-1">{{ i18n.t('dashboard.streak.subtitle') }}</p>
          </div>
          <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"><Flame class="w-8 h-8 text-white" /></div>
        </div>
      </div>
      <div class="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <router-link to="/app/workouts" class="flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-card hover:shadow-soft transition-all whitespace-nowrap flex-shrink-0">
          <Play class="w-5 h-5 text-primary-500" /><span class="text-sm font-medium text-dark">{{ i18n.t('dashboard.quickActions.start') }}</span>
        </router-link>
        <router-link to="/app/progress" class="flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-card hover:shadow-soft transition-all whitespace-nowrap flex-shrink-0">
          <BarChart3 class="w-5 h-5 text-orange-500" /><span class="text-sm font-medium text-dark">{{ i18n.t('dashboard.quickActions.progress') }}</span>
        </router-link>
      </div>
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-dark">{{ i18n.t('dashboard.week.title') }}</h2>
          <span class="text-sm text-primary-500 font-medium">{{ weeklyTotal }} {{ i18n.t('dashboard.week.total') }}</span>
        </div>
        <div class="bg-white rounded-3xl p-5 shadow-card">
          <div class="flex items-end justify-between gap-2" style="height:120px">
            <div v-for="day in weekData" :key="day.day" class="flex-1 flex flex-col items-center gap-2">
              <div class="w-full rounded-xl transition-all duration-500" :class="day.minutes>0?'bg-primary-500':'bg-gray-100'" :style="{height:`${(day.minutes/maxWeekMinutes)*100}px`,minHeight:day.minutes>0?'8px':'4px'}"/>
              <span class="text-[10px] font-medium text-gray-400">{{ day.day }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-dark">{{ i18n.t('dashboard.recommended') }}</h2>
          <router-link to="/app/workouts" class="text-sm text-primary-500 font-medium">{{ i18n.t('nav.seeAll') }}</router-link>
        </div>
        <div class="space-y-3">
          <div v-for="w in recommendedWorkouts" :key="w.id" class="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-card hover:shadow-soft transition-all cursor-pointer" @click="router.push(`/app/workouts/${w.id}`)">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" :class="getCategoryBg(w.category)">
              <component :is="getCategoryIcon(w.category)" class="w-6 h-6" :style="{ color: getCategoryColor(w.category) }" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-dark text-sm">{{ w.title }}</h3>
              <p class="text-xs text-gray-400 mt-0.5">{{ w.duration }} {{ i18n.t('workouts.details.minutes') }} • {{ w.calories }} {{ i18n.t('workouts.details.calories') }}</p>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-dark">{{ i18n.t('dashboard.achievements') }}</h2>
          <router-link to="/app/profile" class="text-sm text-primary-500 font-medium">{{ i18n.t('nav.seeAll') }}</router-link>
        </div>
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div v-for="a in progressStore.unlockedAchievements.slice(0,5)" :key="a.id" class="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-card min-w-[90px] flex-shrink-0">
            <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center"><Trophy class="w-5 h-5 text-primary-500" /></div>
            <span class="text-xs font-medium text-dark text-center">{{ a.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="desktop-only">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-dark">{{ i18n.t('dashboard.greeting.hi') }}, {{ authStore.userName }}! 👋</h1>
          <p class="text-gray-500 mt-1">{{ getGreeting }}</p>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/app/settings" class="p-3 bg-white rounded-2xl shadow-card hover:shadow-soft transition-all"><Settings class="w-5 h-5 text-gray-500" /></router-link>
          <div class="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center overflow-hidden">
            <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userName" class="w-full h-full object-cover" /><User v-else class="w-6 h-6 text-primary-500" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-5 mb-8">
        <div v-for="stat in desktopStats" :key="stat.label" class="bg-white rounded-3xl p-5 shadow-card">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center" :class="stat.bg"><component :is="stat.icon" class="w-6 h-6" :style="{ color: stat.color }" /></div>
            <div><p class="text-2xl font-bold text-dark">{{ stat.value }}</p><p class="text-sm text-gray-400">{{ stat.label }}</p></div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-3xl p-6 shadow-card">
          <h2 class="text-lg font-bold text-dark mb-4">{{ i18n.t('dashboard.week.title') }}</h2>
          <div class="flex items-end justify-between gap-3" style="height:180px">
            <div v-for="day in weekData" :key="day.day" class="flex-1 flex flex-col items-center gap-2">
              <div class="w-full rounded-xl transition-all duration-500" :class="day.minutes>0?'bg-primary-500':'bg-gray-100'" :style="{height:`${(day.minutes/maxWeekMinutes)*180}px`,minHeight:day.minutes>0?'12px':'6px'}"/>
              <span class="text-xs font-medium text-gray-400">{{ day.day }}</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 shadow-card">
          <h2 class="text-lg font-bold text-dark mb-4">{{ i18n.t('dashboard.weight.title') }}</h2>
          <div class="flex flex-col justify-center h-[180px]">
            <div class="text-center">
              <p class="text-4xl font-bold text-dark">{{ authStore.user?.weight }} <span class="text-lg text-gray-400">{{ i18n.t('dashboard.weight.kg') }}</span></p>
              <p class="text-sm text-gray-400 mt-2">{{ i18n.t('dashboard.weight.current') }}</p>
              <div class="flex items-center justify-center gap-4 mt-4 text-sm">
                <span class="text-gray-500">{{ i18n.t('dashboard.weight.height') }}: {{ authStore.user?.height }} {{ i18n.t('dashboard.weight.cm') }}</span>
                <span class="text-gray-300">|</span>
                <span class="text-gray-500">{{ i18n.t('dashboard.weight.age') }}: {{ authStore.user?.age }} {{ i18n.t('dashboard.weight.years') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white rounded-3xl p-6 shadow-card">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-dark">{{ i18n.t('dashboard.recommended') }}</h2>
            <router-link to="/app/workouts" class="text-sm text-primary-500 font-medium hover:underline">{{ i18n.t('nav.seeAll') }} →</router-link>
          </div>
          <div class="space-y-3">
            <div v-for="w in recommendedWorkouts" :key="w.id" class="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer" @click="router.push(`/app/workouts/${w.id}`)">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" :class="getCategoryBg(w.category)"><component :is="getCategoryIcon(w.category)" class="w-5 h-5" :style="{ color: getCategoryColor(w.category) }" /></div>
              <div class="flex-1 min-w-0"><h3 class="font-medium text-dark text-sm">{{ w.title }}</h3><p class="text-xs text-gray-400 mt-0.5">{{ w.duration }} {{ i18n.t('workouts.details.minutes') }} • {{ w.calories }} {{ i18n.t('workouts.details.calories') }}</p></div>
              <ChevronRight class="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 shadow-card">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-dark">{{ i18n.t('dashboard.achievements') }}</h2>
            <router-link to="/app/profile" class="text-sm text-primary-500 font-medium hover:underline">{{ i18n.t('nav.seeAll') }} →</router-link>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="a in progressStore.userAchievements.slice(0,4)" :key="a.id" class="flex items-center gap-3 p-3 rounded-2xl" :class="a.unlockedAt ? 'bg-primary-50' : 'bg-gray-50'">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="a.unlockedAt ? 'bg-primary-100' : 'bg-gray-200'"><Trophy class="w-5 h-5" :class="a.unlockedAt ? 'text-primary-500' : 'text-gray-300'" /></div>
              <div class="flex-1 min-w-0"><p class="text-sm font-medium text-dark truncate">{{ a.title }}</p><p class="text-xs text-gray-400">{{ a.progress }}/{{ a.total }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { User, Flame, Play, BarChart3, Settings, ChevronRight, Trophy, Dumbbell, Heart, Zap, Wind, Repeat, Flower2, ArmchairIcon as Accessible } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useWorkoutStore } from '@/stores/workout'
import { useProgressStore } from '@/stores/progress'
import { useI18nStore } from '@/stores/i18n'
import { categories } from '@/data/categories'

const router = useRouter()
const authStore = useAuthStore()
const workoutStore = useWorkoutStore()
const progressStore = useProgressStore()
const i18n = useI18nStore()

const getGreeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return i18n.t('dashboard.greeting.morning')
  if (h < 18) return i18n.t('dashboard.greeting.afternoon')
  return i18n.t('dashboard.greeting.evening')
})

const todayStats = computed(() => [
  { label: i18n.t('dashboard.stats.workouts'), value: workoutStore.totalWorkoutsCompleted, icon: Dumbbell, color: '#22C55E' },
  { label: i18n.t('dashboard.stats.calories'), value: workoutStore.totalCaloriesBurned, icon: Flame, color: '#F97316' },
  { label: i18n.t('dashboard.stats.minutes'), value: workoutStore.totalDuration, icon: Heart, color: '#EF4444' }
])

const desktopStats = computed(() => [
  { label: i18n.t('dashboard.stats.workouts'), value: workoutStore.totalWorkoutsCompleted, icon: Dumbbell, color: '#22C55E', bg: 'bg-primary-50' },
  { label: i18n.t('dashboard.stats.burned'), value: `${workoutStore.totalCaloriesBurned}`, icon: Flame, color: '#F97316', bg: 'bg-orange-50' },
  { label: i18n.t('dashboard.stats.totalMinutes'), value: workoutStore.totalDuration, icon: Heart, color: '#EF4444', bg: 'bg-red-50' },
  { label: i18n.t('dashboard.stats.streak'), value: `${workoutStore.currentStreak} ${i18n.t('dashboard.stats.streak')}`, icon: Zap, color: '#F59E0B', bg: 'bg-amber-50' }
])

const weekData = computed(() => progressStore.weeklyWorkoutData)
const maxWeekMinutes = computed(() => { const m = Math.max(...weekData.value.map(d => d.minutes)); return m > 0 ? m : 60 })
const weeklyTotal = computed(() => weekData.value.reduce((acc, d) => acc + d.minutes, 0))
const recommendedWorkouts = computed(() => workoutStore.allWorkouts.slice(0, 4))

function getCategoryBg(c: string) { return categories.find(cat => cat.id === c)?.bgColor || 'bg-gray-100' }
function getCategoryColor(c: string) { return categories.find(cat => cat.id === c)?.color || '#6B7280' }
function getCategoryIcon(c: string) {
  const icons: Record<string, any> = { 'full-body': Dumbbell, 'upper-body': Accessible, 'lower-body': Accessible, 'core': Repeat, 'cardio': Heart, 'hiit': Zap, 'yoga': Flower2, 'stretching': Wind }
  return icons[c] || Dumbbell
}
</script>