<template>
  <div class="min-h-screen flex">
    <!-- Desktop Sidebar -->
    <aside class="desktop-only fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 shadow-soft z-50 flex flex-col">
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-500 rounded-2xl flex items-center justify-center">
            <Dumbbell class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-dark">FitLife</span>
        </div>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
          :class="isActive(item.path) ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-dark'"
        >
          <component :is="getIcon(item.icon)" class="w-5 h-5" />
          <span class="text-sm">{{ i18n.t(`nav.${item.id}`) }}</span>
        </router-link>
      </nav>
      <div class="p-4 border-t border-gray-100">
        <router-link to="/app/profile" class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all">
          <div class="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center overflow-hidden">
            <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userName" class="w-full h-full object-cover" />
            <User v-else class="w-4 h-4 text-primary-500" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-dark truncate">{{ authStore.userName }}</p>
            <p class="text-xs text-gray-400 truncate">{{ authStore.userEmail }}</p>
          </div>
        </router-link>
      </div>
    </aside>

    <div class="flex-1 lg:ml-64">
      <!-- Mobile Top Bar -->
      <header class="mobile-only fixed top-0 left-0 right-0 z-40 bg-light/80 backdrop-blur-lg border-b border-gray-100">
        <div class="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <button v-if="showBack" class="p-2 -ml-2 rounded-2xl hover:bg-gray-100 transition-colors" @click="router.back()">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <h1 v-else class="text-lg font-bold">{{ pageTitle }}</h1>
          <div class="flex-1" />
        </div>
      </header>

      <!-- Desktop Top Bar -->
      <header class="desktop-only sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div class="px-8 h-16 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold text-dark">{{ pageTitle }}</h1>
            <p v-if="subtitle" class="text-sm text-gray-400">{{ subtitle }}</p>
          </div>
          <div v-if="showBackDesktop" class="flex items-center gap-3">
            <button class="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-dark rounded-xl hover:bg-gray-100 transition-all" @click="router.back()">
              <ChevronLeft class="w-4 h-4" />{{ i18n.t('nav.back') }}
            </button>
          </div>
        </div>
      </header>

      <main class="mobile-only pt-14">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <main class="desktop-only">
        <div class="px-8 py-6 max-w-5xl mx-auto">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="mobile-only fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-gray-100 shadow-nav">
        <div class="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
          <router-link v-for="item in navItems" :key="item.id" :to="item.path" class="nav-item group">
            <component :is="getIcon(item.icon)" class="nav-icon" :class="isActive(item.path) ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-600'" />
            <span class="text-[10px] font-medium" :class="isActive(item.path) ? 'text-primary-500' : 'text-gray-400'">{{ i18n.t(`nav.${item.id}`) }}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, LayoutDashboard, Dumbbell, TrendingUp, User } from 'lucide-vue-next'
import type { Component } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18nStore } from '@/stores/i18n'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const i18n = useI18nStore()

const navItems = [
  { id: 'dashboard', icon: 'LayoutDashboard', path: '/app/dashboard' },
  { id: 'workouts', icon: 'Dumbbell', path: '/app/workouts' },
  { id: 'progress', icon: 'TrendingUp', path: '/app/progress' },
  { id: 'profile', icon: 'User', path: '/app/profile' }
]

const pageTitle = computed(() => {
  const name = route.name as string
  const keys: Record<string, string> = {
    Dashboard: 'nav.dashboard',
    Workouts: 'nav.workouts',
    WorkoutDetail: 'nav.workouts',
    Progress: 'nav.progress',
    Profile: 'nav.profile',
    Settings: 'nav.settings'
  }
  return i18n.t(keys[name] || 'app.name')
})

const subtitle = computed(() => {
  const name = route.name as string
  const keys: Record<string, string> = {
    Dashboard: 'dashboard.stats.workouts',
    Workouts: 'workouts.subtitle',
    Progress: 'progress.subtitle',
    Profile: 'nav.profile',
    Settings: 'nav.settings'
  }
  const t = i18n.t(keys[name] || '')
  return name === 'Dashboard' ? '' : t
})

const showBack = computed(() => route.name === 'WorkoutDetail' || route.name === 'Settings')
const showBackDesktop = computed(() => route.name === 'WorkoutDetail')

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}

function getIcon(iconName: string): Component {
  const icons: Record<string, Component> = { LayoutDashboard, Dumbbell, TrendingUp, User }
  return icons[iconName] || LayoutDashboard
}
</script>

<style scoped>
.page-enter-active, .page-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.page-enter-from { opacity: 0; transform: translateX(10px); }
.page-leave-to { opacity: 0; transform: translateX(-10px); }
</style>