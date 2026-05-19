<template>
  <div class="page-container animate-fade-in">
    <!-- Profile Header -->
    <div class="flex flex-col items-center mb-8">
      <div class="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center overflow-hidden mb-4 shadow-soft">
        <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userName" class="w-full h-full object-cover" />
        <User v-else class="w-10 h-10 text-primary-500" />
      </div>
      <h1 class="text-2xl font-bold text-dark">{{ authStore.userName }}</h1>
      <p class="text-gray-500 text-sm">{{ authStore.userEmail }}</p>
      <div class="flex gap-2 mt-3">
        <span class="badge-primary capitalize">{{ levelLabel }}</span>
        <span class="badge-orange capitalize">{{ goalLabel }}</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-3 mb-8">
      <div v-for="stat in profileStats" :key="stat.label" class="bg-white rounded-2xl p-4 shadow-card text-center">
        <p class="text-xl font-bold text-dark">{{ stat.value }}</p>
        <p class="text-xs text-gray-400 mt-0.5">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Menu Items -->
    <div class="space-y-2">
      <button
        v-for="item in menuItems"
        :key="item.label"
        class="w-full bg-white rounded-2xl p-4 shadow-card flex items-center gap-4 hover:shadow-soft transition-all"
        @click="handleMenuClick(item.action)"
      >
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="item.bg">
          <component :is="item.icon" class="w-5 h-5" :class="item.color" />
        </div>
        <div class="flex-1 text-left">
          <span class="font-medium text-dark text-sm">{{ item.label }}</span>
        </div>
        <ChevronRight class="w-5 h-5 text-gray-300" />
      </button>
    </div>

    <!-- Logout -->
    <div class="mt-8">
      <AppButton variant="danger" block @click="handleLogout">
        <LogOut class="w-5 h-5 mr-2" />
        Выйти
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  User, ChevronRight, LogOut,
  Settings, Bell, Award, Calendar, Activity, Shield
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useWorkoutStore } from '@/stores/workout'
import { useProgressStore } from '@/stores/progress'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const workoutStore = useWorkoutStore()
const progressStore = useProgressStore()

const levelLabel = computed(() => {
  switch (authStore.userLevel) {
    case 'beginner': return 'Новичок'
    case 'intermediate': return 'Средний'
    case 'advanced': return 'Продвинутый'
    default: return authStore.userLevel
  }
})

const goalLabel = computed(() => {
  switch (authStore.userGoal) {
    case 'lose': return 'Похудение'
    case 'maintain': return 'Поддержание'
    case 'gain': return 'Набор массы'
    default: return authStore.userGoal
  }
})

const profileStats = computed(() => [
  { label: 'Рост', value: `${authStore.user?.height ?? 0} см` },
  { label: 'Вес', value: `${authStore.user?.weight ?? 0} кг` },
  { label: 'Возраст', value: authStore.user?.age ?? 0 }
])

const menuItems = [
  { label: 'Настройки', icon: Settings, bg: 'bg-gray-100', color: 'text-gray-600', action: 'settings' },
  { label: 'Уведомления', icon: Bell, bg: 'bg-primary-50', color: 'text-primary-500', action: 'notifications' },
  { label: 'Достижения', icon: Award, bg: 'bg-orange-50', color: 'text-accent-orange', action: 'achievements' },
  { label: 'История тренировок', icon: Calendar, bg: 'bg-purple-50', color: 'text-purple-500', action: 'history' },
  { label: 'Журнал активности', icon: Activity, bg: 'bg-pink-50', color: 'text-pink-500', action: 'activity' },
  { label: 'Конфиденциальность', icon: Shield, bg: 'bg-cyan-50', color: 'text-cyan-500', action: 'privacy' }
]

function handleMenuClick(action: string) {
  if (action === 'settings') {
    router.push('/app/settings')
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>