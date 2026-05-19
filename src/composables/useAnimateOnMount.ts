import { ref, onMounted } from 'vue'

export function useAnimateOnMount() {
  const isVisible = ref(false)

  onMounted(() => {
    requestAnimationFrame(() => {
      isVisible.value = true
    })
  })

  return {
    isVisible
  }
}

export function useStaggeredAnimation(count: number, delay: number = 100) {
  const visibleItems = ref<boolean[]>(new Array(count).fill(false))

  onMounted(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < count; i++) {
      const timer = setTimeout(() => {
        visibleItems.value[i] = true
      }, delay * i)
      timers.push(timer)
    }
  })

  return {
    visibleItems
  }
}