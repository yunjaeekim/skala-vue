<script setup>
import { ref, computed } from 'vue'

const textColor = ref('red')
const fontWeight = ref('bold')

const rawHtmlData = computed(() => {
  return `
    이 글자는
    <span style="
      color: ${textColor.value};
      font-weight: ${fontWeight.value};
    ">
      동적으로 변경되는 글자
    </span>
    이다.
  `
})
</script>

<template>
  <div class="practice-section">
    <h2>v-html + 반응성</h2>

    <input v-model="textColor" placeholder="색상을 입력하세요" />

    <input v-model="fontWeight" placeholder="굵기를 입력하세요" />

    <h3>HTML 문자열</h3>
    <p>{{ rawHtmlData }}</p>

    <h3>v-html 적용 결과</h3>
    <p v-html="rawHtmlData"></p>
  </div>
</template>
