<script setup>
import WeatherComposition from './day2/WeatherComposition.vue'
</script>

<template>
  <div class="dashboard-wrapper">
    <h1>⛅ 과제 2: 날씨 (Mockup)</h1>
    <hr />
    <WeatherComposition />
  </div>
</template>

<style scoped>
.dashboard-wrapper h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-top: 48px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}
</style>
