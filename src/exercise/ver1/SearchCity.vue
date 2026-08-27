<script setup>
import { ref } from 'vue'

const city = ref('')
</script>

<template>
  <div class="search-city">
    <h2>🔍 도시 검색</h2>
    <div>
      <input
        type="text"
        :value="city"
        @input="(e) => (city = e.target.value)"
        placehold="검색할 도시 이름 입력"
      />
      <p>
        검색 중인 도시: <strong>{{ city }}</strong>
      </p>
    </div>
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
</style>
