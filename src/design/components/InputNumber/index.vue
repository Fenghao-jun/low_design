<template>
  <el-input-number
    v-bind="omit(props, ['fieldKey', 'value'])"
    v-model="value"
    @change="handleChange"
  ></el-input-number>
</template>

<script lang="ts" setup name="InputNumber">
import { ref } from 'vue'
import { omit } from 'lodash-es'
import { InputNumberProps } from 'element-plus'

import { CustomerInputNumberProps } from './type'

const props = defineProps<CustomerInputNumberProps & InputNumberProps>()

const emits = defineEmits(['updateModel', 'updateValue'])
const value = ref(props.value || 0)

const handleChange = () => {
  // 没有字段名的值传递下来 不做emit处理
  if (props.fieldKey) {
    emits('updateModel', props.fieldKey, value.value)
  } else {
    emits('updateValue', value.value)
  }
}
</script>
