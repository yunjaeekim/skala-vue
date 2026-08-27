<script setup>
import WeatherParent from './ver3-ui/WeatherParent.vue'
</script>

<template>
  <div class="dashboard-wrapper">
    <h1>⛅ 과제 6: 날씨 (UI Library)</h1>
    <hr />
    <WeatherParent />
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

.dashboard-wrapper hr {
  border: none;
  border-top: 2px solid #e9ecef;
  margin-bottom: 24px;
}

.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}
</style>
