import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'

import { evaluate } from 'amis-formula'
import actionRegisterCenter from '../utils/componentActionCenter/action-regiter'

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
      const url = evaluate('/hhhhh/dddd/${bbb.aaa}', { bbb: { aaa: '123' } })
      console.log('url: ', url)
    } else {
      console.error('actionType 不存在')
    }
  }
}
