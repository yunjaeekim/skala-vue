<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const cityList = [
  { id: 'city_01', name: '서울' },
  { id: 'city_02', name: '수원' },
  { id: 'city_03', name: '부산' },
]

// 도시 코드에 해당하는 과거 관측 Mock Data
const pastRecords = {
  city_01: [
    { date: '2026-08-25', temp: 27, status: '맑음', humidity: '52%' },
    { date: '2026-08-24', temp: 29, status: '구름', humidity: '60%' },
    { date: '2026-08-23', temp: 31, status: '맑음', humidity: '48%' },
    { date: '2026-08-22', temp: 26, status: '비', humidity: '81%' },
    { date: '2026-08-21', temp: 25, status: '흐림', humidity: '70%' },
    { date: '2026-08-20', temp: 28, status: '구름', humidity: '63%' },
    { date: '2026-08-19', temp: 30, status: '맑음', humidity: '55%' },
    { date: '2026-08-18', temp: 32, status: '맑음', humidity: '45%' },
    { date: '2026-08-17', temp: 27, status: '비', humidity: '85%' },
    { date: '2026-08-16', temp: 24, status: '비', humidity: '90%' },
  ],
  city_02: [
    { date: '2026-08-25', temp: 25, status: '비', humidity: '84%' },
    { date: '2026-08-24', temp: 23, status: '비', humidity: '88%' },
    { date: '2026-08-23', temp: 28, status: '구름', humidity: '63%' },
    { date: '2026-08-22', temp: 27, status: '맑음', humidity: '55%' },
    { date: '2026-08-21', temp: 24, status: '흐림', humidity: '72%' },
    { date: '2026-08-20', temp: 26, status: '구름', humidity: '68%' },
    { date: '2026-08-19', temp: 29, status: '맑음', humidity: '57%' },
    { date: '2026-08-18', temp: 30, status: '맑음', humidity: '50%' },
    { date: '2026-08-17', temp: 25, status: '비', humidity: '86%' },
    { date: '2026-08-16', temp: 23, status: '흐림', humidity: '78%' },
  ],
  city_03: [
    { date: '2026-08-25', temp: 28, status: '구름', humidity: '66%' },
    { date: '2026-08-24', temp: 30, status: '맑음', humidity: '58%' },
    { date: '2026-08-23', temp: 29, status: '맑음', humidity: '61%' },
    { date: '2026-08-22', temp: 26, status: '비', humidity: '79%' },
    { date: '2026-08-21', temp: 27, status: '구름', humidity: '64%' },
    { date: '2026-08-20', temp: 29, status: '맑음', humidity: '60%' },
    { date: '2026-08-19', temp: 31, status: '맑음', humidity: '54%' },
    { date: '2026-08-18', temp: 28, status: '구름', humidity: '67%' },
    { date: '2026-08-17', temp: 26, status: '비', humidity: '83%' },
    { date: '2026-08-16', temp: 25, status: '비', humidity: '87%' },
  ],
}

// 조회 대상 도시는 쿼리 스트링에서 읽는다. (없으면 첫 번째 도시)
const selectedCityId = computed(() => route.query.city || cityList[0].id)

const selectedCityName = computed(
  () => cityList.find((city) => city.id === selectedCityId.value)?.name ?? '알 수 없음',
)

const records = computed(() => pastRecords[selectedCityId.value] ?? [])

const averageTemp = computed(() => {
  if (records.value.length === 0) return 0
  const sum = records.value.reduce((acc, record) => acc + record.temp, 0)
  return (sum / records.value.length).toFixed(1)
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
        v-for="city in cityList"
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
        >의 최근 {{ records.length }}일 평균 기온은 <strong>{{ averageTemp }}°C</strong> 입니다.
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
            <td>{{ record.temp }}°C</td>
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
