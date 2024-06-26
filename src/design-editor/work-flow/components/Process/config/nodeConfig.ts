import { ROUTER, CONFIRM, CONDITION, START, APPROVER, NOTIFY } from './nodeType'

// 定义图标接口
export interface Icon {
  name: string // 图标名
  color: string // 颜色
}

// 定义默认节点结构接口
interface DefaultNode {
  nodeName: string // 节点名称
  nodeType: string // 节点类型
  config: AnyObject // 配置信息
  childNode?: any | null // 子节点，可选且可以是任意类型或null
  isLastCondition?: boolean // 是否为最后一个条件节点，仅在条件节点中出现，可选
  conditionNodes?: DefaultNode[]
}

// 定义基础节点配置接口
export interface BaseNodeConfig {
  title: string // 节点标题
  canAdd: boolean // 节点是否可以增加
  hasDrawer: boolean // 节点是否可以进行配置
  icon: Icon // 图标信息
  defaultNode?: DefaultNode // 默认节点结构
  bgColor?: string // 节点标题背景颜色，默认可以不提供
  canRemoved?: boolean // 节点是否能够移除，默认可以不提供
  color?: string // 节点标题颜色，默认可以不提供
  nodeConfig?: DefaultNode
}

// 定义最终的节点配置字典接口
interface NodeConfigDictionary {
  [key: string]: BaseNodeConfig
}

// 节点配置
// TODO：需求一期无抄送、条件、路由节点
export const nodeConfig: NodeConfigDictionary = {}

// 确认人节点配置
nodeConfig[CONFIRM] = {
  title: '确认人', // 节点标题
  color: '#FFFFFF', // 节点标题颜色
  bgColor: '#52C1F5', // 节点标题背景颜色
  canAdd: true, // 节点是否可以增加
  canRemoved: false, // 节点是否能够移除
  hasDrawer: true, // 节点是否可以进行配置
  icon: {
    // 图标
    name: 'router', // 图标名
    color: '#52C1F5' // 颜色
  },
  defaultNode: {
    // 默认节点结构，用于添加节点时
    nodeName: '确认人',
    nodeType: 'confirm',
    config: {},
    childNode: null
  }
}

// 路由节点配置
// nodeConfig[ROUTER] = {
//   title: '条件分支', // 节点标题
//   canAdd: true, // 节点是否可以增加
//   hasDrawer: false, // 节点是否可以进行配置
//   icon: {
//     // 图标
//     name: 'router', // 图标名
//     color: '#3CB371' // 颜色
//   },
//   defaultNode: {
//     // 默认节点结构，用于添加节点时
//     nodeName: '路由',
//     nodeType: 'router',
//     config: {},
//     childNode: null,
//     conditionNodes: [
//       {
//         nodeName: '条件',
//         nodeType: 'condition',
//         isLastCondition: false,
//         config: {},
//         childNode: null
//       }
//     ]
//   }
// }

// 条件节点配置
// nodeConfig[CONDITION] = {
//   title: '条件', // 节点标题
//   color: '#FFFFFF', // 节点标题颜色
//   bgColor: '#3CB371', // 节点标题背景颜色
//   canAdd: false, // 节点是否可以增加
//   canRemoved: true, // 节点是否能够移除
//   hasDrawer: true, // 节点是否可以进行配置
//   icon: {
//     // 图标
//     name: 'condition', // 图标名
//     color: '#3CB371' // 颜色
//   },
//   defaultNode: {
//     nodeName: '条件',
//     nodeType: 'condition',
//     isLastCondition: false,
//     config: {},
//     childNode: {}
//   }
// }

// 发起人节点配置
nodeConfig[START] = {
  title: '发起人', // 节点标题
  color: '#FFFFFF', // 节点标题颜色
  bgColor: '#3F9EFF', // 节点标题背景颜色
  canAdd: false, // 节点是否可以增加
  canRemoved: false, // 节点是否能够移除
  hasDrawer: true, // 节点是否可以进行配置
  icon: {
    // 图标
    name: 'start', // 图标名
    color: '#1e83e9' // 颜色
  },
  defaultNode: {
    // 默认节点结构，用于添加节点时
    nodeName: '发起人',
    nodeType: 'start',
    config: {},
    childNode: null
  }
}

// 审核人节点配置
nodeConfig[APPROVER] = {
  title: '审核人', // 节点标题
  color: '#FFFFFF', // 节点标题颜色
  bgColor: '#FE943E', // 节点标题背景颜色
  canAdd: true, // 节点是否可以增加
  canRemoved: false, // 节点是否能够移除
  hasDrawer: true, // 节点是否可以进行配置
  icon: {
    // 图标
    name: 'approver', // 图标名
    color: '#FF8C00' // 颜色
  },
  defaultNode: {
    // 默认节点结构，用于添加节点时
    nodeName: '审批人',
    nodeType: 'approver',
    config: {},
    childNode: null
  }
}

// 抄送人节点配置
// nodeConfig[NOTIFY] = {
//   title: '抄送人', // 节点标题
//   color: '#FFFFFF', // 节点标题颜色
//   bgColor: '#808000', // 节点标题背景颜色
//   canAdd: true, // 节点是否可以增加
//   canRemoved: true, // 节点是否能够移除
//   hasDrawer: true, // 节点是否可以进行配置
//   icon: {
//     // 图标
//     name: 'notify', // 图标名
//     color: '#808000' // 颜色
//   },
//   defaultNode: {
//     // 默认节点结构，用于添加节点时
//     nodeName: '抄送人',
//     nodeType: 'notify',
//     config: {},
//     childNode: null
//   }
// }
