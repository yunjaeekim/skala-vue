import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from './views/WeatherHomeView.vue'

// 기온이 표시되는 화면은 day5 전용(스토어 적용) View 를 사용하고,
// 기온과 무관한 화면은 day4 에서 작성한 View 를 그대로 재사용한다.
const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: WeatherHomeView,
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    component: () => import('../day4/views/WeatherAboutView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('./views/WeatherDetailView.vue'),
  },
  {
    path: '/history',
    name: 'WeatherHistory',
    component: () => import('./views/WeatherHistoryView.vue'),
  },
  {
    path: '/forecast',
    name: 'WeatherForecast',
    component: () => import('./views/WeatherForecastView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../day4/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  // base 를 넘겨야 하위 경로(/skala-vue/) 배포 시에도 경로 매칭이 맞는다.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
