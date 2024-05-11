<template>
  <el-tree-select
    v-bind="attrsProps"
    v-model="_value"
    :data="optionsList"
    @change="handleChange"
  >
  </el-tree-select>
</template>

<script setup lang="ts" name="TreeSelect">
import { ref, useAttrs, onMounted } from 'vue'
import { useApi } from '@design/hooks/useApi'

const emits = defineEmits(['updateModel', 'updateValue'])

const attrs = useAttrs()

const {
  value = '',
  fieldKey = '',
  optionProps,
  api,
  enums = [], // option的遍历值
  ...attrsProps
} = attrs as Record<string, any>

const _value = ref(value)
const optionsList = ref<Record<string, any>>([])

// 处理 option 列表数据
onMounted(async () => {
  if (enums.length > 0) {
    optionsList.value = enums
  } else if (api) {
    const { requestAction } = useApi(api)
    const res = await requestAction({
      url: api.url,
      data: {}
    })

    const deep = (item: any) => {
      item.value = item[optionProps?.valueKey || 'value']
      item.label = item[optionProps?.labelKey || 'label']

      if (item[optionProps?.childrenKey || 'children']?.length) {
        item[optionProps?.childrenKey || 'children'].forEach(deep)
      }
    }

    res.data?.forEach(deep)

    optionsList.value = res.data as Record<string, any>[]
  }
})

const handleChange = (value: string | number | string[] | number[]) => {
  if (fieldKey) {
    emits('updateModel', fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
