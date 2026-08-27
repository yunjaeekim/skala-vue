<script setup>
defineProps({
  historyList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select-history'])
</script>

<template>
  <div class="search-history">
    <h3>🕘 검색 기록</h3>

    <ul v-if="historyList.length > 0">
      <li v-for="city in historyList" :key="city">
        <button type="button" @click="emit('select-history', city)">{{ city }}</button>
      </li>
    </ul>

    <p v-else class="empty">아직 검색한 도시가 없습니다.</p>
  </div>
</template>

<style scoped>
.search-history ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.search-history button {
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
}

.search-history button:hover {
  border-color: #74b9ff;
  color: #0984e3;
}

.search-history .empty {
  margin: 0;
  color: #868e96;
  font-size: 13px;
}
</style>
