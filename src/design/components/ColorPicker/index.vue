<template>
  <el-color-picker v-bind="attrs" v-model="_value" @change="handleChange">
  </el-color-picker>
</template>

<script setup lang="ts" name="ColorPicker">
import { ref, useAttrs } from 'vue'
import { ColorPickerAttrs } from './type'

const emits = defineEmits(['updateModel', 'updateValue'])

const { value = '', fieldKey, ...attrs } = useAttrs() as ColorPickerAttrs

console.log('ColorPicker attrs: ', useAttrs())

const _value = ref(value)

const handleChange = (value: any) => {
  if (fieldKey) {
    emits('updateModel', fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
