import { Variable } from '@core/types'
import { evaluate } from 'amis-formula'
import { execScript } from '@core/actions/ScriptAction'
import { usePageDataStore } from '@core/store/page-data'

type ParamsType = 'static' | 'formula' | 'sciprt' | 'variable'

export interface ParamsScheme extends Variable {
  /**
   * 声明参数用什么类型来处理
   */
  type: ParamsType
  /**
   * 用于辅助处理type
   */
  value: string
}

const store = usePageDataStore()

/**
 * 将参数方案转换为变量值对象。
 * @param params 参数方案数组，每个参数包含名称、类型、值或相关处理方式。
 * @param data 用于数据计算或脚本执行的输入数据。
 * @returns 返回一个对象，键为参数名称，值根据参数类型不同而有所变化（静态值、公式计算结果、脚本执行结果或变量值）。
 */
export const paramsSchemeToVariable = (params: ParamsScheme[], data: any) => {
  // 使用reduce方法遍历参数方案数组，构建一个包含所有参数值的对象
  return params.reduce((prev, current) => {
    // 根据参数类型不同，赋值给prev对象不同的值
    switch (current.type) {
      case 'static':
        // 静态参数，直接使用给定的值或默认值
        prev[current.name] = current.value || current.defaultValue
        break
      case 'formula':
        // 公式参数，使用给定的公式对data进行计算得到结果
        prev[current.name] = evaluate(current.value, {
          ...data,
          pageData: store.pageData
        })
        break
      case 'sciprt':
        // 脚本参数，执行给定的脚本，并传入data和data作为参数，返回执行结果
        prev[current.name] = execScript(current.value, data, data)
        break
      case 'variable':
        // 变量参数，从store.pageData中获取对应的变量值
        prev[current.name] = store.pageData[current.value]
        break
    }

    // 返回更新后的prev对象
    return {
      ...prev
    }
  }, {})
}
