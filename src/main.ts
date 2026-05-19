import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useI18nStore } from './stores/i18n'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const i18n = useI18nStore()
i18n.init()

app.mount('#app')