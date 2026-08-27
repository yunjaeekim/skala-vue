<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '../../day3/BaseDashboardCard.vue'
import SearchBar from '../../day3/SearchBar.vue'
import WeatherCard from '../WeatherCardStore.vue'
import { useWeatherStore } from '../stores/weatherStore'

const router = useRouter()
const route = useRoute()

// 도시 데이터는 스토어가 OpenWeatherMap 에서 받아온다.
const weatherStore = useWeatherStore()

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  // 아직 받아온 데이터가 없을 때만 API 를 호출한다.
  if (!weatherStore.hasData) {
    weatherStore.fetchCities()
  }
})

// 같은 화면에 머무르는 상태 갱신이므로 push 가 아닌 replace 를 사용한다.
watch(searchQuery, (newQuery) => {
  router.replace({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const filteredWeatherList = computed(() => weatherStore.searchCities(searchQuery.value))

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="section-head">
        <h3>🏙️ 지역별 실시간 날씨</h3>
        <button
          class="btn-refresh"
          :disabled="weatherStore.isLoading"
          @click="weatherStore.fetchCities()"
        >
          {{ weatherStore.isLoading ? '불러오는 중…' : '🔄 새로고침' }}
        </button>
      </div>

      <p v-if="weatherStore.errorMessage" class="state-message error">
        {{ weatherStore.errorMessage }}
      </p>

      <p v-else-if="weatherStore.isLoading && !weatherStore.hasData" class="state-message">
        실시간 날씨 정보를 불러오는 중입니다…
      </p>

      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(msg) => (selectedCityInfo = msg)"
          @click-detail="handleDetailJump(item.id)"
        />

        <p v-if="filteredWeatherList.length === 0" class="state-message error">
          검색 결과와 일치하는 도시가 없습니다.
        </p>
      </template>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-head h3 {
  margin: 0;
}

.btn-refresh {
  padding: 6px 10px;
  background: #4b6584;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.btn-refresh:disabled {
  background: #a5b1c2;
  cursor: default;
}

.state-message {
  text-align: center;
  color: #57606f;
  padding: 16px 0;
  margin: 0;
}

.state-message.error {
  color: #e74c3c;
}

.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
</style>
