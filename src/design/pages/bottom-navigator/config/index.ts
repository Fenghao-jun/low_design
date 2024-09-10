import { nextTick } from 'vue'

export const typeEnum = {
  vertical: 1,
  horizontal: 2
}

// cs-web-mall page.json 数据中获取对应路径
export const homeOption = [
  {
    label: '商城',
    value: 'pages/index/index'
  },
  {
    label: '点餐',
    value: 'pages/dish/index'
  },
  {
    label: '装修首页',
    value: 'pages/diy/index',
    disabled: false
  }
]

export const otherOption = [
  {
    label: '商城',
    value: 'pages/index/index'
  },
  {
    label: '点餐',
    value: 'pages/dish/index'
  },
  {
    label: '购物车',
    value: 'pages/cart/index'
  },
  {
    label: '订单',
    value: 'pages/order/index'
  },
  {
    label: '个人中心',
    value: 'pages/mine/index'
  }
]

export function hasDuplicateText(tarbarList) {
  const textSet = new Set() // 创建一个新的Set对象用于存储text值
  for (const item of tarbarList) {
    if (textSet.has(item.text)) {
      return true
    }
    textSet.add(item.text)
  }
  return false
}

interface imageType {
  url: string
  fileName: string
}
export interface selectType {
  unSelectList: imageType[]
  selectList: imageType[]
}

export interface dataType {
  index: number
  key: string
  localImage: {
    iconPath: string
    selectedIconPath: string
  }
  customImage: selectType
}

export const localImageList = [
  {
    iconPath: 'icon-shouyeweixuanzhong',
    selectedIconPath: 'icon-shouyexuanzhong',
    text: '首页'
  },
  {
    iconPath: 'icon-diancanweixuanzhong',
    selectedIconPath: 'icon-diancanxuanzhong',
    text: '点餐'
  },
  {
    iconPath: 'icon-shangchengweixuanzhong',
    selectedIconPath: 'icon-shangchengxuanzhong',
    text: '商城'
  },
  {
    iconPath: 'icon-gouwucheweixuanzhong',
    selectedIconPath: 'icon-gouwuchexuanzhong',
    text: '购物车'
  },
  {
    iconPath: 'icon-wodeweixuanzhong',
    selectedIconPath: 'icon-wodexuanzhong',
    text: '个人中心'
  },
  {
    iconPath: 'icon-dingdanweixuanzhong',
    selectedIconPath: 'icon-dingdanxuanzhong',
    text: '订单中心'
  }
]

export function containsIconPathOrSelectedIconPath(str) {
  return localImageList.some(
    (item) => item.iconPath.includes(str) || item.selectedIconPath.includes(str)
  )
}

// 计算 scroll 的高度
export function calculateHeight(scrollHeight) {
  nextTick(() => {
    const clientHeight = document.documentElement.clientHeight
    if (window.__POWERED_BY_QIANKUN__) {
      scrollHeight.value = clientHeight - 184
    } else {
      scrollHeight.value = clientHeight - 68
    }
  })
}
