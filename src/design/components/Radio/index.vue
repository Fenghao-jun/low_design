<template>
  <el-radio-group
    v-bind="raioGroupProps"
    v-model="_value"
    @change="handleChange"
  >
    <template v-for="item in (enums as any[])" :key="item.value">
      <el-radio v-bind="item?.props" :value="item.value">
        {{ item.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts" name="Radio">
import { radioGroupProps } from 'element-plus'
import { omit } from 'lodash-es'
import useValue from '../../hooks/useValue'

const emits = defineEmits(['updateModel', 'updateValue'])

const props = defineProps({
  ...radioGroupProps,
  value: String,
  enums: Array,
  fieldKey: String
})
const raioGroupProps = omit<typeof props, 'value' | 'fieldKey' | 'enums'>(
  props,
  ['value', 'fieldKey', 'enums']
)
console.log('gogogogo:>>', props.fieldKey, {
  props,
  value: props.value
})
const _value = useValue(props)

const handleChange = (value: any) => {
  if (props.fieldKey) {
    emits('updateModel', props.fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
