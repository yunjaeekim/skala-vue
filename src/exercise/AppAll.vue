<script setup>
// 과제 1 ~ 5 를 한 화면에서 모두 확인하기 위한 통합 진입점.
// 기존 파일은 수정하지 않고, 각 과제의 컴포넌트를 그대로 가져와 배치한다.
import SearchCity from './ver1/SearchCity.vue'
import WeatherByRegion from './ver1/WeatherByRegion.vue'
import WeatherComposition from './ver2/WeatherComposition.vue'
import WeatherParent from './ver3/WeatherParent.vue'
import UnitToggler from './ver5/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h1>⛅ 과제 1: 날씨 (Mockup)</h1>
    <hr />
    <div class="dashboard-wrapper">
      <SearchCity />
      <WeatherByRegion />
    </div>
  </div>

  <div class="app-container">
    <h1>⛅ 과제 2: 날씨 (컴포지션)</h1>
    <hr />
    <WeatherComposition />
  </div>

  <div class="app-container">
    <h1>⛅ 과제 3: 날씨 (컴포넌트)</h1>
    <hr />
    <WeatherParent />
  </div>

  <div class="app-container">
    <h1>⛅ 과제 4: 라우터적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/history" class="nav-item">🗓️ 과거 날씨 조회</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
      </nav>
      <main>
        <RouterView name="ver4" />
      </main>
    </div>
  </div>

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
        <UnitToggler /> <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView name="ver5" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto 32px auto;
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
  margin-top: 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-container hr {
  border: none;
  border-top: 2px solid #e9ecef;
  margin-bottom: 24px;
}

.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
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

.nav-item {
  padding: 6px 12px;
  border-radius: 6px;
  color: #57606f;
  text-decoration: none;
  font-size: 14px;
}

.nav-item:hover {
  background-color: #f1f2f6;
}

.nav-item.router-link-exact-active {
  background-color: #eaf2fd;
  color: #1a6fd4;
  font-weight: bold;
}
</style>
