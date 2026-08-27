<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
</script>

<template>
  <div class="about-wrapper">
    <Card>
      <template #title>ℹ️ 서비스 소개</template>
      <template #content>
        <p class="lead">
          본 앱은 <strong>Vue 3</strong>, <strong>Vue Router</strong>,
          <strong>Pinia</strong> 기반으로 제작된 실습용 기상 관측 대시보드입니다.
        </p>

        <ul class="feature-list">
          <li><code>exercise/</code> 폴더의 과제별 컴포넌트 재사용</li>
          <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
          <li>URL 쿼리 스트링을 활용한 검색·조회 상태 동기화</li>
          <li>OpenWeatherMap API 연동을 통한 실시간 날씨 및 5일 예보</li>
          <li>외부 UI Library(PrimeVue) 적용</li>
        </ul>

        <Button
          label="대시보드 홈으로 이동"
          icon="pi pi-home"
          class="home-btn"
          @click="router.push('/')"
        />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.about-wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.lead {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.6;
}

.feature-list {
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.9;
  color: var(--p-text-muted-color);
}

code {
  background: var(--p-content-hover-background);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}

.home-btn {
  margin-top: 16px;
  width: 100%;
}
</style>
