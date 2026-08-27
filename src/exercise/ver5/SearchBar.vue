<script setup>
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// update-query : 입력값 변경 (목록 필터링용)
// search       : 검색 버튼 클릭 (API 조회용)
defineEmits(['update-query', 'search'])
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>

    <div class="search-row">
      <input
        type="text"
        :value="currentQuery"
        placeholder="도시 이름을 입력하세요 (예: 대구, Tokyo)"
        @input="$emit('update-query', $event.target.value)"
        @keyup.enter="$emit('search', currentQuery)"
      />
      <button
        type="button"
        class="btn-search"
        :disabled="loading"
        @click="$emit('search', currentQuery)"
      >
        {{ loading ? '조회 중…' : '검색' }}
      </button>
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

.btn-search:disabled {
  background: #a5b1c2;
  cursor: default;
}
</style>
