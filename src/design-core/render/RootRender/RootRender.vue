<template>
  <div>
    <component
      v-for="component in props.components"
      :key="component.componentId"
      :_id="component.componentId"
      :_name="component.name"
      :is="componentRegister.getComponent(component.key)"
      :ref="(el) => setComponentRef(component.componentId, el)"
      v-bind="getComponentProps(component)"
      v-on="handleEvent(component)"
    >
      <template
        v-if="
          Array.isArray(component.children) &&
          component.children.length > 0 &&
          component.key !== 'Form'
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
import { computed, defineProps } from 'vue'
import { RootRenderProps } from './RootRenderOptions'
import { Component } from '@/design-core/types'

const props = defineProps<RootRenderProps>()

const handleEvent = (component: Component) => {
  const props: Record<string, any> = {}
  // TODO 可视化之后来处理这里的事件，不要让所有的事件都注册到 RootRender 中
  const events = component.events

  const keys = Object.keys(events || {})

  if (keys.length === 0) {
    return props
  }

  keys.forEach((key) => {
    console.log('key: ', key)
    props.onClick = () => {
      // TODO 执行事件流
      console.log('312321')
    }
  })
  return props
}

const getComponentProps = (component: Component) => {
  return {
    ...component.props,
    children: component.key === 'Form' ? component.children : undefined
  }
}
</script>

<style scoped></style>
