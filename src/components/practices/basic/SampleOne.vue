<script setup>
import { ref } from 'vue'

// 일반 변수
let normalText = ''

// Vue 반응성 변수
const vueText = ref('')
</script>

<template>
  <div class="practice-section">
    <h2>일반 변수 vs 반응성 변수</h2>

    <h3>일반 변수</h3>

    <input type="text" placeholder="텍스트 입력" @input="normalText = $event.target.value" />

    <p>일반 변수 값: {{ normalText }}</p>

    <hr />

    <h3>Vue 반응성 변수</h3>

    <input type="text" placeholder="텍스트 입력" @input="vueText = $event.target.value" />

    <p>Vue 변수 값: {{ vueText }}</p>
  </div>
</template>
