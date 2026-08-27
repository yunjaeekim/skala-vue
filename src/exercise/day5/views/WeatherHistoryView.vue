<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useConfigStore } from '../stores/configStore'
import { useWeatherStore } from '../stores/weatherStore'

const route = useRoute()
const router = useRouter()

// 도시 목록과 과거 기록, 단위 설정을 모두 스토어에서 가져온다.
const weatherStore = useWeatherStore()
const configStore = useConfigStore()

// 조회 대상 도시는 쿼리 스트링에서 읽는다. (없으면 첫 번째 도시)
const selectedCityId = computed(() => route.query.city || weatherStore.cityPresets[0].id)

const selectedCityName = computed(
  () =>
    weatherStore.cityPresets.find((city) => city.id === selectedCityId.value)?.name ?? '알 수 없음',
)

const records = computed(() => weatherStore.getRecordsById(selectedCityId.value))

// 평균은 섭씨 원본으로 계산하고, 표시 시점에 단위를 변환한다.
const averageTemp = computed(() => {
  if (records.value.length === 0) return 0
  const sum = records.value.reduce((acc, record) => acc + record.temp, 0)
  return Math.round((sum / records.value.length) * 10) / 10
})

// 같은 화면에서 조회 대상만 바뀌는 것이므로 push가 아닌 replace를 사용한다.
const selectCity = (cityId) => {
  router.replace({ path: route.path, query: { city: cityId } })
}
</script>

<template>
  <div class="history-container">
    <h3>🗓️ 과거 날씨 조회</h3>
    <hr />

    <div class="city-tabs">
      <button
        v-for="city in weatherStore.cityPresets"
        :key="city.id"
        type="button"
        class="tab"
        :class="{ active: city.id === selectedCityId }"
        @click="selectCity(city.id)"
      >
        {{ city.name }}
      </button>
    </div>

    <div v-if="records.length > 0" class="record-card">
      <p class="summary">
        <strong>{{ selectedCityName }}</strong
        >의 최근 {{ records.length }}일 평균 기온은
        <strong>{{ configStore.toDisplayTemp(averageTemp) }}{{ configStore.unitSymbol }}</strong>
        입니다.
      </p>

      <table class="record-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>기온</th>
            <th>날씨</th>
            <th>습도</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.date">
            <td>{{ record.date }}</td>
            <td>{{ configStore.toDisplayTemp(record.temp) }}{{ configStore.unitSymbol }}</td>
            <td>{{ record.status }}</td>
            <td>{{ record.humidity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>해당 지역의 과거 관측 기록이 존재하지 않습니다.</p>
    </div>

    <button @click="router.push('/')" class="back-btn">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.history-container {
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.city-tabs {
  display: flex;
  gap: 8px;
  margin: 15px 0;
}

.tab {
  padding: 6px 16px;
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
}

.tab.active {
  background: #2c3e50;
  border-color: #2c3e50;
  color: #fff;
  font-weight: bold;
}

.record-card {
  background: #f1f2f6;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}

.summary {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.record-table th,
.record-table td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #dcdde1;
}

.record-table th {
  color: #57606f;
  font-weight: 600;
}

.record-table tbody tr:last-child td {
  border-bottom: none;
}

.back-btn {
  padding: 8px 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
