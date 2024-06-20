import G6 from '@antv/g6'
import { startNode } from './start'
import { actionNode } from './action'
import { eventNode } from './event'

/**
 * 注册图节点
 * 该函数无参数也无返回值，它主要用于注册流程图中的三种节点类型：开始节点、动作节点和事件节点。
 * 使用G6图库提供的registerNode方法，将自定义的节点样式与类型进行绑定，以便在图中使用。
 */
export const registerNodes = () => {
  // 注册开始节点
  G6.registerNode('start', startNode, 'rect')
  // 注册动作节点
  G6.registerNode('action', actionNode, 'rect')
  // 注册事件节点
  G6.registerNode('event', eventNode, 'rect')
}
