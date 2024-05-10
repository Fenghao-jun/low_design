<template>
  <el-switch v-bind="attrs" v-model="_value" @change="handleChange">
  </el-switch>
</template>

<script setup lang="ts" name="Switch">
import { ref, useAttrs } from 'vue'
import { SwitchAttrs } from './type'

const emits = defineEmits(['updateModel', 'updateValue'])

const { value = false, fieldKey, ...attrs } = useAttrs() as SwitchAttrs

console.log('switch attrs: ', useAttrs())

const _value = ref(value)

const handleChange = (value: any) => {
  if (fieldKey) {
    emits('updateModel', fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
