<script setup>
// ver3 의 BaseDashboardCard 를 PrimeVue 의 Card 로 대체한 버전.
// 직접 작성했던 배경/여백/테두리 CSS 가 Card 로 대체되고,
// 제목은 Card 의 title 슬롯을 사용해 카드마다 일관되게 배치된다.
import Card from 'primevue/card'

defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <Card class="base-dashboard-card">
    <template v-if="title" #title>
      <span class="card-title">{{ title }}</span>
    </template>
    <template #content>
      <slot></slot>
    </template>
  </Card>
</template>

<style scoped>
.base-dashboard-card {
  margin-bottom: 16px;
}

.card-title {
  font-size: 15px;
  font-weight: 700;
}
</style>
