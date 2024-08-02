export const typeEnum = {
  vertical:1,
  horizontal:2
}

// cs-web-mall page.json 数据中获取对应路径
export const homeOption = [
  {
    label: '商城',
    value: 'pages/index/index',
  },
  {
    label: '点餐',
    value: 'pages/dish/index',
  }, 
  {
    label: '装修首页',
    value: 'pages/custom/index',
    disabled: false
  }
]

export const otherOption = [
  {
    label: '商城',
    value: 'pages/index/index',
  },
  {
    label: '点餐',
    value: 'pages/dish/index',
  }, 
  {
    label: '购物车',
    value: 'pages/product/noTabBarCart/index',
  }, 
  {
    label: '订单',
    value: 'pages/order/index',
  }, 
  {
    label: '个人中心',
    value: 'pages/mine/index',
  }, 
]