import request from '@design/http'

const APPROVAL_API = '/approval-api'

/**
 * @description 获取组织架构树+员工
 */
export const getDepartStaff = (data = {}) =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getDepartStaff',
    data
  } as any)

/**
 * @description 获取组织架构树
 */
export const getDepartTree = (data = {}) =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getDepartTree',
    data
  } as any)

export const getFlowType = () =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getFlowType'
  } as any)

export const getFlowScene = () =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getFlowScene'
  } as any)

export const getDesignTemplateList = () =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getDesignTemplateList'
  } as any)

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
  } as any)

export const getApprovalFlowDetail = (id: string | number) =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getApprovalFlowInfo',
    data: { id }
  } as any)

export const getFLowRelationTarget = () =>
  request.get({ url: APPROVAL_API + '/mp/flow/getFLowRelationTarget' } as any)

export const getBusinessType = () =>
  request.get({ url: APPROVAL_API + '/mp/flow/getBusinessType' } as any)

export const getSceneState = (flowScene = '') =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getSceneState',
    data: { flowScene }
  } as any)

export interface FlowListItem {
  id: number
  flowName: string
  flowScene: string
}

export const getFlowList = (businessType = '') =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getFlowList',
    data: { businessType }
  } as any)

export const saveProjectFlow = (data) =>
  request.post({ url: APPROVAL_API + '/mp/flow/saveProjectFlow', data } as any)

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
  request.get({
    url: APPROVAL_API + '/mp/flow/getProjectFlowInfo',
    data: { id }
  } as any)

export const getFlowEvent = (data) =>
  request.get({
    url: APPROVAL_API + '/mp/flow/getFlowEvent',
    data
  } as any)
