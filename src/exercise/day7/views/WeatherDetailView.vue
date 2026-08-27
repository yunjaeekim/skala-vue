<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Tag from 'primevue/tag'

import { useConfigStore } from '../../day5/stores/configStore'
import { useWeatherStore } from '../../day5/stores/weatherStore'

const route = useRoute()
const router = useRouter()

const weatherStore = useWeatherStore()
const configStore = useConfigStore()

// 주소로 바로 접근한 경우 스토어가 비어 있으므로 Mount 시점에 다시 조회한다.
onMounted(() => {
  if (!weatherStore.hasData) {
    weatherStore.fetchCities()
  }
})

const cityData = computed(() => weatherStore.getDetailById(route.params.cityId))
</script>

<template>
  <div class="detail-wrapper">
    <Card>
      <template #title>📊 지역별 상세 기상 관측 정보</template>
      <template #content>
        <Message v-if="weatherStore.errorMessage" severity="error" :closable="false">
          {{ weatherStore.errorMessage }}
        </Message>

        <div v-else-if="weatherStore.isLoading" class="loading">
          <ProgressSpinner style="width: 42px; height: 42px" stroke-width="4" />
          <p>상세 정보를 불러오는 중입니다…</p>
        </div>

        <div v-else-if="cityData" class="info">
          <div class="head">
            <span class="place">📍 {{ cityData.name }}</span>
            <Tag :value="cityData.status" severity="secondary" rounded />
          </div>

          <dl class="rows">
            <div class="row">
              <dt>실시간 기온</dt>
              <dd class="strong">
                {{ configStore.toDisplayTemp(cityData.temp) }}{{ configStore.unitSymbol }}
              </dd>
            </div>
            <div class="row">
              <dt>체감 기온</dt>
              <dd>
                {{ configStore.toDisplayTemp(cityData.feelsLike) }}{{ configStore.unitSymbol }}
              </dd>
            </div>
            <div class="row">
              <dt>최저 / 최고</dt>
              <dd>
                {{ configStore.toDisplayTemp(cityData.tempMin) }} /
                {{ configStore.toDisplayTemp(cityData.tempMax) }}{{ configStore.unitSymbol }}
              </dd>
            </div>
            <div class="row">
              <dt>대기 습도</dt>
              <dd>{{ cityData.humidity }}</dd>
            </div>
            <div class="row">
              <dt>현재 풍속</dt>
              <dd>{{ cityData.wind }}</dd>
            </div>
          </dl>
        </div>

        <Message v-else severity="warn" :closable="false">
          해당 지역의 상세 데이터가 존재하지 않습니다.
        </Message>

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
.detail-wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.place {
  font-size: 15px;
  font-weight: 700;
}

.rows {
  margin: 0;
  padding: 12px;
  border-radius: 6px;
  background: var(--p-content-hover-background);
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
}

.row dt {
  color: var(--p-text-muted-color);
}

.row dd {
  margin: 0;
}

.row dd.strong {
  font-weight: 700;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  color: var(--p-text-muted-color);
  font-size: 13px;
}

.back-btn {
  margin-top: 16px;
}
</style>
