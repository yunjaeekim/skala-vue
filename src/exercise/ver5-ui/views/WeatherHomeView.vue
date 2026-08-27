<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

import BaseDashboardCard from '../../ver3-ui/BaseDashboardCard.vue'
import SearchBar from '../SearchBar.vue'
import WeatherCard from '../WeatherCardStore.vue'
import { useWeatherStore } from '../../ver5/stores/weatherStore'

const router = useRouter()
const route = useRoute()

// 도시 데이터는 스토어가 OpenWeatherMap 에서 받아온다.
const weatherStore = useWeatherStore()

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
// 검색 버튼으로 조회한 도시. 값이 있으면 그 도시만 화면에 남긴다.
const searchedCityId = ref('')
// 검색 버튼을 눌렀을 때만 목록에 반영되는 검색어
const appliedQuery = ref('')

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
    appliedQuery.value = route.query.search
  }
  // 아직 받아온 데이터가 없을 때만 API 를 호출한다.
  if (!weatherStore.hasData) {
    weatherStore.fetchCities()
  }
})

// 같은 화면에 머무르는 상태 갱신이므로 push 가 아닌 replace 를 사용한다.
// 다시 입력을 시작하면 이전 검색 결과 고정을 푼다.
watch(searchQuery, () => {
  searchedCityId.value = ''
})

const filteredWeatherList = computed(() => {
  // 검색으로 조회한 도시가 있으면 그 도시 하나만 출력한다.
  if (searchedCityId.value) {
    const city = weatherStore.getCityById(searchedCityId.value)
    return city ? [city] : []
  }
  return weatherStore.searchCities(appliedQuery.value)
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}

// 검색 버튼을 누르면 Geocoding + 현재날씨 API 로 해당 도시를 조회해 목록에 추가한다.
const handleSearch = async (keyword) => {
  appliedQuery.value = (keyword ?? '').trim()
  // 검색 시점에만 주소의 쿼리 스트링을 갱신한다.
  router.replace({
    path: route.path,
    query: { search: appliedQuery.value || undefined },
  })

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
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar
        :current-query="searchQuery"
        :loading="weatherStore.isLoading"
        @update-query="(val) => (searchQuery = val)"
        @search="handleSearch"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <template #default>
        <div class="section-head">
          <span class="section-title">🏙️ 지역별 실시간 날씨</span>
          <Button
            label="새로고침"
            icon="pi pi-refresh"
            size="small"
            text
            :loading="weatherStore.isLoading"
            @click="weatherStore.fetchCities()"
          />
        </div>

        <Message v-if="weatherStore.errorMessage" severity="error" :closable="false">
          {{ weatherStore.errorMessage }}
        </Message>

        <div v-else-if="weatherStore.isLoading && !weatherStore.hasData" class="loading">
          <ProgressSpinner style="width: 42px; height: 42px" stroke-width="4" />
          <p>실시간 날씨 정보를 불러오는 중입니다…</p>
        </div>

        <template v-else>
          <div class="card-grid">
            <WeatherCard
              v-for="item in filteredWeatherList"
              :key="item.id"
              :city-item="item"
              @select-card="(msg) => (selectedCityInfo = msg)"
              @click-detail="handleDetailJump(item.id)"
            />
          </div>

          <Message v-if="filteredWeatherList.length === 0" severity="warn" :closable="false">
            검색 결과와 일치하는 도시가 없습니다.
          </Message>
        </template>
      </template>
    </BaseDashboardCard>

    <Message severity="success" :closable="false">{{ selectedCityInfo }}</Message>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
}

/* 넓은 화면에서는 카드를 가로로 배치한다. */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  color: var(--p-text-muted-color);
  font-size: 13px;
}
</style>
