<template>
  <div class="form-container">
    <el-form
      ref="formRef"
      v-bind="props.formProps"
      :model="formData"
      :rules="rules"
    >
      <template v-if="props.children?.length">
        <el-row v-bind="props.rowProps">
          <el-form-item
            v-for="item in props.children"
            :key="item.componentId"
            style="width: 100%"
            v-bind="item?.props?.formItemProps"
          >
            <!-- <component
              :is="componentRegister.getComponent(item.key)"
              v-bind="item.props"
              v-on="{ updateModel }"
              :value="formData[item.props.fieldKey]"
            /> -->
            <!-- <div>{{ item.props }}</div> -->
            <Render
              :components="[item]"
              v-on="{ updateModel }"
              v-bind="item.props"
              :value="formData[item?.props?.fieldKey]"
            ></Render>
          </el-form-item>
        </el-row>
      </template>
    </el-form>
    <!-- <div style="margin-top: 30px">
      🚀 {{ JSON.stringify(props, undefined, 2) }}
    </div> -->
  </div>
</template>

<script setup lang="ts" name="Form">
import { computed, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import Render from '@core/render/RootRender/RootRender.vue'
import { FormProps } from './type'

const props = defineProps<FormProps>()
const emits = defineEmits(['mounted'])

const formData = ref({ ...(props.formProps?.model || {}) })

const rules = computed(() => {
  const children = props.children || []
  const _rules = {}
  children.forEach((child) => {
    const childProps = child.props || {}
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
    if (childProps.fieldKey) {
      _rules[childProps.fieldKey] = childRules
    }
  })
  return _rules
})

const formRef = ref<FormInstance>()

const validate = async () => await formRef.value?.validate()
const validateField = async () => await formRef.value?.validateField()
const resetFields = async () => await formRef.value?.resetFields()
const scrollToField = async (arg: any) =>
  await formRef.value?.scrollToField(arg)
const clearValidate = async () => await formRef.value?.clearValidate()

defineExpose({
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate,
  initData(data?: Record<string, any>) {
    formData.value = { ...formData.value, ...(data || {}) }
  },
  async getData(): Promise<Record<string, any>> {
    return formData.value
  }
})

onMounted(() => emits('mounted'))

// 更新表单数据
const updateModel = (fieldKey, newValue) => {
  formData.value[fieldKey] = newValue
  console.log('updateModel: ', formData.value)
}
</script>

<style lang="scss" scoped>
.form-container {
  padding-top: 22px;
}
</style>
