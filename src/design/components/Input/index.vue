<template>
  <el-col v-bind="colProps">
    <el-input v-bind="props" v-model="value" @change="handleChange"></el-input>
  </el-col>
</template>

<script lang="ts" setup name="Input">
import { ref } from 'vue'
import { inputProps } from 'element-plus'
const props = defineProps({
  ...inputProps,
  colProps: Object,
  fieldKey: String,
  value: String
})

const emits = defineEmits(['updateModel', 'updateValue'])
const value = ref(props.value || '')

const handleChange = () => {
  // 没有字段名的值传递下来 不做emit处理
  if (props.fieldKey) {
    emits('updateModel', props.fieldKey, value.value)
  } else {
    emits('updateValue', value.value)
  }
}
</script>
