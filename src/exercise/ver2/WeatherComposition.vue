<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

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
  // 검색창이 비어 있으면 전체 출력
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

  // 검색했는데 일치하는 도시가 없으면 빈 배열
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
  console.log(`검색 기록에 '${newQuery}'을(를) 추가했습니다.`)
})

// 검색 버튼을 눌렀을 때만 검색어를 목록에 적용한다.
const handleSearch = () => {
  appliedQuery.value = searchQuery.value.trim()
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-city">
      <h2>🔍 도시 검색</h2>
      <div class="search-row">
        <input
          type="text"
          :value="searchQuery"
          placeholder="검색할 도시 이름 입력"
          @input="(e) => (searchQuery = e.target.value)"
          @keyup.enter="handleSearch"
        />
        <button type="button" class="btn-search" @click="handleSearch">검색</button>
      </div>
    </section>

    <section class="search-history">
      <h2>🕘 검색 기록</h2>
      <ul v-if="searchHistory.length > 0">
        <li v-for="city in searchHistory" :key="city">{{ city }}</li>
      </ul>
      <p v-else class="empty">아직 검색한 도시가 없습니다.</p>
    </section>

    <section class="weatherbyregion">
      <h1>🏙️ 지역별 날씨 현황</h1>
      <div
        v-for="item in filteredWeatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <h4>현재 기온: {{ item.temp }}°C</h4>

        <p v-if="item.temp >= 25" class="region hot">더움 (25도 이상)</p>
        <p v-else class="region cool">선선함 (25도 미만)</p>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>

      <p
        v-if="filteredWeatherList.length === 0"
        style="text-align: center; color: #e74c3c; padding: 10px 0"
      >
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </section>

    <div class="SelectCity">
      <span>{{ selectedCityInfo }}</span>
    </div>
  </div>
</template>

<style scoped>
.search-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 14px;
}

.btn-search {
  padding: 8px 18px;
  background: #4b6584;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
}

.search-city {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
}

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

.search-history {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
}
.search-history ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.search-history li {
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 13px;
}
.search-history .empty {
  margin: 0;
  color: #868e96;
  font-size: 13px;
}
</style>
