import type {
  CheckboxGroupProps,
  CheckboxProps,
  CheckboxGroupValueType
} from 'element-plus'
import { ApiConfig } from '@/design-core/types'

export type CheckboxAttrs = CheckboxGroupProps & {
  /**
   * 值
   * 组件会利用该值来做一个ref包裹v-model值
   */
  value?: CheckboxGroupValueType
  /**
   * 如果是表单组件上调用该组件，此值必传
   * 更新值后通过emits事件通知表单组件更新对应的值
   */
  fieldKey?: string
  /**
   * el-form-item 支持的prop
   * @example 需要的校验的时候可以传递 { prop: 'xxx' }
   */
  formItemProps: Record<string, any>
  /**
   * el-form 支持的校验规则
   * 如果处于表单组件下的时候，需要校验时候需要传入
   */
  rules: Record<string, any>[]
  /**
   * 对Select组件下Option组件的配置
   */
  optionProps: {
    /**
     * 告诉Option组件，label是使用对象的哪个字段来渲染的 默认是使用 label
     */
    labelKey?: string
    /**
     * 告诉Option组件，value是使用对象的哪个字段来渲染的 默认是使用 value
     */
    valueKey?: string
  }
  /**
   * 选择项列表的接口获取配置
   */
  api: ApiConfig
  /**
   * 选择项的列表数据
   * ⚠️ 此值的 优先级 高于 api获取的数据
   */
  enums: CheckboxProps[] & Record<string, any>[]
}
