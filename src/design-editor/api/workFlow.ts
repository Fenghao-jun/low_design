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
