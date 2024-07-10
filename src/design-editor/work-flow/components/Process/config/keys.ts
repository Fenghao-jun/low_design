import { InjectionKey } from 'vue'

// 节点验证器KEY
export const KEY_VALIDATOR = 'validator'

// 流程数据KEY
export const KEY_PROCESS_DATA = 'processData'

// 工作流类型
export const KET_TYPE = Symbol('KEY_TYPE') as InjectionKey<string>
