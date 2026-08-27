<script setup>
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

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
  <div class="search-row">
    <IconField class="field">
      <InputIcon class="pi pi-search" />
      <!--
        v-model 대신 :value + @input 을 유지한다.
        v-model 은 한글 조합(IME) 중에는 값을 갱신하지 않기 때문에,
        과제 3의 "한글 즉시 동기화" 동작을 지키려면 직접 바인딩해야 한다.
      -->
      <InputText
        :value="currentQuery"
        placeholder="검색할 도시 이름 입력"
        fluid
        @input="$emit('update-query', $event.target.value)"
        @keyup.enter="$emit('search', currentQuery)"
      />
    </IconField>

    <Button label="검색" icon="pi pi-search" @click="$emit('search', currentQuery)" />
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
