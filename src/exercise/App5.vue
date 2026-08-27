<script setup>
import UnitToggler from './day5/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h1>⛅ 과제 5: 스토어적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/history" class="nav-item">🗓️ 과거 날씨 조회</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/forecast" class="nav-item">🌤️ 5일 예보</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 40px 10px 40px 10px;
  padding: 30px 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    sans-serif;
  color: #2c3e50;
}

.app-container h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-top: 48px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.navigation-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.divider {
  margin: 0 15px;
  color: #dcdde1;
}
</style>
