<template>
  <el-input v-model="value" v-bind="props" @change="handleChange"></el-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { InputNumberProps } from './type'
const props = defineProps<InputNumberProps>()

// 上层组件监听 updateModel 方法来辅助更新表单的值
const emits = defineEmits(['updateModel'])

const value = ref(props.value || '')

const handleChange = () => {
  // 没有字段名的值传递下来 不做emit处理
  if (!props.fieldKey) return
  emits('updateModel', props.fieldKey, value.value)
}
</script>
