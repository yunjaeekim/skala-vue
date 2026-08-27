<script setup>
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

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
    <div class="search-row">
      <IconField class="field">
        <InputIcon class="pi pi-search" />
        <InputText
          :value="currentQuery"
          placeholder="도시 이름을 입력하세요 (예: 대구, Tokyo)"
          fluid
          @input="$emit('update-query', $event.target.value)"
          @keyup.enter="$emit('search', currentQuery)"
        />
      </IconField>

      <Button
        label="검색"
        icon="pi pi-search"
        :loading="loading"
        @click="$emit('search', currentQuery)"
      />
    </div>

    <p class="hint">
      목록에 없는 도시는 <strong>검색</strong> 버튼을 누르면 OpenWeatherMap 에서 불러옵니다.
    </p>
  </div>
</template>

<style scoped>
.search-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.field {
  flex: 1;
}

.hint {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: var(--p-text-muted-color);
}
</style>
