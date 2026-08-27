<script setup>
import Chip from 'primevue/chip'

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
    <div v-if="historyList.length > 0" class="chip-list">
      <Chip
        v-for="city in historyList"
        :key="city"
        :label="city"
        class="history-chip"
        @click="emit('select-history', city)"
      />
    </div>

    <p v-else class="empty">아직 검색한 도시가 없습니다.</p>
  </div>
</template>

<style scoped>
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.history-chip {
  cursor: pointer;
}

.empty {
  margin: 0;
  font-size: 13px;
  color: var(--p-text-muted-color);
}
</style>
