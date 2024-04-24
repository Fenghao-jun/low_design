/**
 * 组件引用映射，用于存储和管理组件的引用。
 */
const componentRefs = new Map<number,any>();

/**
 * 获取指定组件ID的组件引用。
 * @param componentId 组件的唯一标识符。
 * @returns 返回对应componentId的组件引用，如果不存在则返回undefined。
 */
export function getComponentRef(componentId: number) {
  return componentRefs.get(componentId);
}

/**
 * 设置指定组件ID的组件引用。
 * @param componentId 组件的唯一标识符。
 * @param componentRef 组件的引用。
 * @returns 返回Map对象本身，以支持链式调用。
 */
export function setComponentRef(componentId: number, componentRef: any) {
  return componentRefs.set(componentId, componentRef);
}

/**
 * 清除所有组件的引用。
 */
export function clearComponentRef() {
  componentRefs.clear();
}