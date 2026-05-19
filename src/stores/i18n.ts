import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ru from '@/i18n/ru'
import en from '@/i18n/en'

type Locale = 'ru' | 'en'
type TranslationKeys = typeof ru

export const useI18nStore = defineStore('i18n', () => {
  const locale = ref<Locale>('ru')
  const translations = ref<Record<Locale, TranslationKeys>>({ ru, en })

  function init() {
    const saved = localStorage.getItem('fitlife-locale') as Locale | null
    if (saved && (saved === 'ru' || saved === 'en')) {
      locale.value = saved
    }
  }

  function setLocale(l: Locale) {
    locale.value = l
    localStorage.setItem('fitlife-locale', l)
  }

  function t(path: string): string {
    const keys = path.split('.')
    let result: any = translations.value[locale.value]
    for (const key of keys) {
      if (result === undefined || result === null) return path
      result = result[key]
    }
    return result ?? path
  }

  return {
    locale,
    init,
    setLocale,
    t
  }
})