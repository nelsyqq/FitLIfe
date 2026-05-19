<template>
  <div class="page-container animate-fade-in pb-32">
    <h1 class="text-2xl font-bold text-dark mb-6">Настройки</h1>

    <!-- Profile Section -->
    <div class="mb-6">
      <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Профиль</h2>
      <div class="bg-white rounded-3xl p-5 shadow-card space-y-4">
        <AppInput v-model="form.name" label="Полное имя" placeholder="Ваше имя" />
        <AppInput v-model="form.email" label="Эл. почта" type="email" placeholder="your@email.com" />
        <AppInput v-model="form.height" label="Рост (см)" type="number" placeholder="175" />
        <AppInput v-model="form.weight" label="Вес (кг)" type="number" placeholder="70" />
        <AppInput v-model="form.age" label="Возраст" type="number" placeholder="25" />
      </div>
    </div>

    <!-- Goals Section -->
    <div class="mb-6">
      <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Фитнес-цели</h2>
      <div class="bg-white rounded-3xl p-5 shadow-card space-y-4">
        <div>
          <label class="text-sm font-medium text-dark mb-2 block">Цель</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="goal in goals"
              :key="goal.value"
              :class="[
                'px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                form.goal === goal.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              ]"
              @click="form.goal = goal.value"
            >
              {{ goal.label }}
            </button>
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-dark mb-2 block">Уровень</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="level in levels"
              :key="level.value"
              :class="[
                'px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                form.level === level.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              ]"
              @click="form.level = level.value"
            >
              {{ level.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Preferences -->
    <div class="mb-6">
      <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Настройки</h2>
      <div class="bg-white rounded-3xl p-5 shadow-card space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark">Уведомления</p>
            <p class="text-xs text-gray-400">Напоминания и советы по тренировкам</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="preferences.notifications" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark">Звуковые эффекты</p>
            <p class="text-xs text-gray-400">Воспроизводить звуки во время тренировки</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="preferences.sound" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>
        <div>
          <label class="text-sm font-medium text-dark mb-2 block">Язык / Language</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="lang in languages"
              :key="lang.value"
              :class="[
                'px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                i18nStore.locale === lang.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              ]"
              @click="i18nStore.setLocale(lang.value)"
            >
              {{ lang.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <AppButton block @click="saveSettings">
      <Save class="w-5 h-5 mr-2" />
      Сохранить изменения
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Save } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useI18nStore } from '@/stores/i18n'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const i18nStore = useI18nStore()

const form = reactive({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  height: String(authStore.user?.height || 175),
  weight: String(authStore.user?.weight || 70),
  age: String(authStore.user?.age || 25),
  goal: authStore.user?.goal || 'maintain' as 'lose' | 'maintain' | 'gain',
  level: authStore.user?.level || 'beginner' as 'beginner' | 'intermediate' | 'advanced'
})

const preferences = reactive({
  notifications: true,
  sound: true
})

const goals = [
  { label: 'Похудение', value: 'lose' as const },
  { label: 'Поддержание', value: 'maintain' as const },
  { label: 'Набор массы', value: 'gain' as const }
]

const levels = [
  { label: 'Новичок', value: 'beginner' as const },
  { label: 'Средний', value: 'intermediate' as const },
  { label: 'Продвинутый', value: 'advanced' as const }
]

const languages = [
  { label: 'Русский', value: 'ru' as const },
  { label: 'English', value: 'en' as const }
]

function saveSettings() {
  authStore.updateUser({
    name: form.name,
    email: form.email,
    height: Number(form.height),
    weight: Number(form.weight),
    age: Number(form.age),
    goal: form.goal,
    level: form.level
  })
  router.push('/app/profile')
}
</script>