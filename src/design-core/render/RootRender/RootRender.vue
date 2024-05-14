<template>
  <template v-for="component in props.components" :key="component.componentId">
    <component
      v-if="!isHidden(component)"
      :_id="component.componentId"
      :_name="component.name"
      :is="componentRegister.getComponent(component.key).component"
      :ref="(el) => setComponentRef(component.componentId, el)"
      v-bind="getComponentProps(component)"
      v-on="handleEvent(component)"
    >
      <template
        v-if="
          Array.isArray(component.children) &&
          component.children.length > 0 &&
          component.key !== 'Form' &&
          component.key !== 'Container'
        "
      >
        <RootRender :components="component.children" />
      </template>
    </component>
  </template>
</template>
<script setup lang="ts">
// TODO 最外层的render
import { setComponentRef } from '@core/utils/component-ref'
import componentRegister from '@core/utils/component-regiter'
import { excelEventFlow } from '@core/utils/event-flow'
import { computed, defineProps, useAttrs } from 'vue'
import { RootRenderProps } from './RootRenderOptions'
import { ComponentScheme } from '@/design-core/types'
import { usePageDataStore } from '@/design-core/store/page-data'

const props = defineProps<RootRenderProps>()

const attrs = useAttrs()

const handleEvent = (component: ComponentScheme) => {
  const props: Record<string, any> = {}
  // TODO 可视化之后来处理这里的事件，不要让所有的事件都注册到 RootRender 中
  const events = component.events || {}

  const keys = Object.keys(events)

  if (keys.length === 0) {
    return props
  }

  keys.forEach((key) => {
    props[key] = (params: any) => {
      console.log(component.name, '，事件流：', events[key])
      events[key].length && excelEventFlow(events[key], params, params)
    }
  })

  return {
    ...props,
    ...attrs
  }
}

const getComponentProps = (component: ComponentScheme) => {
  return {
    ...component.props,
    ...attrs,
    children:
      component.key === 'Form' || component.key === 'Container'
        ? component.children
        : undefined
  }
}

const store = usePageDataStore()
console.log('store: ', store.pageData)

const isHidden = (component: ComponentScheme) => {
  let hidden = false

  if (component.hidden) {
    if (component.hidden.type === 'static') {
      hidden = !!component.hidden.value
    } else if (component.hidden.type === 'variable') {
      console.log('store.pageData: ', store.pageData, component.hidden.value)

      hidden = store.pageData[component.hidden.value]
    }
  }
  console.log('hidden: ', hidden)

  return hidden
}
</script>

<style scoped></style>
