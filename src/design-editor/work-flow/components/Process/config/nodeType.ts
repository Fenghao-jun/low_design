// 路由
export const ROUTER = 'router'
// 条件
export const CONDITION = 'condition'
// 发起人
export const START = 'start'
// 审核人
export const APPROVER = 'approver'
// 抄送人
export const NOTIFY = 'notify'
// 确认人
export const CONFIRM = 'confirm'
// 功能
export const FEATURE = 'feature'
// 功能路由
export const FEATURE_ROUTER = 'featureRouter'

export type flowType = 'feature' | 'project'

export const nodeTypeMap: Record<flowType, string[]> = {
  feature: [START, APPROVER, CONFIRM],
  project: [
    ROUTER,
    CONDITION,
    START,
    APPROVER,
    NOTIFY,
    CONFIRM,
    FEATURE,
    FEATURE_ROUTER
  ]
}
