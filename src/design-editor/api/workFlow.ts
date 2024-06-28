import request from '@design/http'

const APPROVAL_API = '/approval-api'

/**
 * @description 获取组织架构树+员工
 */
export const getDepartStaff = (data = {}) =>
  request.post({
    url: APPROVAL_API + '/mp/flow/getDepartStaff',
    data
  })

/**
 * @description 获取组织架构树
 */
export const getDepartTree = (data = {}) =>
  request.post({
    url: APPROVAL_API + '/mp/flow/getDepartTree',
    data
  })
