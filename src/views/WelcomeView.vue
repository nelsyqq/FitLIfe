<template>
  <div class="min-h-screen bg-gradient-to-b from-primary-50 to-light flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center px-6">
      <div class="animate-fade-in">
        <div class="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center mb-8 shadow-soft-lg mx-auto">
          <Dumbbell class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl font-extrabold text-dark text-center mb-3">{{ i18n.t('welcome.title') }}</h1>
        <p class="text-lg text-gray-500 text-center mb-2">{{ i18n.t('welcome.subtitle') }}</p>
        <p class="text-sm text-gray-400 text-center max-w-xs mx-auto">{{ i18n.t('welcome.description') }}</p>
      </div>
      <div class="grid grid-cols-2 gap-3 mt-12 w-full max-w-sm animate-slide-up">
        <div v-for="f in features" :key="f.key" class="bg-white rounded-2xl p-4 shadow-card text-center">
          <component :is="f.icon" class="w-6 h-6 mx-auto mb-2" :style="{ color: f.color }" />
          <h3 class="text-sm font-semibold text-dark">{{ i18n.t(`welcome.features.${f.key}.title`) }}</h3>
          <p class="text-xs text-gray-400 mt-0.5">{{ i18n.t(`welcome.features.${f.key}.desc`) }}</p>
        </div>
      </div>
    </div>
    <div class="px-6 pb-10 pt-4 space-y-3 animate-slide-up animate-delay-300">
      <router-link to="/register" class="block w-full bg-primary-500 text-white font-semibold text-center rounded-2xl px-6 py-3.5 transition-all duration-300 active:scale-95 hover:bg-primary-600 shadow-soft">
        {{ i18n.t('welcome.getStarted') }}
      </router-link>
      <router-link to="/login" class="block w-full bg-white text-dark font-semibold text-center rounded-2xl px-6 py-3.5 transition-all duration-300 active:scale-95 hover:bg-gray-50 border border-gray-200">
        {{ i18n.t('welcome.haveAccount') }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dumbbell, BarChart3, Target, Zap } from 'lucide-vue-next'
import { useI18nStore } from '@/stores/i18n'

const i18n = useI18nStore()

const features = [
  { key: 'smart', icon: Dumbbell, color: '#22C55E' },
  { key: 'track', icon: BarChart3, color: '#F97316' },
  { key: 'goals', icon: Target, color: '#8B5CF6' },
  { key: 'fast', icon: Zap, color: '#EC4899' }
]
</script>