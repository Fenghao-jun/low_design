<template>
  <el-input v-bind="props" v-model="_value" @change="handleChange"></el-input>
</template>

<script lang="ts" setup name="Input">
// import { ref } from 'vue'
import { inputProps } from 'element-plus'
import useValue from '../../hooks/useValue'

const props = defineProps({
  ...inputProps,
  colProps: Object,
  fieldKey: String,
  value: String
})

const emits = defineEmits(['updateModel', 'updateValue'])
const _value = useValue(props)

const handleChange = () => {
  // 没有字段名的值传递下来 不做emit处理
  if (props.fieldKey) {
    emits('updateModel', props.fieldKey, _value.value)
  } else {
    emits('updateValue', _value.value)
  }
}
</script>
