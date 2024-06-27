<template>
  <div class="select-object">
    <el-button type="primary" icon="plus">Primary</el-button>
  </div>
</template>

<script setup lang="ts">
import { SelectObjectProps } from './props'
import { getDepartStaff, getDepartTree } from '@editor/api/workFlow'
import {
  ref,
  watch,
  computed,
  defineProps,
  withDefaults,
  defineEmits,
  defineExpose
} from 'vue'

const props = withDefaults(defineProps<SelectObjectProps>(), {
  type: 'person',
  modelValue: () => []
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.select-object {
  width: 100%;
  height: 100%;
  padding: 10px;
  // box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
</style>
