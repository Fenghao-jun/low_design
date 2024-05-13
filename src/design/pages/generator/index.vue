<template>
  <div>
    <FlowEvent />
  </div>
</template>
<script lang="ts" setup>
import FlowEvent from '@editor/flow-event/FlowEvent.vue'
import { useRoute } from 'vue-router'
import { getPageConfig } from '@design/api'
import { ElMessage } from 'element-plus'

const route = useRoute()
console.log('route: ', route)

const initPageConfig = async (id: string) => {
  const res = await getPageConfig(id)
  console.log('res: ', res)
}

if (route.params.pageId) {
  // initPageConfig(route.params.pageId as string)
} else {
  ElMessage({ type: 'error', message: '页面ID缺失' })
}
</script>
