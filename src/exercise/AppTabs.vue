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
import SearchCity from './ver1/SearchCity.vue'
import WeatherByRegion from './ver1/WeatherByRegion.vue'
import WeatherComposition from './ver2/WeatherComposition.vue'
import WeatherParent from './ver3/WeatherParent.vue'
import WeatherParentUi from './ver3-ui/WeatherParent.vue'
import UnitToggler from './ver5-ui/UnitToggler.vue'
import TabIntro from './TabIntro.vue'
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
          <TabIntro
            title="과제 1 · 날씨 Mockup"
            topic="Vue 디렉티브와 컴포넌트 분리를 익히기 위한 정적 목업입니다."
            :features="[
              'v-for 로 도시 목록 반복 렌더링 (10개 지역)',
              'v-if / v-else 로 25도 기준 더움 · 선선함 표시',
              'class 바인딩으로 공통 스타일과 상태별 스타일 조합',
              '카드 클릭 시 선택 상태 표시, 상세보기는 alert 로 안내',
              '검색 버튼을 눌렀을 때만 검색어 반영',
            ]"
            :tags="['v-for', 'v-if / v-else', ':class', '@click']"
            note="검색창과 날씨 목록이 서로 다른 컴포넌트로 분리된 목업이라, 검색어가 목록을 거르지는 않습니다."
          />
          <div class="narrow">
            <SearchCity />
            <WeatherByRegion />
          </div>
        </TabPanel>

        <TabPanel value="1">
          <TabIntro
            title="과제 2 · Composition API"
            topic="과제 1의 기능을 Composition API 로 다시 구성했습니다."
            :features="[
              'ref() 로 검색어 · 선택 도시 · 날씨 데이터 상태 관리',
              'computed() 로 검색 결과 필터링',
              'watch() 로 선택된 도시 변경 감지 (콘솔 출력)',
              'watchEffect() 로 검색어 변화 자동 추적',
              'watch() 로 검색 기록 누적',
            ]"
            :tags="['ref', 'computed', 'watch', 'watchEffect']"
            note="검색은 도시 이름이 정확히 일치할 때만 결과가 나옵니다. 브라우저 콘솔을 열면 watch 동작을 확인할 수 있습니다."
          />
          <WeatherComposition />
        </TabPanel>

        <TabPanel value="2">
          <TabIntro
            title="과제 3 · 컴포넌트 분리"
            topic="기능 변경 없이 화면을 5개 컴포넌트로 나누었습니다."
            :features="[
              'BaseDashboardCard : slot 으로 카드 디자인 공통화 (3회 재사용)',
              'SearchBar : props 로 검색어 받고 update-query 로 전달',
              'WeatherCard : 도시 객체를 props 로 받고 select-card · click-detail 발생',
              'SearchHistory : 검색 기록 표시, 클릭 시 재검색',
              'WeatherParent : 모든 반응형 데이터를 보유',
            ]"
            :tags="['props', 'emit', 'slot']"
            note="검색창은 v-model 대신 :value + @input 을 사용합니다. v-model 은 한글 조합 중 값을 갱신하지 않기 때문입니다."
          />
          <WeatherParent />
        </TabPanel>

        <TabPanel value="3">
          <TabIntro
            title="과제 3 · 외부 UI Library 적용"
            topic="과제 3과 기능은 같고, 마크업만 PrimeVue 로 교체했습니다."
            :features="[
              'Card : 직접 만든 카드 div 를 대체',
              'InputText + IconField : 검색 입력창',
              'Tag : 더움 · 선선함 뱃지',
              'Chip : 검색 기록',
              'Toast : window.alert() 를 대체한 알림',
              'Message : 상태바와 결과 없음 안내',
            ]"
            :tags="['PrimeVue', 'Card', 'Tag', 'Chip', 'Toast', 'Message']"
            note="props · emit 계약과 computed · watch 로직은 과제 3과 완전히 동일합니다. 왼쪽 탭과 비교해 보세요."
          />
          <WeatherParentUi />
        </TabPanel>

        <TabPanel value="4">
          <TabIntro
            title="과제 4 · 5 · 라우터 / 스토어 / 실시간 API"
            topic="Vue Router, Pinia, OpenWeatherMap API 를 모두 적용한 최종 화면입니다."
            :features="[
              '5개 화면 라우팅 + 지연 로딩 + 없는 주소 처리',
              '상세보기 클릭 시 주소 이동 (Programmatic Navigation)',
              'Pinia 스토어로 도시 데이터와 단위 설정을 공유',
              'OpenWeatherMap 으로 실시간 날씨와 5일 예보 조회',
              '검색 버튼으로 임의의 도시 조회 (Geocoding API)',
              '℃ / ℉ 단위 전환이 모든 화면에 반영',
            ]"
            :tags="['Vue Router', 'Pinia', 'axios', 'OpenWeatherMap', 'PrimeVue']"
            note="검색은 한글 · 영문 모두 됩니다. 대구, 제주, Tokyo 등을 입력하고 검색 버튼을 눌러 보세요. 과거 날씨 조회는 무료 플랜에 해당 API 가 없어 Mock 데이터를 사용합니다."
          />
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
          <TabIntro
            title="실습 · 디렉티브 / 이벤트 / 폼 / 스타일"
            topic="수업 중 진행한 기본 문법 예제 모음입니다."
            :features="[
              'v-html · v-text · v-bind · v-if · v-show · v-for',
              'v-pre · v-cloak · v-once · v-memo',
              '이벤트 객체와 이벤트 수식어',
              'v-model 폼 바인딩과 수식어',
              'scoped 스타일',
            ]"
            :tags="['Directive', 'Event', 'Form', 'Style']"
          />
          <PracticeBasic />
        </TabPanel>

        <TabPanel value="6">
          <TabIntro
            title="실습 · 컴포넌트 / Composition API"
            topic="컴포넌트 통신과 Composition API 예제 모음입니다."
            :features="[
              '반응형 상태 (ref · reactive)',
              'computed 와 watch · watchEffect',
              '컴포넌트 라이프사이클',
              'props 와 emit',
              'slot (기본 · 이름 있는 슬롯 · 범위 슬롯)',
            ]"
            :tags="['ref', 'computed', 'lifecycle', 'props', 'emit', 'slot']"
          />
          <PracticeComponent />
        </TabPanel>

        <TabPanel value="7">
          <TabIntro
            title="실습 · Store / Axios / UI Library"
            topic="외부 라이브러리 연동 예제 모음입니다."
            :features="[
              'Pinia 스토어 카운터',
              'axios 로 OpenWeatherMap 실시간 날씨 조회',
              'axios CRUD (GET · POST · PUT · DELETE)',
              'Element Plus 폼 · 알림 · 확인창',
            ]"
            :tags="['Pinia', 'axios', 'Element Plus']"
            note="이 탭의 예제는 Element Plus 를, 나머지 과제 화면은 PrimeVue 를 사용합니다."
          />
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
  margin: 0 auto;
}

:deep(.active-item > a) {
  background: var(--p-highlight-background);
  color: var(--p-highlight-color);
  border-radius: 6px;
}
</style>
