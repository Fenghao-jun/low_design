<template>
  <div class="form-container">
    <el-form
      ref="formRef"
      v-bind="props.formProps"
      :model="formData"
      :rules="rules"
    >
      <template v-if="props.children?.length">
        <el-form-item
          v-for="item in props.children"
          :key="item.componentId"
          v-bind="item.props.formItemProps"
        >
          <component
            :is="componentRegister.getComponent(item.key)"
            v-bind="item.props"
            v-on="{ updateModel }"
            :value="formData[item.props.fieldKey]"
          />
        </el-form-item>
      </template>
    </el-form>
    <div style="margin-top: 30px">
      🚀 {{ JSON.stringify(props, undefined, 2) }}
    </div>
  </div>
</template>

<script setup lang="ts" name="Form">
import { computed, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import componentRegister from '@core/utils/component-regiter'
import { FormProps } from './type'

const props = defineProps<FormProps>()
const formData = ref({ ...(props.formProps?.model || {}) })

const rules = computed(() => {
  const children = props.children || []
  const _rules = {}
  children.forEach((child) => {
    console.log('child: ', child)
    const childProps = child.props
    // eslint-disable-next-line array-callback-return
    const childRules = (childProps?.rules || []).map((rule) => {
      if (rule.validator) {
        rule.validator =
          typeof rule.validator === 'string'
            ? // eslint-disable-next-line no-new-func
              new Function('rule', 'value', 'callback', rule.validator).bind(
                formData.value
              )
            : rule.validator
      } else {
        return rule
      }
      return rule
    })
    _rules[childProps.fieldKey] = childRules
  })
  console.log(_rules)
  return _rules
})

const formRef = ref<FormInstance>()

defineExpose({
  validate: formRef.value?.validate,
  validateField: formRef.value?.validateField,
  resetFields: formRef.value?.resetFields,
  scrollToField: formRef.value?.scrollToField,
  clearValidate: formRef.value?.clearValidate,
  initData(data?: Record<string, any>) {
    if (data) {
      formData.value = data
    }
  }
})

// 更新表单数据
const updateModel = (fieldKey, newValue) => {
  formData.value[fieldKey] = newValue
  // log
  console.log('updateModel: ', formData.value, {
    [fieldKey.toString()]: formData.value[fieldKey]
  })
}
</script>

<style lang="scss" scoped>
.form-container {
  padding-top: 22px;
}
</style>
