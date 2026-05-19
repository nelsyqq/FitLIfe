<template>
  <div class="min-h-screen bg-light flex flex-col">
    <div class="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full">
      <div class="animate-fade-in">
        <router-link to="/" class="inline-flex items-center text-gray-400 hover:text-dark mb-8 transition-colors">
          <ChevronLeft class="w-5 h-5 mr-1" /><span class="text-sm">{{ i18n.t('nav.back') }}</span>
        </router-link>
        <h1 class="text-3xl font-extrabold text-dark mb-2">{{ i18n.t('auth.register.title') }}</h1>
        <p class="text-gray-500 mb-8">{{ i18n.t('auth.register.subtitle') }}</p>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <AppInput v-model="name" :label="i18n.t('auth.register.name')" :placeholder="i18n.t('auth.register.namePlaceholder')" :error="errors.name">
            <template #prepend><User class="w-5 h-5" /></template>
          </AppInput>
          <AppInput v-model="email" :label="i18n.t('auth.register.email')" type="email" :placeholder="i18n.t('auth.register.emailPlaceholder')" :error="errors.email">
            <template #prepend><Mail class="w-5 h-5" /></template>
          </AppInput>
          <AppInput v-model="password" :label="i18n.t('auth.register.password')" type="password" :placeholder="i18n.t('auth.register.passwordPlaceholder')" :error="errors.password">
            <template #prepend><Lock class="w-5 h-5" /></template>
          </AppInput>
          <AppInput v-model="confirmPassword" :label="i18n.t('auth.register.confirmPassword')" type="password" :placeholder="i18n.t('auth.register.confirmPlaceholder')" :error="errors.confirmPassword">
            <template #prepend><Lock class="w-5 h-5" /></template>
          </AppInput>
          <div class="flex items-start gap-3">
            <input type="checkbox" v-model="agreeTerms" class="w-4 h-4 mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
            <span class="text-sm text-gray-500">{{ i18n.t('auth.register.agree') }} <button type="button" class="text-primary-500 font-medium hover:underline">{{ i18n.t('auth.register.terms') }}</button> {{ i18n.t('auth.register.and') }} <button type="button" class="text-primary-500 font-medium hover:underline">{{ i18n.t('auth.register.privacy') }}</button></span>
          </div>
          <AppButton type="submit" :loading="authStore.isLoading" :disabled="!agreeTerms" block class="mt-6">{{ i18n.t('auth.register.create') }}</AppButton>
        </form>
      </div>
      <p class="text-center text-sm text-gray-400 mt-8 animate-fade-in animate-delay-200">{{ i18n.t('auth.register.haveAccount') }} <router-link to="/login" class="text-primary-500 font-semibold hover:underline">{{ i18n.t('auth.register.signIn') }}</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, User, Mail, Lock } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useI18nStore } from '@/stores/i18n'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const i18n = useI18nStore()

const name = ref(''); const email = ref(''); const password = ref(''); const confirmPassword = ref(''); const agreeTerms = ref(false)
const errors = reactive({ name: '', email: '', password: '', confirmPassword: '' })

function validate(): boolean {
  let valid = true
  errors.name = ''; errors.email = ''; errors.password = ''; errors.confirmPassword = ''
  if (!name.value.trim()) { errors.name = i18n.t('auth.register.errors.nameRequired'); valid = false }
  if (!email.value) { errors.email = i18n.t('auth.register.errors.emailRequired'); valid = false }
  else if (!/\S+@\S+\.\S+/.test(email.value)) { errors.email = i18n.t('auth.register.errors.emailInvalid'); valid = false }
  if (!password.value) { errors.password = i18n.t('auth.register.errors.passwordRequired'); valid = false }
  else if (password.value.length < 6) { errors.password = i18n.t('auth.register.errors.passwordMin'); valid = false }
  if (password.value !== confirmPassword.value) { errors.confirmPassword = i18n.t('auth.register.errors.passwordsNotMatch'); valid = false }
  return valid
}

async function handleRegister() {
  if (!validate()) return
  const success = await authStore.register(name.value, email.value, password.value)
  if (success) router.push('/app/dashboard')
}
</script>