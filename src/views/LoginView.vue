<template>
  <div class="min-h-screen bg-light flex flex-col">
    <div class="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full">
      <div class="animate-fade-in">
        <router-link to="/" class="inline-flex items-center text-gray-400 hover:text-dark mb-8 transition-colors">
          <ChevronLeft class="w-5 h-5 mr-1" />
          <span class="text-sm">{{ i18n.t('nav.back') }}</span>
        </router-link>
        <h1 class="text-3xl font-extrabold text-dark mb-2">{{ i18n.t('auth.login.title') }}</h1>
        <p class="text-gray-500 mb-8">{{ i18n.t('auth.login.subtitle') }}</p>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <AppInput v-model="email" :label="i18n.t('auth.login.email')" type="email" :placeholder="i18n.t('auth.login.emailPlaceholder')" :error="errors.email" />
          <AppInput v-model="password" :label="i18n.t('auth.login.password')" type="password" :placeholder="i18n.t('auth.login.passwordPlaceholder')" :error="errors.password">
            <template #append>
              <button type="button" @click="showPassword = !showPassword" class="text-gray-400 hover:text-dark">
                <Eye v-if="!showPassword" class="w-5 h-5" /><EyeOff v-else class="w-5 h-5" />
              </button>
            </template>
          </AppInput>
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="rememberMe" class="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
              <span class="text-sm text-gray-500">{{ i18n.t('auth.login.remember') }}</span>
            </label>
            <button type="button" class="text-sm text-primary-500 font-medium hover:underline">{{ i18n.t('auth.login.forgot') }}</button>
          </div>
          <AppButton type="submit" :loading="authStore.isLoading" block class="mt-6">{{ i18n.t('auth.login.signIn') }}</AppButton>
        </form>
      </div>
      <p class="text-center text-sm text-gray-400 mt-8 animate-fade-in animate-delay-200">
        {{ i18n.t('auth.login.noAccount') }}
        <router-link to="/register" class="text-primary-500 font-semibold hover:underline">{{ i18n.t('auth.login.signUp') }}</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, Eye, EyeOff } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useI18nStore } from '@/stores/i18n'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const i18n = useI18nStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const errors = reactive({ email: '', password: '' })

function validate(): boolean {
  let valid = true
  errors.email = ''
  errors.password = ''
  if (!email.value) { errors.email = i18n.t('auth.login.errors.emailRequired'); valid = false }
  else if (!/\S+@\S+\.\S+/.test(email.value)) { errors.email = i18n.t('auth.login.errors.emailInvalid'); valid = false }
  if (!password.value) { errors.password = i18n.t('auth.login.errors.passwordRequired'); valid = false }
  else if (password.value.length < 6) { errors.password = i18n.t('auth.login.errors.passwordMin'); valid = false }
  return valid
}

async function handleLogin() {
  if (!validate()) return
  const success = await authStore.login(email.value, password.value)
  if (success) router.push('/app/dashboard')
  else errors.password = i18n.t('auth.login.errors.invalid')
}
</script>