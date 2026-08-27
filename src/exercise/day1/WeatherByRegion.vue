<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '인천', temp: 25, status: '흐림' },
  { id: 'city_05', name: '대전', temp: 27, status: '맑음' },
  { id: 'city_06', name: '대구', temp: 31, status: '맑음' },
  { id: 'city_07', name: '광주', temp: 29, status: '구름' },
  { id: 'city_08', name: '울산', temp: 23, status: '비' },
  { id: 'city_09', name: '강릉', temp: 22, status: '흐림' },
  { id: 'city_10', name: '제주', temp: 30, status: '비' },
])

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const selectedCity = ref('카드를 클릭하거나 검색해 보세요.')
</script>

<template>
  <div class="weatherbyregion">
    <h1>🏙️ 지역별 날씨 현황</h1>
    <div
      v-for="item in weatherList"
      :key="item.id"
      class="weather-card"
      @click="selectedCity = `${item.name}이 선택되었습니다.`"
    >
      <h4>{{ item.name }} ({{ item.status }})</h4>
      <h4>현재 기온: {{ item.temp }}°C</h4>

      <p v-if="item.temp >= 25" class="region hot">더움 (25도 이상)</p>
      <p v-else class="region cool">선선함 (25도 미만)</p>

      <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">상세보기</button>
    </div>
  </div>

  <div class="SelectCity">
    <span>{{ selectedCity }}</span>
  </div>
</template>

<style scoped>
.weatherbyregion {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
}

.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.region {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
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
