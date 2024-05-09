<template>
  <el-date-picker
    :editable="false"
    :default-value="_defaultValue"
    :default-time="_defaultTime"
    type="date"
    placeholder="请选择日期"
    v-bind="datePickerAttrs"
    v-model="_value"
    @change="handleChange"
  >
  </el-date-picker>
</template>
<script setup lang="ts" name="DatePicker">
import { ref, useAttrs } from 'vue'
import dayjs from 'dayjs'

const attrs = useAttrs()

const {
  value = '',
  fieldKey,
  updateValueFormat = 'YYYY-MM-DD HH:mm:ss',
  ...datePickerAttrs
} = attrs as Record<string, any>

console.log(attrs)

const emit = defineEmits(['updateModel', 'updateValue'])

const _value = ref(value)
const _defaultValue = ref(
  datePickerAttrs.defaultValue
    ? new Date(datePickerAttrs.defaultValue)
    : new Date()
)
const _defaultTime = ref<[Date, Date]>([
  datePickerAttrs.defaultTime
    ? new Date(datePickerAttrs.defaultTime[0])
    : new Date(),
  datePickerAttrs.defaultTime
    ? new Date(datePickerAttrs.defaultTime[1])
    : new Date()
])

const handleChange = (value: any) => {
  let updateValue: string | [string, string] = ''
  if (Array.isArray(value)) {
    const [startTime, endTime] = value
    updateValue = [
      dayjs(startTime).format(updateValueFormat),
      dayjs(endTime).format(updateValueFormat)
    ]
  } else {
    updateValue = value ? dayjs(value).format(updateValueFormat) : ''
  }
  if (fieldKey) {
    emit('updateModel', fieldKey, updateValue)
  } else {
    emit('updateValue', updateValue)
  }
  console.log('handleChange: ', updateValue)
}
</script>
