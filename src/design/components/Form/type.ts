import { ElForm, ElRow } from 'element-plus'

type ElFormProps = Parameters<Exclude<(typeof ElForm)['setup'], undefined>>[0]
type ElRowProps = Parameters<Exclude<(typeof ElRow)['setup'], undefined>>[0]
export interface FormProps {
  children?: any[]
  /**
   * formProps的model字段是数据源， 内部字段需要对应children下的组件的fieldKey以及对应的formItemProps的prop字段
   * 否则可能回显和校验都会出问题
   */
  formProps?: Partial<ElFormProps>
  rowProps?: Partial<ElRowProps>
}
