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

export interface SaveApprovalFlowParams {
  flowDesc: string
  flowName: string
  flowNode: FlowNode[]
  flowScene: string
  flowType: string
  businessType: string
  id?: number
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

export interface FlowListItem {
  id: number
  flowName: string
  flowScene: string
}

export const getFlowList = (businessType: string) =>
  request.get<any, FlowListItem[]>({
    url: APPROVAL_API + '/mp/flow/getFlowList',
    data: { businessType }
  })
