<template>
  <div class="animate-fade-in">
    <div class="mobile-only page-container">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-dark">{{ i18n.t('workouts.title') }}</h1>
        <p class="text-gray-500 text-sm mt-0.5">{{ i18n.t('workouts.subtitle') }}</p>
      </div>
      <div class="mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div class="flex gap-2 min-w-max">
          <CategoryCard :category="{ id: 'all' as any, title: i18n.t('workouts.all'), description: '', icon: 'LayoutGrid', color: '#22C55E', bgColor: 'bg-primary-50' }" :isActive="workoutStore.selectedCategory === 'all'" @select="workoutStore.setCategory('all')" />
          <CategoryCard v-for="category in categories" :key="category.id" :category="category" :isActive="workoutStore.selectedCategory === category.id" @select="workoutStore.setCategory(category.id)" />
        </div>
      </div>
      <div v-if="workoutStore.filteredWorkouts.length > 0" class="grid grid-cols-1 gap-4">
        <WorkoutCard v-for="(w, i) in workoutStore.filteredWorkouts" :key="w.id" :workout="w" :class="`animate-slide-up animate-delay-${i * 100}`" @click="router.push(`/app/workouts/${w.id}`)" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-16">
        <div class="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-4"><Search class="w-10 h-10 text-gray-300" /></div>
        <h3 class="text-lg font-semibold text-dark mb-1">{{ i18n.t('workouts.empty') }}</h3>
        <p class="text-sm text-gray-400">{{ i18n.t('workouts.emptyHint') }}</p>
      </div>
    </div>

    <div class="desktop-only">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-dark">{{ i18n.t('workouts.title') }}</h1>
          <p class="text-gray-500 mt-1">{{ i18n.t('workouts.subtitle') }}</p>
        </div>
      </div>
      <div class="mb-8 overflow-x-auto">
        <div class="flex gap-3 flex-wrap">
          <button :class="['px-5 py-2.5 rounded-2xl text-sm font-medium transition-all', workoutStore.selectedCategory === 'all' ? 'bg-primary-500 text-white shadow-soft' : 'bg-white text-dark hover:bg-gray-50 shadow-card']" @click="workoutStore.setCategory('all')">{{ i18n.t('workouts.all') }}</button>
          <button v-for="cat in categories" :key="cat.id" :class="['px-5 py-2.5 rounded-2xl text-sm font-medium transition-all flex items-center gap-2', workoutStore.selectedCategory === cat.id ? 'bg-primary-500 text-white shadow-soft' : 'bg-white text-dark hover:bg-gray-50 shadow-card']" @click="workoutStore.setCategory(cat.id)">
            <component :is="getIcon(cat.icon)" class="w-4 h-4" />{{ cat.title }}
          </button>
        </div>
      </div>
      <div v-if="workoutStore.filteredWorkouts.length > 0" class="grid grid-cols-2 xl:grid-cols-3 gap-5">
        <WorkoutCard v-for="w in workoutStore.filteredWorkouts" :key="w.id" :workout="w" @click="router.push(`/app/workouts/${w.id}`)" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-16">
        <div class="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-4"><Search class="w-10 h-10 text-gray-300" /></div>
        <h3 class="text-lg font-semibold text-dark mb-1">{{ i18n.t('workouts.empty') }}</h3>
        <p class="text-sm text-gray-400">{{ i18n.t('workouts.emptyHint') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Search, LayoutGrid } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { useWorkoutStore } from '@/stores/workout'
import { useI18nStore } from '@/stores/i18n'
import { categories } from '@/data/categories'
import CategoryCard from '@/components/workout/CategoryCard.vue'
import WorkoutCard from '@/components/workout/WorkoutCard.vue'

const router = useRouter()
const workoutStore = useWorkoutStore()
const i18n = useI18nStore()

function getIcon(iconName: string): any {
  return (LucideIcons as any)[iconName] || LayoutGrid
}
</script>