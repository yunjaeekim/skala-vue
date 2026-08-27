<script setup>
import { useConfigStore } from './stores/configStore'

defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

// 단위 변환은 configStore 의 getter 를 사용한다.
// 화면마다 같은 변환 computed 를 만들지 않기 위함이다.
const configStore = useConfigStore()
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ configStore.toDisplayTemp(cityItem.temp) }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 25" class="region hot">🔥 더움</span>
    <span v-else class="region cool">❄️ 선선함</span>

    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.region {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
