<script setup>
// props / emit 계약은 ver3 의 WeatherCard 와 동일하게 유지하고,
// 마크업만 PrimeVue 컴포넌트로 교체한다.
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <Card class="weather-card" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <template #content>
      <div class="card-row">
        <div class="info">
          <div class="title">
            <span class="city-name">{{ cityItem.name }}</span>
            <span class="status">({{ cityItem.status }})</span>
          </div>

          <p class="temp">현재 기온: {{ cityItem.temp }}°C</p>

          <Tag v-if="cityItem.temp >= 25" severity="danger" value="🔥 더움" rounded />
          <Tag v-else severity="info" value="❄️ 선선함" rounded />
        </div>

        <Button
          label="상세보기"
          severity="primary"
          outlined
          size="small"
          @click.stop="emit('click-detail', cityItem.name, cityItem.status)"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 10px;
  cursor: pointer;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.title {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.city-name {
  font-size: 16px;
  font-weight: 700;
}

.status,
.temp {
  font-size: 13px;
  color: var(--p-text-muted-color);
  margin: 0;
}
</style>
