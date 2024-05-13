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

import { checkArgs } from './common'

function getData(key: string) {
  return usePageDataStore().getData()[key]
}

function setData(key: string, value: any) {
  return usePageDataStore().setData(key, value)
}

function execScript(script: string, eventData: any, initEventData: any) {
  try {
    const func = new Function('ctx', `return ${script}`)

    const ctx = { setData, getComponentRef, getData, eventData, initEventData }
    return func(ctx)
  } catch (error) {
    console.log('error: ', error)
  }
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
      checkArgs(node, 'script')

      const { script } = node.actionConfig!.args
      console.log('script: ', script)
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
