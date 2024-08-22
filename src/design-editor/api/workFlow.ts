import request from '@design/http'

const APPROVAL_API = '/approval-api'

/**
 * @description 获取组织架构树+员工
 */
export const getDepartStaff = (data = {}) =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getDepartStaff',
    data
  })

/**
 * @description 获取组织架构树
 */
export const getDepartTree = (data = {}) =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getDepartTree',
    data
  })

export const getFlowType = () =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getFlowType'
  })

export const getFlowScene = () =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getFlowScene'
  })

export const getDesignTemplateList = () =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getDesignTemplateList'
  })

// 新增流程
export interface NodeTarget {
  approvalType: string
  targetItem: string
  targetType: string
}

export interface FlowNode {
  nodeDesignFormId: string
  nodeName: string
  nodeTarget: NodeTarget[]
  nodeType: string
  approvalType?: string
  nodeId?: number | string
}

export interface SaveApprovalFlowParams<T = FlowNode[]> {
  flowDesc: string
  flowName: string
  flowNode: T
  flowScene: string
  flowType: string
  businessType: string
  id?: number
  sceneStatus?: string
  flowEvent?: any
}

export const saveApprovalFlow = (data: SaveApprovalFlowParams) =>
  request.post({
    url: APPROVAL_API + '/mp/flow/saveApprovalFlow',
    data
  })

export const getApprovalFlowDetail = (id: string | number) =>
  request.get<{ id: string | number }, SaveApprovalFlowParams>({
    url: APPROVAL_API + '/mp/flow/getApprovalFlowInfo',
    data: { id }
  })

export const getFLowRelationTarget = () =>
  request.get({ url: APPROVAL_API + '/mp/flow/getFLowRelationTarget' })

export const getBusinessType = () =>
  request.get({ url: APPROVAL_API + '/mp/flow/getBusinessType' })

export const getSceneState = (flowScene = '') =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getSceneState',
    data: { flowScene }
  })

export interface FlowListItem {
  id: number
  flowName: string
  flowScene: string
}

export const getFlowList = (businessType = '') =>
  request.get<any, FlowListItem[]>({
    url: APPROVAL_API + '/mp/flow/getFlowList',
    data: { businessType }
  })

export const saveProjectFlow = (data) =>
  request.post({ url: APPROVAL_API + '/mp/flow/saveProjectFlow', data })

export interface ProjectNode {
  flowScene: string
  nodeId: number
  nodeName: string
  nodeType: string
}

export interface ProjectFlowNode {
  children: ProjectFlowNode[]
  nodes: ProjectNode[]
}

export const getProjectFlowDetail = (id) =>
  request.get<
    { id: string | number },
    SaveApprovalFlowParams<ProjectFlowNode[]>
  >({
    url: APPROVAL_API + '/mp/flow/getProjectFlowInfo',
    data: { id }
  })

export const getFlowEvent = (data) =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getFlowEvent',
    data
  })
