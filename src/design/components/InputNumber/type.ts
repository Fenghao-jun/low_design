export interface CustomerInputNumberProps {
  /**
   * 输入框要回显的值
   * 会根据这个值来包一层进行双向绑定
   */
  value?: number
  /**
   * 如果是在表单中，那么这个值就是表单中的字段名
   */
  fieldKey?: string
}
