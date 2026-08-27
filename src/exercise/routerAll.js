import { createRouter, createWebHistory } from 'vue-router'
import Day4HomeView from './ver4/views/WeatherHomeView.vue'
import Day5HomeView from './ver5/views/WeatherHomeView.vue'

// AppAll.vue 전용 라우터.
// 한 화면에 과제 4와 과제 5를 함께 띄우기 위해 명명 뷰(named views)를 사용한다.
// 하나의 경로가 ver4 / ver5 두 개의 컴포넌트를 동시에 렌더링하고,
// 각각 <RouterView name="ver4" /> 와 <RouterView name="ver5" /> 자리에 출력된다.
const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    components: {
      ver4: Day4HomeView,
      ver5: Day5HomeView,
    },
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    components: {
      // 서비스 소개는 과제 5에서 따로 만들지 않았으므로 과제 4의 화면을 함께 사용한다.
      ver4: () => import('./ver4/views/WeatherAboutView.vue'),
      ver5: () => import('./ver4/views/WeatherAboutView.vue'),
    },
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    components: {
      ver4: () => import('./ver4/views/WeatherDetailView.vue'),
      ver5: () => import('./ver5/views/WeatherDetailView.vue'),
    },
  },
  {
    path: '/history',
    name: 'WeatherHistory',
    components: {
      ver4: () => import('./ver4/views/WeatherHistoryView.vue'),
      ver5: () => import('./ver5/views/WeatherHistoryView.vue'),
    },
  },
  {
    path: '/forecast',
    name: 'WeatherForecast',
    components: {
      // 과제 4에는 예보 화면이 없으므로 ver5 슬롯만 정의한다.
      ver5: () => import('./ver5/views/WeatherForecastView.vue'),
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    components: {
      ver4: () => import('./ver4/views/NotFoundView.vue'),
      ver5: () => import('./ver4/views/NotFoundView.vue'),
    },
  },
]

const router = createRouter({
  // base 를 넘겨야 하위 경로(/skala-vue/) 배포 시에도 경로 매칭이 맞는다.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
