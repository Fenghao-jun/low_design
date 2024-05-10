import { EventNode } from '@core/utils/event-flow'
import { ActionType } from '@core/utils/componentActionCenter/Action'
/**
 * 检查给定的事件节点是否包含指定模块的action配置参数。
 * @param node 一个事件节点，包含可能的动作配置。
 * @param module 指定的动作类型模块，用于检查actionConfig中是否包含必要的参数。
 * @throws 如果事件节点的动作配置中缺少参数，则抛出错误。
 */
export function checkArgs(node: EventNode, module: ActionType) {
  // 检查事件节点的动作配置中是否提供了必要的参数
  if (!node.actionConfig?.args) {
    console.error(`${module} actionConfig.args is required`)

    throw Error(`${module} actionConfig.args is required`)
  }
}
