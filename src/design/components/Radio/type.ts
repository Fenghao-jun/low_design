import type {
  RadioProps,
  RadioButtonProps,
  RadioGroupProps
} from 'element-plus'

type EnumsItem = {
  label: string
  value: string
  props?: RadioButtonProps | RadioProps
}

export type RadioAttrs = RadioGroupProps & {
  fieldKey?: string
  value?: string
  /**
   * 被用于表单组件时传递给上层的 el-form-item的 props
   * 参考 element-plus 的 el-form-item  props
   * 需要校验时 props 下的 prop 字段要与 fieldKey 字段对应
   */
  fromItemProps?: Record<string, any>
  /**
   * 被用于表单组件时传递给上层的 el-form 的 rules
   * 参考 element-plus 的 el-form 的规则校验部分
   *
   */
  rules?: Record<string, any>[]
  enums: EnumsItem[]
}
