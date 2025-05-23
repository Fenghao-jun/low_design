import {
  LinkAction,
  ConfirmAction,
  MessageAction,
  ComponentAction,
  RequestAction,
  CpoyAction,
  ScriptAction,
  ExportAction
} from '@core/actions'
import { RendererAction } from './Action'

/**
 * 事件注册中心类，集中管理不同事件的注册与检索过程，
 */

class ActionRegisterCenter {
  /**
   * 存储事件名称与事件实例之间的映射。
   */
  private static readonly _registerActionMap = new Map<string, RendererAction>()

  /**
   * 向注册中心注册事件。
   *
   * @param name - 事件的唯一标识名称。
   * @param action - 要注册的事件实例。
   */
  public static register(name: string, action: RendererAction): void {
    ActionRegisterCenter._registerActionMap.set(name, action)
  }

  /**
   * 根据事件名称检索事件实例。
   *
   * @param name - 事件的名称。
   * @returns - 对应名称的事件实例，若未找到则返回 `null`。
   */
  public getAction(name: string): RendererAction | null {
    return name
      ? ActionRegisterCenter._registerActionMap.get(name) || null
      : null
  }

  /**
   * 获取注册中心内所有事件的映射信息。
   *
   * @returns - 包含所有已注册事件的 `Map` 对象。
   */
  public static getRegisterActionInfo(): Map<string, RendererAction> {
    return ActionRegisterCenter._registerActionMap
  }
}

// 创建并初始化事件注册中心的单一实例。
const actionRegisterCenter = new ActionRegisterCenter()

ActionRegisterCenter.register('link', new LinkAction())
ActionRegisterCenter.register('confirm', new ConfirmAction())
ActionRegisterCenter.register('message', new MessageAction())
ActionRegisterCenter.register('component', new ComponentAction())
ActionRegisterCenter.register('request', new RequestAction())
ActionRegisterCenter.register('copy', new CpoyAction())
ActionRegisterCenter.register('script', new ScriptAction())
ActionRegisterCenter.register('export', new ExportAction())

// 导出该实例以便于全局访问和使用。
export default actionRegisterCenter
