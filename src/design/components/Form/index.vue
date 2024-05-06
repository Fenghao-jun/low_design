<template>
  <div class="form-container">
    <el-form ref="formRef" v-bind="props.formProps">
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
          />
        </el-form-item>
      </template>
    </el-form>
    <div>🚀 {{ props }}</div>
  </div>
</template>

<script setup lang="ts" name="Form">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import componentRegister from '@core/utils/component-regiter'
import { FormProps } from './type'

const props = defineProps<FormProps>()
const emits = defineEmits(['updateModel'])

const formRef = ref<FormInstance>()

defineExpose({
  validate: formRef.value?.validate,
  validateField: formRef.value?.validateField,
  resetFields: formRef.value?.resetFields,
  scrollToField: formRef.value?.scrollToField,
  clearValidate: formRef.value?.clearValidate
})

// 更新表单数据
const updateModel = (fieldKey, newValue) =>
  emits('updateModel', { fieldKey, newValue })
</script>

<style lang="scss" scoped>
.form-container {
  padding-top: 22px;
}
</style>
