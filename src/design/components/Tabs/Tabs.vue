<template>
  <el-tabs :modelValue="value" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
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
