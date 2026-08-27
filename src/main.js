import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

// 과제별 진입점. App 과 router 를 항상 짝으로 교체한다.
// AppTabs 는 과제 1~6 을 탭으로 한 번에 보여주는 통합 화면이다.
// import App from './exercise/App1.vue'
// import App from './exercise/App2.vue'
// import App from './exercise/App3.vue'
// import App from './exercise/App4.vue'
// import router from './exercise/day4/router'
// import App from './exercise/App5.vue'
// import router from './exercise/day5/router'
// import App from './exercise/App6.vue'
// import App from './exercise/App7.vue'
import App from './exercise/AppTabs.vue'
import router from './exercise/day7/router'

const app = createApp(App)

app.use(ElementPlus)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(ToastService)
app.use(createPinia())
app.use(router)

app.mount('#app')
