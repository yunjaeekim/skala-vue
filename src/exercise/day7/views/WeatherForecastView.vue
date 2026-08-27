<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Message from 'primevue/message'
import SelectButton from 'primevue/selectbutton'
import Tag from 'primevue/tag'

import { useConfigStore } from '../../day5/stores/configStore'
import { useWeatherStore } from '../../day5/stores/weatherStore'

const route = useRoute()
const router = useRouter()

const weatherStore = useWeatherStore()
const configStore = useConfigStore()

// 조회 대상 도시는 쿼리 스트링에서 읽는다. (없으면 첫 번째 도시)
const selectedCityId = computed(() => route.query.city || weatherStore.cityPresets[0].id)

const selectedCityName = computed(
  () =>
    weatherStore.cityPresets.find((city) => city.id === selectedCityId.value)?.name ?? '알 수 없음',
)

const records = computed(() => weatherStore.getForecastById(selectedCityId.value))

// 평균은 섭씨 원본으로 계산하고, 표시 시점에 단위를 변환한다.
const averageTemp = computed(() => {
  if (records.value.length === 0) return 0
  const sum = records.value.reduce((acc, record) => acc + record.temp, 0)
  return Math.round((sum / records.value.length) * 10) / 10
})

// 아직 받아오지 않은 도시일 때만 예보 API 를 호출한다.
const loadForecast = (cityId) => {
  if (weatherStore.getForecastById(cityId).length === 0) {
    weatherStore.fetchForecast(cityId)
  }
}

onMounted(() => loadForecast(selectedCityId.value))
watch(selectedCityId, (cityId) => loadForecast(cityId))

// 같은 화면에서 조회 대상만 바뀌는 것이므로 push 가 아닌 replace 를 사용한다.
const selectCity = (cityId) => {
  if (!cityId) return
  router.replace({ path: route.path, query: { city: cityId } })
}
</script>

<template>
  <div class="forecast-wrapper">
    <Card>
      <template #title>🌤️ 5일 날씨 예보</template>
      <template #content>
        <SelectButton
          :model-value="selectedCityId"
          :options="weatherStore.cityPresets"
          option-label="name"
          option-value="id"
          :allow-empty="false"
          size="small"
          class="city-tabs"
          @update:model-value="selectCity"
        />

        <Message v-if="weatherStore.errorMessage" severity="error" :closable="false">
          {{ weatherStore.errorMessage }}
        </Message>

        <template v-else>
          <Message severity="info" :closable="false" class="summary">
            <strong>{{ selectedCityName }}</strong
            >의 향후 {{ records.length }}일 평균 기온은
            <strong>
              {{ configStore.toDisplayTemp(averageTemp) }}{{ configStore.unitSymbol }}
            </strong>
            입니다.
          </Message>

          <!-- day5 의 직접 만든 <table> 을 PrimeVue DataTable 로 대체 (정렬 지원) -->
          <DataTable
            :value="records"
            :loading="weatherStore.isLoading"
            data-key="dateTime"
            size="small"
            striped-rows
            class="forecast-table"
          >
            <template #empty>해당 지역의 예보 데이터가 존재하지 않습니다.</template>

            <Column field="date" header="날짜" sortable />
            <Column field="temp" header="기온" sortable>
              <template #body="{ data }">
                {{ configStore.toDisplayTemp(data.temp) }}{{ configStore.unitSymbol }}
              </template>
            </Column>
            <Column field="status" header="날씨">
              <template #body="{ data }">
                <Tag :value="data.status" severity="secondary" rounded />
              </template>
            </Column>
            <Column field="humidity" header="습도" sortable />
          </DataTable>
        </template>

        <Button
          label="메인 대시보드로 돌아가기"
          icon="pi pi-arrow-left"
          severity="secondary"
          size="small"
          class="back-btn"
          @click="router.push('/')"
        />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.forecast-wrapper {
  width: 600px;
  margin: 0 auto;
}

.city-tabs {
  margin-bottom: 12px;
}

.summary {
  margin-bottom: 12px;
}

.back-btn {
  margin-top: 16px;
}
</style>
