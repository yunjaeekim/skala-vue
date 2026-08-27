<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
import Toast from 'primevue/toast'

// 과제 1 ~ 6 을 탭으로 한 번에 확인하기 위한 진입점.
import SearchCity from './day1/SearchCity.vue'
import WeatherByRegion from './day1/WeatherByRegion.vue'
import WeatherComposition from './day2/WeatherComposition.vue'
import WeatherParent from './day3/WeatherParent.vue'
import WeatherParentUi from './day6/WeatherParent.vue'
import UnitToggler from './day7/UnitToggler.vue'
import PracticeBasic from '../App.vue'
import PracticeComponent from '../App2.vue'
import PracticeLibrary from '../App3.vue'

const router = useRouter()
const route = useRoute()

// 주소가 '/' 가 아니면 라우터를 쓰는 날씨 앱 탭으로 시작한다.
const activeTab = ref('0')
onMounted(() => {
  if (route.path !== '/') activeTab.value = '4'
})

const menuItems = computed(() => [
  {
    label: '날씨 대시보드',
    icon: 'pi pi-cloud',
    class: route.path === '/' ? 'active-item' : '',
    command: () => router.push('/'),
  },
  {
    label: '과거 날씨 조회',
    icon: 'pi pi-history',
    class: route.path === '/history' ? 'active-item' : '',
    command: () => router.push('/history'),
  },
  {
    label: '5일 예보',
    icon: 'pi pi-calendar',
    class: route.path === '/forecast' ? 'active-item' : '',
    command: () => router.push('/forecast'),
  },
  {
    label: '서비스 소개',
    icon: 'pi pi-info-circle',
    class: route.path === '/about' ? 'active-item' : '',
    command: () => router.push('/about'),
  },
])
</script>

<template>
  <div class="app-shell">
    <Toast position="top-right" />

    <header class="app-header">
      <h1>⛅ SKALA Vue 실습 과제</h1>
      <p class="subtitle">과제별 화면을 탭으로 전환하며 확인할 수 있습니다.</p>
    </header>

    <Tabs v-model:value="activeTab" scrollable>
      <TabList>
        <Tab value="0">과제 1 · Mockup</Tab>
        <Tab value="1">과제 2 · Composition</Tab>
        <Tab value="2">과제 3 · 컴포넌트</Tab>
        <Tab value="3">과제 3 - UI Library</Tab>
        <Tab value="4">과제 4·5 · 라우터 / 스토어 / API</Tab>
        <Tab value="5">실습 · 디렉티브 / 이벤트 / 폼</Tab>
        <Tab value="6">실습 · 컴포넌트 / Composition</Tab>
        <Tab value="7">실습 · Store / Axios / UI Library</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="0">
          <div class="narrow">
            <SearchCity />
            <WeatherByRegion />
          </div>
        </TabPanel>

        <TabPanel value="1">
          <WeatherComposition />
        </TabPanel>

        <TabPanel value="2">
          <WeatherParent />
        </TabPanel>

        <TabPanel value="3">
          <WeatherParentUi />
        </TabPanel>

        <TabPanel value="4">
          <Menubar :model="menuItems" class="nav">
            <template #end>
              <UnitToggler />
            </template>
          </Menubar>
          <main>
            <RouterView />
          </main>
        </TabPanel>

        <TabPanel value="5">
          <PracticeBasic />
        </TabPanel>

        <TabPanel value="6">
          <PracticeComponent />
        </TabPanel>

        <TabPanel value="7">
          <PracticeLibrary />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>
.app-shell {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 64px 24px;
  box-sizing: border-box;
}

.app-header {
  margin-bottom: 20px;
}

.app-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--p-text-muted-color);
}

.nav {
  margin-bottom: 20px;
}

/* 과제 1 은 원본이 600px 기준으로 작성되어 폭을 유지한다. */
.narrow {
  width: 100%;
  max-width: 600px;
}

:deep(.active-item > a) {
  background: var(--p-highlight-background);
  color: var(--p-highlight-color);
  border-radius: 6px;
}
</style>
