/**
 * main.ts
 *
 * Bootstraps Vuetify, Pinia, MDI icons, and other plugins, then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia

// Router
import router from './router'

// Material Design Icons (MDI)
import '@mdi/font/css/materialdesignicons.css' // Import MDI CSS

const app = createApp(App)

// สร้าง Pinia Instance
const pinia = createPinia()

// ใช้งาน Plugins ต่าง ๆ
registerPlugins(app)
app.use(pinia) // ใช้ Pinia
app.use(router) // ใช้ Router

// Mount แอป
app.mount('#app')
