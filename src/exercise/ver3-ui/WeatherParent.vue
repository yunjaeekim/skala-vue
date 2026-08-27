<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import Message from 'primevue/message'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import SearchHistory from './SearchHistory.vue'

const toast = useToast()

const searchQuery = ref('')
// 검색 버튼을 눌렀을 때만 목록에 반영되는 검색어
const appliedQuery = ref('')

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const candidates = []
for (let i = 0; i < weatherList.value.length; i++) {
  candidates.push(weatherList.value[i].name)
}

const filteredWeatherList = computed(() => {
  if (appliedQuery.value === '') {
    return weatherList.value
  }

  if (candidates.includes(appliedQuery.value)) {
    for (let i = 0; i < weatherList.value.length; i++) {
      if (weatherList.value[i].name === appliedQuery.value) {
        return [weatherList.value[i]]
      }
    }
  }

  return []
})

// 검색 버튼을 눌렀을 때만 검색어를 목록에 적용한다.
const handleSearch = (keyword) => {
  appliedQuery.value = (keyword ?? '').trim()
}
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

watch(selectedCityInfo, (newInfo) => {
  console.log(`상태 바 문구가 업데이트되었습니다. -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(`현재 검색어 '${searchQuery.value}'입니다.`)
})

const searchHistory = ref([])

watch(searchQuery, (newQuery) => {
  // 입력할 때마다 watch가 실행되므로, 실제 도시와 일치할 때만 기록한다.
  if (!candidates.includes(newQuery)) return
  if (searchHistory.value.includes(newQuery)) return

  searchHistory.value.push(newQuery)
})

// ver3 의 window.alert() 를 PrimeVue 의 Toast 로 대체한다.
const showDetail = (cityName, status) => {
  toast.add({
    severity: 'info',
    summary: `${cityName} 날씨`,
    detail: `${cityName}의 현재 날씨는 [${status}] 상태입니다.`,
    life: 2500,
  })
}
</script>

<template>
  <div class="dashboard-wrapper">
    <Toast position="top-right" />

    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar
        :current-query="searchQuery"
        @update-query="(val) => (searchQuery = val)"
        @search="handleSearch"
      />
    </BaseDashboardCard>

    <BaseDashboardCard title="🕘 검색 기록">
      <SearchHistory
        :history-list="searchHistory"
        @select-history="(city) => (searchQuery = city)"
      />
    </BaseDashboardCard>

    <BaseDashboardCard title="🏙️ 지역별 날씨 현황">
      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(msg) => (selectedCityInfo = msg)"
        @click-detail="showDetail"
      />

      <!-- ver3 의 인라인 style 문구를 Message 로 대체 -->
      <Message v-if="filteredWeatherList.length === 0" severity="warn" :closable="false">
        검색 결과와 일치하는 도시가 없습니다.
      </Message>
    </BaseDashboardCard>

    <!-- ver3 의 .SelectCity 상태바를 Message 로 대체 -->
    <Message severity="success" :closable="false">{{ selectedCityInfo }}</Message>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}
</style>
