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
</style>
