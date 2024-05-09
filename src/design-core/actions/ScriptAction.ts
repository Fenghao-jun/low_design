// 动态函数
import { usePageDataStore } from '@core/store/page-data'
import { getComponentRef } from '@core/utils/component-ref'
import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import {
  EventNode,
  excelEventFlow,
  findStatusNode
} from '@core/utils/event-flow'

function getData(key: string) {
  return usePageDataStore().getData()[key]
}

function setData(key: string, value: any) {
  return usePageDataStore().setData(key, value)
}

function execScript(script: string, eventData: any, initEventData: any) {
  const func = new Function('ctx', `return ${script}`)

  const ctx = { setData, getComponentRef, getData, eventData, initEventData }
  return func(ctx)
}

export interface IScriptAction extends ListenerAction {
  actionType: 'script'

  args: {
    script: string
  }
}

export class ScriptAction implements RendererAction {
  async run(node: EventNode<IScriptAction>, eventData, initEventData) {
    try {
      if (!node.actionConfig) {
        console.error('ScriptAction 缺少actionConfig')
        return
      }
      const { script } = node.actionConfig.args
      const res = await execScript(script, eventData, initEventData)

      excelEventFlow(findStatusNode(node.children), res, initEventData)
    } catch (error) {
      excelEventFlow(
        findStatusNode(node.children, 'error'),
        null,
        initEventData
      )
    }
  }
}
