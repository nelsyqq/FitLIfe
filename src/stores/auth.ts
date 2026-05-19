import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { currentUser } from '@/data/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>({ ...currentUser })
  const isAuthenticated = ref(true)
  const isLoading = ref(false)

  const userName = computed(() => user.value?.name ?? '')
  const userEmail = computed(() => user.value?.email ?? '')
  const userAvatar = computed(() => user.value?.avatar ?? '')
  const userLevel = computed(() => user.value?.level ?? 'beginner')
  const userGoal = computed(() => user.value?.goal ?? 'maintain')

  function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          user.value = { ...currentUser, email }
          isAuthenticated.value = true
          isLoading.value = false
          resolve(true)
        } else {
          isLoading.value = false
          resolve(false)
        }
      }, 1000)
    })
  }

  function register(name: string, email: string, password: string): Promise<boolean> {
    isLoading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password) {
          user.value = { ...currentUser, name, email }
          isAuthenticated.value = true
          isLoading.value = false
          resolve(true)
        } else {
          isLoading.value = false
          resolve(false)
        }
      }, 1000)
    })
  }

  function logout() {
    user.value = { ...currentUser }
    isAuthenticated.value = false
  }

  function updateUser(data: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...data }
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    userName,
    userEmail,
    userAvatar,
    userLevel,
    userGoal,
    login,
    register,
    logout,
    updateUser
  }
})