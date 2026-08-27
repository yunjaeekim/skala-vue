<script setup>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

defineEmits(['update-query'])

defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <IconField>
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
      />
    </IconField>

    <p class="hint">
      검색 중인 도시: <strong>{{ currentQuery || '(없음)' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.hint {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: var(--p-text-muted-color);
}
</style>
