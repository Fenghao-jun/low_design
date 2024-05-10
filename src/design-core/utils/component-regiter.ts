import {
  Button,
  CRUD,
  RemoteComponent,
  Form,
  Input,
  InputNumber,
  Select,
  Title,
  DatePicker,
  Cascader,
  Text,
  Radio
} from '@design/components'
/**
 * 组件注册中心类，用于管理组件的注册与引用。
 */
export class ComponentRegisterCenter {
  // 组件注册映射表，存储组件名称与组件实例的映射关系
  public static _registerComponentMap = new Map<string, any>()

  /**
   * 注册组件到组件注册中心。
   * @param name 组件名称。
   * @param component 组件实例。
   */
  public static register(name: string, component: any) {
    this._registerComponentMap.set(name, component)
  }

  /**
   * 根据名称获取组件实例。
   * @param name 组件名称。
   * @returns 返回对应名称的组件实例，如果未找到则返回null。
   */
  public getComponent(name) {
    if (name) {
      return ComponentRegisterCenter._registerComponentMap.get(name) || null
    }
    return null
  }

  /**
   * 获取所有已注册组件的信息。
   * @returns 返回组件注册映射表。
   */
  public static getRegisterComInfo() {
    return ComponentRegisterCenter._registerComponentMap
  }
}

// 组件注册中心实例
const componentRegister = new ComponentRegisterCenter()

ComponentRegisterCenter.register('Button', Button)
ComponentRegisterCenter.register('CRUD', CRUD)
ComponentRegisterCenter.register('RemoteComponent', RemoteComponent)
ComponentRegisterCenter.register('Form', Form)
ComponentRegisterCenter.register('Input', Input)
ComponentRegisterCenter.register('InputNumber', InputNumber)
ComponentRegisterCenter.register('Select', Select)
ComponentRegisterCenter.register('Title', Title)
ComponentRegisterCenter.register('DatePicker', DatePicker)
ComponentRegisterCenter.register('Cascader', Cascader)
ComponentRegisterCenter.register('Text', Text)
ComponentRegisterCenter.register('Radio', Radio)
// 导出组件注册中心实例
export default componentRegister
