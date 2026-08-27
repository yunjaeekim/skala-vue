<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import SearchHistory from './SearchHistory.vue'

const searchQuery = ref('')

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
  if (searchQuery.value === '') {
    return weatherList.value
  }

  if (candidates.includes(searchQuery.value)) {
    for (let i = 0; i < weatherList.value.length; i++) {
      if (weatherList.value[i].name === searchQuery.value) {
        return [weatherList.value[i]]
      }
    }
  }

  return []
})
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

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <SearchHistory
        :history-list="searchHistory"
        @select-history="(city) => (searchQuery = city)"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>

      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(msg) => (selectedCityInfo = msg)"
        @click-detail="showDetail"
      />

      <p
        v-if="filteredWeatherList.length === 0"
        style="text-align: center; color: #e74c3c; padding: 10px 0"
      >
        검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <div class="SelectCity">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}

.SelectCity {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
</style>
