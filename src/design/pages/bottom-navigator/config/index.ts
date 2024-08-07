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
    value: 'pages/diy/index',
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
    value: 'pages/cart/index',
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


interface imageType {
  url: string;
  fileName: string;
}
export interface selectType {
  unSelectList: imageType[];
  selectList: imageType[]
}

export interface dataType {
  index: number;
  key: string;
  localImage: selectType;
  customImage: selectType;
}

export const localImageList = [
  {
    iconPath: require('@/assets/images/icon/shouyeweixuanzhong.png'),
    selectedIconPath: require('@/assets/images/icon/shouyexuanzhong.png'),
    text: '首页'
  },
  {
    iconPath: require('@/assets/images/icon/diancanweixuanzhong.png'),
    selectedIconPath: require('@/assets/images/icon/diancanxuanzhong.png'),
    text: '点餐'
  },
  {
    iconPath: require('@/assets/images/icon/shangchengweixuanzhong.png'),
    selectedIconPath: require('@/assets/images/icon/shangchengxuanzhong.png'),
    text: '商城'
  },
  {
    iconPath: require('@/assets/images/icon/gouwucheweixuanzhong.png'),
    selectedIconPath: require('@/assets/images/icon/gouwuchexuanzhong.png'),
    text: '购物车'
  },
  {
    iconPath: require('@/assets/images/icon/wodeweixuanzhong.png'),
    selectedIconPath: require('@/assets/images/icon/wodexuanzhong.png'),
    text: '个人中心'
  },
  {
    iconPath: require('@/assets/images/icon/dingdanweixuanzhong.png'),
    selectedIconPath: require('@/assets/images/icon/dingdanxuanzhong.png'),
    text: '订单中心'
  },
]