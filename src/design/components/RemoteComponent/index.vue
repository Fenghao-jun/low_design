<template>
  <template v-if="show">
    <component :is="componentRegister.getComponent('demo-protable')"></component>
  </template>
  <div>{{ $attrs }}</div>
</template>

<script setup lang="ts">
import { ref, Component } from 'vue'
import componentRegister, { ComponentRegisterCenter } from '@core/utils/component-regiter'

import type { Props } from './type'

defineProps<Props>()

const show = ref(false)

const registerBatch = (scope: string, components: Record<string, Component>) => {
  const componentNames = Object.keys(components)
  for (const name of componentNames) {
    ComponentRegisterCenter.register(`${scope.toLowerCase()}-${name.toLowerCase()}`, components[name])
  }
}


import('demo_components/components.vue').then(res => {
  registerBatch('demo', res.default)
  show.value = true
})
</script>

<style scoped></style>
