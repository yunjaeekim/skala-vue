<script setup>
// update-query : 입력값 변경 (한글 조합 중에도 즉시 전달)
// search       : 검색 버튼 클릭 (이때만 목록에 반영)
defineEmits(['update-query', 'search'])

defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <div class="search-row">
      <input
        type="text"
        :value="currentQuery"
        placeholder="검색할 도시 이름 입력"
        @input="$emit('update-query', $event.target.value)"
        @keyup.enter="$emit('search', currentQuery)"
      />
      <button type="button" class="btn-search" @click="$emit('search', currentQuery)">검색</button>
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
</style>
