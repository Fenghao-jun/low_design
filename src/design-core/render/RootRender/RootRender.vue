<template>
  <div>
    <component
      v-for="component in props.components"
      :key="component.componentId"
      :_id="component.componentId"
      :_name="component.name"
      :is="componentRegister.getComponent(component.key)"
      :ref="(el) => setComponentRef(component.componentId, el)"
      v-bind="component.props"
    >
      <template
        v-if="
          Array.isArray(component.children) && component.children.length > 0
        "
      >
        <RootRender :components="component.children" />
      </template>
    </component>
  </div>
</template>
<script setup lang="ts">
// TODO 最外层的render
import { setComponentRef } from '@core/utils/component-ref'
import componentRegister from '@core/utils/component-regiter'
import { defineProps } from 'vue'
import { RootRenderProps } from './RootRenderOptions'

const props = defineProps<RootRenderProps>()
</script>

<style scoped></style>
