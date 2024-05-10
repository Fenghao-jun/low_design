<template>
  <el-radio-group v-bind="attrs" v-model="_value" @change="handleChange">
    <template v-for="item in enums" :key="item.value">
      <el-radio v-bind="item.props" :value="item.value">
        {{ item.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts" name="Radio">
import { ref, useAttrs } from 'vue'
import { RadioAttrs } from './type'

const emits = defineEmits(['updateModel', 'updateValue'])

const { value = '', fieldKey, enums, ...attrs } = useAttrs() as RadioAttrs

console.log('radio attrs: ', useAttrs())

const _value = ref(value)

const handleChange = (value: any) => {
  if (fieldKey) {
    emits('updateModel', fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
