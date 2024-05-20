<template>
  <el-switch v-bind="attrs" v-model="_value" @change="handleChange">
  </el-switch>
</template>

<script setup lang="ts" name="Switch">
import { ref, useAttrs, watch } from 'vue'
import { SwitchAttrs } from './type'

const emits = defineEmits(['updateModel', 'updateValue'])
const props = withDefaults(defineProps<{ value: string; fieldKey: string }>(), {
  value: '',
  fieldKey: ''
})
const attrs = useAttrs() as SwitchAttrs

const _value = ref(props.value)
console.log('switch attrs: ', useAttrs(), _value)
watch(props, (newValue) => {
  _value.value = newValue.value
})
const handleChange = (value: any) => {
  if (props.fieldKey) {
    emits('updateModel', props.fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
