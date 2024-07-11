import {
  SaveApprovalFlowParams,
  FlowListItem
} from '@/design-editor/api/workFlow'
import { InjectionKey, Ref } from 'vue'

// 表单数据
export const PROJECT_DATA_KEY = Symbol('PROJECT_DATA_KEY') as InjectionKey<
  Ref<Omit<SaveApprovalFlowParams, 'flowNode'>>
>

// 当前已选择的总的数据
export const TOTAL_SELECTED_FLOW_KEY = Symbol(
  'TOTAL_SELECTED_FLOW_KEY'
) as InjectionKey<{
  totalSelectedFlow: Ref<string[]>
  setSelectedFlow: (flowId: number | string, oFlowId: number | string) => void
}>

// 选项
export const FLOW_LIST_KEY = Symbol('FLOW_LIST_KEY') as InjectionKey<
  Ref<FlowListItem[]>
>
