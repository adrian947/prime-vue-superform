import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara'

import ToastService from 'primevue/toastservice' // 🔴 FALTABA
import Toast from 'primevue/toast'
import SplitButton from 'primevue/splitbutton'
import { MyTheme } from './theme'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: MyTheme,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue'
	},
	darkModeSelector: false || 'none',
    }
  }
})

app.use(ToastService) // 🔴 OBLIGATORIO
app.use(router)

app.component('Toast', Toast)
app.component('SplitButton', SplitButton)

app.mount('#app')
