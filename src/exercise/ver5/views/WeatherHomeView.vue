<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '../../ver3/BaseDashboardCard.vue'
import SearchBar from '../SearchBar.vue'
import WeatherCard from '../WeatherCardStore.vue'
import { useWeatherStore } from '../stores/weatherStore'

const router = useRouter()
const route = useRoute()

// 도시 데이터는 스토어가 OpenWeatherMap 에서 받아온다.
const weatherStore = useWeatherStore()

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
// 검색 버튼으로 조회한 도시. 값이 있으면 그 도시만 화면에 남긴다.
const searchedCityId = ref('')

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
  // 다시 입력을 시작하면 검색 결과 고정을 풀고 목록 전체로 돌아간다.
  searchedCityId.value = ''
  router.replace({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const filteredWeatherList = computed(() => {
  // 검색으로 조회한 도시가 있으면 그 도시 하나만 출력한다.
  if (searchedCityId.value) {
    const city = weatherStore.getCityById(searchedCityId.value)
    return city ? [city] : []
  }
  return weatherStore.searchCities(searchQuery.value)
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}

// 검색 버튼을 누르면 Geocoding + 현재날씨 API 로 조회해 목록에 추가하고,
// 그 도시만 화면에 남긴다.
const handleSearch = async (keyword) => {
  const cityId = await weatherStore.searchCityByName(keyword)
  if (!cityId) return

  searchedCityId.value = cityId
  const city = weatherStore.getCityById(cityId)
  if (city) {
    selectedCityInfo.value = `${city.name} 의 날씨를 불러왔습니다.`
  }
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar
        :current-query="searchQuery"
        :loading="weatherStore.isLoading"
        @update-query="(val) => (searchQuery = val)"
        @search="handleSearch"
      />
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
