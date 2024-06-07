<template>
  <el-select
    v-bind="attrsProps"
    value-key="desc"
    v-model="_value"
    @change="handleChange"
  >
    <el-option
      v-for="item in optionsList"
      :key="item.value"
      :value="item[optionProps.valueKey || 'value']"
      :label="item[optionProps.labelKey || 'label']"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref, useAttrs, onMounted, watch } from 'vue'
import { useApi } from '@design/hooks/useApi'
import { evaluate } from 'amis-formula'
import { get } from 'lodash-es'
import { usePageDataStore } from '@/design-core/store/page-data'
const emits = defineEmits(['updateModel', 'updateValue'])

const attrs = useAttrs()
const props = defineProps<{ value: string; fieldKey: string }>()
const {
  optionProps = {},
  api,
  enums = [], // option的遍历值
  ...attrsProps
} = attrs as Record<string, any>

const _value = ref('')
watch(props, (newValue) => {
  _value.value = newValue.value
})
const optionsList = ref<Record<string, any>>([])

const store = usePageDataStore()

// 处理 option 列表数据
onMounted(async () => {
  if (enums.length > 0) {
    optionsList.value = enums
  } else {
    const { requestAction } = useApi(api)

    let otherParams = {}
    if (api.params) {
      const mergeData = {
        pageData: store.getData()
      }
      otherParams = api.params.reduce((prev, cur) => {
        if (cur.formula) {
          // 执行公式
          prev[cur.key] = evaluate(cur.formula, mergeData)
          return prev
        }
        prev[cur.key] = get(mergeData, cur.value)
        return prev
      }, {})
    }
    const res = await requestAction({
      url: api.url,
      data: otherParams
    })
    optionsList.value = res.data as Record<string, any>[]
  }
})

const handleChange = (value: string | number | string[] | number[]) => {
  if (props.fieldKey) {
    emits('updateModel', props.fieldKey, value)
  } else {
    emits('updateValue', value)
  }
}
</script>
