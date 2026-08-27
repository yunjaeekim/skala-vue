<script setup>
// ver5 의 UnitToggler 를 PrimeVue 의 SelectButton 으로 대체한 버전.
import SelectButton from 'primevue/selectbutton'
import { useConfigStore } from '../ver5/stores/configStore'

const configStore = useConfigStore()

const unitOptions = [
  { label: '℃', value: 'celsius' },
  { label: '℉', value: 'fahrenheit' },
]
</script>

<template>
  <SelectButton
    :model-value="configStore.unit"
    :options="unitOptions"
    option-label="label"
    option-value="value"
    :allow-empty="false"
    size="small"
    @update:model-value="configStore.toggleUnit()"
  />
</template>
