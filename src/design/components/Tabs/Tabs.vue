<template>
  <el-tabs :modelValue="currentTab" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in options"
      :label="item.label"
      :name="item.name"
      :key="item.name"
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { TabsPaneContext } from 'element-plus'

import { ITabsProps } from './props'

const props = defineProps<ITabsProps>()

const emit = defineEmits(['change'])
const handleClick = (tab: TabsPaneContext) => {
  console.log(tab.paneName)

  emit('change', tab)
}
</script>

<style scoped></style>
