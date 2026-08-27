<script setup>
import { ref } from 'vue'

const city = ref('')
const searchedCity = ref('')

// 입력할 때마다가 아니라, 검색 버튼을 눌렀을 때만 결과에 반영한다.
const handleSearch = () => {
  searchedCity.value = city.value.trim()
}
</script>

<template>
  <div class="search-city">
    <h2>🔍 도시 검색</h2>

    <div class="search-row">
      <input
        v-model="city"
        type="text"
        placeholder="검색할 도시 이름 입력"
        @keyup.enter="handleSearch"
      />
      <button type="button" class="btn-search" @click="handleSearch">검색</button>
    </div>

    <p v-if="searchedCity" class="result">
      <strong>{{ searchedCity }}</strong> 을(를) 검색했습니다.
    </p>
  </div>
</template>

<style scoped>
.search-city {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
}

.search-row {
  display: flex;
  gap: 8px;
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

.btn-search:hover {
  background: #3c5069;
}

.result {
  margin: 10px 0 0 0;
  font-size: 14px;
  color: #2e7d32;
}
</style>
