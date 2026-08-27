<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import Toast from 'primevue/toast'

import UnitToggler from './day7/UnitToggler.vue'

const router = useRouter()
const route = useRoute()

// day4·day5 의 RouterLink 나열을 PrimeVue Menubar 로 대체한다.
const menuItems = computed(() => [
  {
    label: '날씨 대시보드',
    icon: 'pi pi-cloud',
    class: route.path === '/' ? 'active-item' : '',
    command: () => router.push('/'),
  },
  {
    label: '과거 날씨 조회',
    icon: 'pi pi-history',
    class: route.path === '/history' ? 'active-item' : '',
    command: () => router.push('/history'),
  },
  {
    label: '5일 예보',
    icon: 'pi pi-calendar',
    class: route.path === '/forecast' ? 'active-item' : '',
    command: () => router.push('/forecast'),
  },
  {
    label: '서비스 소개',
    icon: 'pi pi-info-circle',
    class: route.path === '/about' ? 'active-item' : '',
    command: () => router.push('/about'),
  },
])
</script>

<template>
  <div class="app-container">
    <Toast position="top-right" />

    <h1>⛅ 과제 6: 날씨 (UI Library 전체 적용)</h1>

    <Menubar :model="menuItems" class="nav">
      <template #end>
        <UnitToggler />
      </template>
    </Menubar>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 48px 24px;
}

.app-container h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav {
  margin-bottom: 20px;
}

:deep(.active-item > a) {
  background: var(--p-highlight-background);
  color: var(--p-highlight-color);
  border-radius: 6px;
}
</style>
