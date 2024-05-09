<template>
  <el-col v-bind="colProps">
    <el-cascader
      placeholder="请选择内容"
      v-bind="cascaderProps"
      v-model="_value"
      @change="handleChange"
    ></el-cascader>
  </el-col>
</template>

<script setup lang="ts" name="Cascader">
import { ref, useAttrs } from 'vue'

const emits = defineEmits(['updateModel', 'updateValue'])

const {
  value = '',
  fieldKey,
  /**
   * init 辅助回显处理
   * change 更新值时格式化值的处理
   */
  handlers = {},
  colProps = {},
  ...cascaderProps
} = useAttrs() as Record<string, any>

const _value = ref(
  handlers.init
    ? // eslint-disable-next-line no-useless-call, no-new-func
      new Function('value', handlers.init).call(null, value)
    : value
)

const handleChange = (value: any) => {
  if (handlers.change) {
    try {
      // eslint-disable-next-line no-new-func
      const handler = new Function('value', handlers.change).bind(
        null,
        value || ''
      )
      const res = handler()
      if (fieldKey) {
        emits('updateModel', fieldKey, res)
      } else {
        emits('updateValue', res)
      }
    } catch (err: any) {
      console.log(err)
    }
  } else {
    if (fieldKey) {
      emits('updateModel', fieldKey, value || '')
    } else {
      emits('updateValue', value || '')
    }
  }
}
</script>
