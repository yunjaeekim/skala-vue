<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useConfigStore } from '../stores/configStore'
import { useWeatherStore } from '../stores/weatherStore'

const route = useRoute()
const router = useRouter()

const weatherStore = useWeatherStore()
const configStore = useConfigStore()

// 주소로 바로 접근한 경우 스토어가 비어 있으므로 Mount 시점에 다시 조회한다.
onMounted(() => {
  if (!weatherStore.hasData) {
    weatherStore.fetchCities()
  }
})

// 스토어가 채워지면 자동으로 갱신되도록 computed 로 읽는다.
const cityData = computed(() => weatherStore.getDetailById(route.params.cityId))
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />

    <p v-if="weatherStore.errorMessage" class="state-message error">
      {{ weatherStore.errorMessage }}
    </p>

    <p v-else-if="weatherStore.isLoading" class="state-message">상세 정보를 불러오는 중입니다…</p>

    <div v-else-if="cityData" class="info-card">
      <h4>📍 지정 지역: {{ cityData.name }} ({{ cityData.country }})</h4>
      <p>
        실시간 기온:
        <strong>{{ configStore.toDisplayTemp(cityData.temp) }}{{ configStore.unitSymbol }}</strong>
      </p>
      <p>
        체감 기온:
        {{ configStore.toDisplayTemp(cityData.feelsLike) }}{{ configStore.unitSymbol }}
      </p>
      <p>
        최저 / 최고:
        {{ configStore.toDisplayTemp(cityData.tempMin) }} /
        {{ configStore.toDisplayTemp(cityData.tempMax) }}{{ configStore.unitSymbol }}
      </p>
      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
    </div>

    <div v-else>
      <p class="state-message">해당 지역의 상세 데이터가 존재하지 않습니다.</p>
    </div>

    <button @click="router.push('/')" class="back-btn">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container {
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.info-card {
  background: #f1f2f6;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}

.state-message {
  text-align: center;
  color: #57606f;
  padding: 16px 0;
}

.state-message.error {
  color: #e74c3c;
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
