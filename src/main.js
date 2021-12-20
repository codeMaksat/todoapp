import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'

window.eventBus = new Vue()

createApp(App).use(i18n).mount('#app')