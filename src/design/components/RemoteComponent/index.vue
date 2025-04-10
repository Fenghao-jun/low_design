<template>
  <template v-if="show">
    <component
      :ref="(el) => handleRef(el)"
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
import { setComponentRef } from '@core/utils/component-ref'

import { Props } from './type'

const props = defineProps<Props>()
const attr = useAttrs()
const emits = defineEmits(['error'])

onErrorCaptured((...rest) => {
  console.log('[onErrorCaptured] ', ...rest)
  emits('error', { ...rest })
})
const handleRef = (el: any) => {
  setComponentRef((attr as Record<string, any>)._id, el)
}

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

import('shop/components.vue')
  .then((res) => {
    registerBatch('shop', res.default)
  })
  .catch((err) => {
    console.log('[shop/entry.vue]', err)
  })
</script>

<style scoped></style>
