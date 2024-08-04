import request from '@design/http'

const DIY_API = '/diy-api'


// 获取标签配置
export const getTabbarConfig = () =>
  request.get({
    url: DIY_API + '/admin/tabbar/getTabbarConfig',
  })

// 查询是否存在首页装修页
export const checkSetIndexPage = () =>
  request.get({
    url: DIY_API + '/admin/tabbar/checkSetIndexPage',
  })

export interface saveType {
  config: string
}

// 保存标签配置
export const saveTabbarConfig = (data: saveType) =>
  request.post({ url: DIY_API + '/admin/tabbar/saveTabbarConfig', data })