import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // 1. state: 단위를 저장하는 변수 (초기값은 'celsius')
  // 값은 오직 'celsius' 또는 'fahrenheit' 두 가지만 가집니다.
  const unit = ref('celsius')

  // 2. getters: 현재 단위 상태에 맞춰 화면에 뿌릴 기호(℃ / ℉)를 실시간 리턴
  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  // 2-2. getters: 섭씨 원본 값을 현재 단위에 맞춰 변환해서 리턴
  // 인자를 받아야 하므로 "함수를 반환하는 computed" 형태로 작성한다.
  // 화면마다 변환 로직을 중복 작성하지 않기 위해 스토어에서 한 번만 정의한다.
  const toDisplayTemp = computed(() => {
    return (celsius) => {
      if (unit.value === 'fahrenheit') {
        return Math.round((celsius * 9) / 5 + 32)
      }
      return celsius
    }
  })

  // 3. actions: 버튼 클릭 시 'celsius'와 'fahrenheit'를 토글(스위칭)하는 함수
  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return {
    unit,
    unitSymbol,
    toDisplayTemp,
    toggleUnit,
  }
})
