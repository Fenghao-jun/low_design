<template>
  <div>
    <!-- <Render :components="pageConfig.components" /> -->
    设计 321
    <!-- <Render /> -->
    <DemoComponentOfIncrement :count="count" @increment="count++"></DemoComponentOfIncrement>
    <DemoComponentOfProTable></DemoComponentOfProTable>
  </div>
</template>

<script setup lang="ts" name="design">
import { defineAsyncComponent, ref } from 'vue'
// import Render from '@core/render/RootRender/RootRender.vue'
// import { getPageConfig } from '@design/api'

// const pageConfig = ref({
//   components: []
// })

// const initPageConfig = async () => {
//   const res = await getPageConfig()
//   pageConfig.value = res.data
// }

// initPageConfig()
// const loading = ref(false)
// const msg = ref('hello 111')
const count = ref(1)
const DemoComponentOfIncrement = defineAsyncComponent(() => import('demo_components/increment.vue'))
const DemoComponentOfProTable = defineAsyncComponent(() => import('demo_components/protable.vue'))
</script>
