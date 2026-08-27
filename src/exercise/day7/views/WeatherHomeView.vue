<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

import BaseDashboardCard from '../../day6/BaseDashboardCard.vue'
import SearchBar from '../../day6/SearchBar.vue'
import WeatherCard from '../WeatherCardStore.vue'
import { useWeatherStore } from '../../day5/stores/weatherStore'

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
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
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
