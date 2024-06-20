import { reactive } from 'vue'

// import { reactive } from 'vue';

export class Validator {
  nodeRules = new Map<string, any>()
  results = reactive(new Map<string, any>())

  /**
   * 注册节点验证规则
   * @param nodeId 节点ID
   * @param validatorFun 验证函数
   */
  register(nodeId: string, validatorFun: any): void {
    if (validatorFun instanceof Function) {
      this.nodeRules.set(nodeId, validatorFun)
    }
  }

  /**
   * 移除节点验证规则
   * @param nodeId 节点ID
   */
  remove(nodeId: string): void {
    this.nodeRules.delete(nodeId)
    this.results.delete(nodeId)
  }

  /**
   * 验证节点
   * @returns 包含验证结果（valid, messages）的对象
   */
  validate(): { valid: boolean; messages: string[] } {
    let valid = true
    const messages: string[] = []
    this.nodeRules.forEach((value, key) => {
      const fun = value
      if (fun instanceof Function) {
        const result = fun()
        if (!result.valid) {
          valid = false
          this.results.set(key, result)
          messages.push(result.message)
        } else {
          this.results.delete(key)
        }
      }
    })
    return { valid, messages }
  }

  /**
   * 获取指定节点的结果
   * @param nodeId 节点ID
   * @returns 节点的验证结果
   */
  getResult(nodeId: string): any | undefined {
    return this.results.get(nodeId)
  }
}

// 使用示例：
// const myValidator = new Validator();
// myValidator.register('node1', () => ({ valid: true, message: '' }));
// const validationResult = myValidator.validate();

export const createValidator = () => {
  const validator = new Validator()

  return validator
}
