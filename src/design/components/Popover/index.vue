<template>
  <el-popover v-bind="$attrs">
    <template #reference>
      <el-button type="primary">{{ reference }}</el-button>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ children: any[]; reference: any }>(), {
  children: () => [],
  reference: '内容文本'
})
</script>
