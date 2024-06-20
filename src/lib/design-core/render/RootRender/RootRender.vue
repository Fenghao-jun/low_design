<template>
  <template v-for="component in props.components" :key="component.componentId">
    <component
      v-if="!isHidden(component)"
      :_id="component.componentId"
      :_name="component.name"
      :is="componentRegister.getComponent(component.key).component"
      :ref="(el) => handleRef(component, el)"
      v-bind="getComponentProps(component)"
      v-on="handleEvent(component)"
    >
      <template
        v-if="
          Array.isArray(component.children) && component.children.length > 0
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
import { evaluate } from 'amis-formula'

const props = defineProps<RootRenderProps>()

const attrs = useAttrs()
const handleRef = (component: any, el: any) => {
  // 远程组件的Ref在自身内部注册
  if (component.key !== 'RemoteComponent') {
    setComponentRef(component.componentId, el)
  }
}
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

const fields = ['disabled']

const store = usePageDataStore()
console.log('store: ', store.pageData)

const getComponentProps = computed(() => {
  return (component: ComponentScheme) => {
    let variableProps = {}

    if (component.variableProps) {
      const propsKeys = Object.keys(component.variableProps)

      variableProps = propsKeys.reduce((prev, current) => {
        return {
          ...prev,
          [current]: evaluate(
            component.variableProps[current].value,
            store.pageData
          )
        }
      }, {})
    }

    return {
      ...component.props,
      ...attrs,
      ...variableProps,
      children: component.children || null
    }
  }
})

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
