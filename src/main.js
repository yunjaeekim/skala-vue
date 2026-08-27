import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

// 과제별 진입점. App 과 router 를 항상 짝으로 교체한다.
// 배포되는 화면은 UI Library 를 전체 적용한 App7 이다.
// import App from './exercise/App1.vue'
// import App from './exercise/App2.vue'
// import App from './exercise/App3.vue'
// import App from './exercise/App4.vue'
// import router from './exercise/day4/router'
// import App from './exercise/App5.vue'
// import router from './exercise/day5/router'
// import App from './exercise/App6.vue'
// import App from './exercise/AppAll.vue'
// import router from './exercise/routerAll'
import App from './exercise/App7.vue'
import router from './exercise/day7/router'

const app = createApp(App)

app.use(PrimeVue, { theme: { preset: Aura } })
app.use(ToastService)
app.use(createPinia())
app.use(router)

app.mount('#app')
