<template>
  <div class="min-h-screen bg-light text-dark">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Desktop breakpoint - hide mobile-only, show desktop */
@media (min-width: 1024px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 1023px) {
  .desktop-only {
    display: none !important;
  }
}

/* Smooth scrollbar for desktop */
@media (min-width: 1024px) {
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
}
</style>