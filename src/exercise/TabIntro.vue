<script setup>
// 각 탭 상단에 해당 과제의 학습 주제와 기능을 안내하는 컴포넌트.
import Tag from 'primevue/tag'

defineProps({
  title: { type: String, required: true },
  topic: { type: String, default: '' },
  features: { type: Array, default: () => [] },
  tags: { type: Array, default: () => [] },
  note: { type: String, default: '' },
})
</script>

<template>
  <section class="tab-intro">
    <div class="head">
      <h2>{{ title }}</h2>
      <p v-if="topic" class="topic">{{ topic }}</p>
    </div>

    <ul v-if="features.length" class="features">
      <li v-for="feature in features" :key="feature">{{ feature }}</li>
    </ul>

    <div v-if="tags.length" class="tags">
      <Tag v-for="tag in tags" :key="tag" :value="tag" severity="secondary" rounded />
    </div>

    <p v-if="note" class="note">💡 {{ note }}</p>
  </section>
</template>

<style scoped>
.tab-intro {
  border: 1px solid var(--p-content-border-color);
  border-left: 4px solid var(--p-primary-color);
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
  background: var(--p-content-background);
}

.head h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
}

.topic {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: var(--p-text-muted-color);
}

.features {
  margin: 12px 0 0 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.9;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.note {
  margin: 12px 0 0 0;
  font-size: 13px;
  color: var(--p-text-muted-color);
  background: var(--p-content-hover-background);
  padding: 8px 12px;
  border-radius: 6px;
}
</style>
