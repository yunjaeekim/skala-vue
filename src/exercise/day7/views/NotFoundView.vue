<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
</script>

<template>
  <div class="notfound-wrapper">
    <Card>
      <template #content>
        <div class="content">
          <div class="icon">☀️❓</div>
          <h2>페이지를 찾을 수 없습니다.</h2>
          <p>요청하신 주소가 존재하지 않거나,<br />아직 개발되지 않았습니다.</p>
          <Button
            label="날씨 메인으로 이동"
            icon="pi pi-home"
            rounded
            @click="router.push({ name: 'WeatherHome' })"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.notfound-wrapper {
  width: 600px;
  margin: 0 auto;
}

.content {
  text-align: center;
  padding: 24px 0;
}

.icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 12px 0;
}

p {
  color: var(--p-text-muted-color);
  line-height: 1.6;
  margin: 0 0 24px 0;
}
</style>
