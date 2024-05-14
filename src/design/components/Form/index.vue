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
          <el-col
            v-for="item in props.children"
            :key="item.componentId"
            v-bind="item?.props?.colProps"
          >
            <template v-if="item.key === 'Title' || item.key === 'Container'">
              <Render :components="[item]" v-bind="item.props"></Render>
            </template>
            <templte v-else>
              <el-form-item
                v-bind="item?.props?.formItemProps"
                v-bind:rules="
                  formatCustomValidator(item?.props?.formItemProps?.rules || {})
                "
              >
                <Render
                  :components="[item]"
                  v-on="{ updateModel }"
                  v-bind="item.props"
                  v-bind:value="
                    Array.isArray(item?.props?.fieldKey)
                      ? item?.props?.fieldKey.map((val) => formData[val])
                      : formData[item?.props?.fieldKey]
                  "
                ></Render>
              </el-form-item>
            </templte>
          </el-col>
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
import { omit } from 'lodash-es'
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
    const childRules = (childProps?.rules || []).map((rule) => {
      if (rule.validator) {
        rule.validator = (_rule: any, value: any, callback: any) => {
          // const fn = new Function('ctx', `return ${rule.validator}`).bind(
          //   null,
          //   { model: formData.value, rule: _rule, callback }
          // )
          const fn = new Function('ctx', `return ${rule.validator}`)
          return fn({ model: formData.value, rule: _rule, callback })
        }
      } else {
        return rule
      }
      return rule
    })

    if (childProps?.formItemProps?.prop && childRules?.length) {
      _rules[childProps?.formItemProps?.prop] = childRules
    }
  })
  console.log('rules :>', _rules)
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
    formData.value = omit(
      { ...formData.value, ...(data?.eventData || data || {}) },
      ['eventData', 'initEventData']
    )
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

const formatCustomValidator = (
  rules: Record<string, any> | Record<string, any>[]
) => {
  if (Array.isArray(rules)) {
    const formatRules = rules.map((rule) => {
      if (rule.validator) {
        if (typeof rule.validator === 'string') {
          return {
            ...rule,
            validator: (_rule: any, value: any, callback: any) => {
              const fn = new Function('ctx', `return ${rule.validator}`)
              return fn({ model: formData.value, rule: _rule, callback })
            }
          }
        } else {
          return rule
        }
      }
      return rules
    })
    return formatRules
  } else {
    if (rules.validator) {
      if (typeof rules.validator === 'string') {
        return {
          ...rules,
          validator: (_rule: any, value: any, callback: any) => {
            const fn = new Function('ctx', `return ${rules.validator}`)
            return fn({ model: formData.value, rule: _rule, callback })
          }
        }
      } else {
        return rules
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  padding-top: 22px;
}
</style>
