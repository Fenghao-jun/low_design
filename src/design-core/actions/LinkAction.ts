import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'

import { evaluate } from 'amis-formula'

// 跳转动作
interface ILinkAction extends ListenerAction {
  actionType: 'link'

  args: {
    url?: string
  }
}

export class LinkAction implements RendererAction {
  async run(action: ILinkAction, render, eventData) {
    if (action.actionType === 'link') {
      // TODO 根据公式和事件参数提取url
      if (!action.args.url) {
        console.error('LinkAction缺少url')
        return
      }
      const url = evaluate(action.args.url, { ...eventData })
      console.log('url: ', url)
    } else {
      console.error('actionType 不存在')
    }
  }
}
