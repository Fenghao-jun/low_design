<template>
  <el-checkbox-group v-bind="attrs" v-model="_value" @change="handleChange">
    <template
      v-for="item in optionsList"
      :key="item[optionProps?.valueKey || 'value']"
    >
      <el-checkbox
        v-bind="item"
        :label="item[optionProps?.valueKey || 'label']"
        :value="item[optionProps?.labelKey || 'value']"
      >
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script setup lang="ts" name="Checkbox">
import { ref, useAttrs, onMounted } from 'vue'
import { useApi } from '@design/hooks/useApi'
import useValue from '@design/hooks/useValue'
import { CheckboxAttrs } from './type'

const emits = defineEmits(['updateModel', 'updateValue'])
const props = defineProps<{ value: string[] }>()
const {
  value = [],
  fieldKey = '',
  enums = [],
  optionProps = {},
  api,
  ...attrs
} = useAttrs() as CheckboxAttrs

console.log('checkbox attrs: ', useAttrs())

const _value = useValue(props)

const optionsList = ref<Record<string, any>[]>([])

// 处理 option 列表数据
onMounted(async () => {
  if (enums.length > 0) {
    optionsList.value = enums
  } else {
    const { requestAction } = useApi(api)
    const res = await requestAction({
      url: api.url,
      data: {}
    })
    optionsList.value = res.data as Record<string, any>[]
  }
})

const handleChange = (value: any) => {
  if (fieldKey) {
    emits('updateModel', fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
