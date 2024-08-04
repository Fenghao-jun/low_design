export const typeEnum = {
  vertical: 1,
  horizontal: 2
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

export function hasDuplicateText(tarbarList) {
  const textSet = new Set(); // 创建一个新的Set对象用于存储text值
  for (const item of tarbarList) {
    if (textSet.has(item.text)) {
      return true;
    }
    textSet.add(item.text);
  }
  return false;
}



export interface dataType {
  index: number;
  key: string;
  localImage: selectType;
  customImage: selectType;
}


export interface selectType {
  unSelectList: imageType[];
  selectList: imageType[]
}

interface imageType {
  url: string;
  fileName: string;
}