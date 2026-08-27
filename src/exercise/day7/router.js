import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from './views/WeatherHomeView.vue'

// 전체 화면에 외부 UI Library(PrimeVue)를 적용한 버전.
// 데이터 로직은 day5 의 스토어를 그대로 재사용한다.
const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: WeatherHomeView,
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    component: () => import('./views/WeatherAboutView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('./views/WeatherDetailView.vue'),
  },
  {
    path: '/forecast',
    name: 'WeatherForecast',
    component: () => import('./views/WeatherForecastView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFoundView.vue'),
  },
]

const router = createRouter({
  // base 를 넘겨야 하위 경로(/skala-vue/) 배포 시에도 경로 매칭이 맞는다.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
