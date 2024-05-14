<template>
  <template v-if="show">
    <component
      :is="componentRegister.getComponent(componentName).component"
      v-bind="$attrs"
      v-on="attr.events"
    ></component>
  </template>
</template>

<script setup lang="ts">
import { Component, computed, ref, onErrorCaptured, useAttrs } from 'vue'
import componentRegister, {
  ComponentRegisterCenter
} from '@core/utils/component-regiter'
import { Props } from './type'

const props = defineProps<Props>()
const attr = useAttrs()

const emits = defineEmits(['error'])

onErrorCaptured((...rest) => {
  console.log('[onErrorCaptured] ', ...rest)
  emits('error', { ...rest })
})

const componentName = computed(() => {
  return `${props.remote.scope.toLowerCase()}-${props.remote.name.toLowerCase()}`
})

const show = ref(false)

const registerBatch = (
  scope: string,
  components: Record<string, Component>
) => {
  const componentNames = Object.keys(components)
  for (const name of componentNames) {
    ComponentRegisterCenter.register(
      `${scope.toLowerCase()}-${name.toLowerCase()}`,
      components[name]
    )
  }
  show.value = componentRegister.getComponent(componentName.value).component
}

import('demo_components/components.vue')
  .then((res) => {
    registerBatch('demo', res.default)
  })
  .catch((err) => {
    console.log('[demo_components/components.vue]', err)
  })
</script>

<style scoped></style>
