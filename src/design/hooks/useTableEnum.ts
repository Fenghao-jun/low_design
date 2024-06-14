import { evaluate } from 'amis-formula'
import { get } from 'lodash-es'
import { computed, Ref, ref, unref } from 'vue'
import { ColumnsProps, CRUDProps } from '../components/CRUD/props'
import { useApi } from './useApi'
import { watchThrottled } from '@vueuse/core'
import { ProTable } from 'am-admin-component'

export interface ITableEnumParams {
  pageData: Record<string, any>
  eventData: Record<string, any>
}

/**
 * 判断两个对象是否完全相等。
 *
 * @param {Object} obj1 第一个对象。
 * @param {Object} obj2 第二个对象。
 * @return {boolean} 如果两个对象完全相等返回true，否则返回false。
 */

function areObjectsEqual(obj1, obj2) {
  // 检查对象是否为null或非对象类型
  if (
    obj1 === null ||
    typeof obj1 !== 'object' ||
    obj2 === null ||
    typeof obj2 !== 'object'
  ) {
    return obj1 === obj2
  }

  // 获取对象的键并排序，以便顺序无关地比较
  const keys1 = Object.keys(obj1).sort()
  const keys2 = Object.keys(obj2).sort()

  // 如果键的数量不同，则对象不相等
  if (keys1.length !== keys2.length) {
    return false
  }

  // 遍历键，比较每个键对应的值
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i]
    if (key !== keys2[i] || !areObjectsEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  // 所有检查通过，对象相等
  return true
}

const _requestQueueFn = async (
  item: ColumnsProps,
  data: Record<string, any>
) => {
  if (!item.api) return
  const { requestAction } = useApi(item.api)

  const res = await requestAction({
    url: item.api.url,
    data: data
  })

  const deep = (value: any) => {
    value.value = value[item.fieldNames?.value || 'value']
    value.label = value[item.fieldNames?.label || 'label']

    if (value.child?.length) {
      value.child.forEach(deep)
    }
  }

  res.data?.forEach(deep)

  return {
    data: res.data
  }
}

const getRequestParams = (
  item: ColumnsProps,
  mergeData: Record<string, any>
) => {
  let otherParams = {}
  if (item?.api?.params) {
    otherParams = item.api.params.reduce((prev, cur) => {
      if (cur.formula) {
        // 执行公式
        prev[cur.key] = evaluate(cur.formula, mergeData)
        return prev
      }
      prev[cur.key] = get(mergeData, cur.value)
      return prev
    }, {})
  }

  return otherParams
}

/**
 * @description 处理CRUD组件搜索区域的枚举值，监听依赖参数变化进行枚举值刷新和联动
 * @param tableColumns 表格列
 * @param params
 * @param tableRef
 * @returns
 */
export const useTableEnum = (
  tableColumns: CRUDProps['columns'],
  params: Ref<ITableEnumParams>,
  tableRef: Ref<InstanceType<typeof ProTable>>
) => {
  // 需要api的列
  const _apiColumns = tableColumns.filter((item) => item.api)

  // 每个列的参数
  const _apiParams = {}

  // 存储枚举值
  const enumProp = ref<Record<string, any[]>>({})

  const paramsWrapper = computed(() => {
    const key = Object.keys(params.value)

    return key.reduce((prev, cur) => {
      prev[cur] = unref(params.value[cur])
      return prev
    }, {})
  })

  /**
   * 构建枚举队列。
   *
   * 该函数通过遍历_apiColumns数组，为每个列项生成一个队列项，队列项包含列的属性和一个可能的请求函数。
   * 如果当前列项的参数与之前的参数不相同，会为该列项生成一个请求函数，并更新参数。
   * 最后，返回包含所有队列项的数组。
   *
   * @returns {Array} 返回包含每个列项属性和相关请求函数（如果存在）的数组。
   */
  const buildEnumQueue = () => {
    // 遍历_apiColumns数组，生成队列项
    const enumQueue = _apiColumns.map((item) => {
      // 初始化队列项，包含属性和空的函数引用
      const queueItem = {
        prop: item.prop,
        fn: null as any
      }

      // 获取当前列项的请求参数
      const params = getRequestParams(item, paramsWrapper.value)

      // 获取之前该列项的参数，如果不存在则为空对象
      const oldParams = _apiParams[item.prop!] || {}

      // 判断当前参数与之前参数是否相同
      const isSameParams = areObjectsEqual(params, oldParams)
      // console.log('isSameParams: ', isSameParams, item.prop, params, oldParams)

      // 如果参数不同或者prop中没值，生成请求函数
      if (!isSameParams || !enumProp.value[item.prop!]) {
        queueItem.fn = _requestQueueFn(item, params)
      }

      // if(!){}

      // 更新_apiParams中的参数
      _apiParams[item.prop!] = params

      return queueItem
    })

    // 返回生成的枚举队列
    return enumQueue.filter((item) => item.fn)
  }

  const executeEnumQueue = async () => {
    if (_apiColumns.length === 0) {
      return
    }
    const enumQueue = buildEnumQueue()

    if (enumQueue.length === 0) {
      return
    }

    const res = await Promise.allSettled(enumQueue.map((item) => item.fn))
    // console.log('tableEnums队列请求结果: ', res)

    const fields: string[] = []
    res.forEach((element, index) => {
      if (element.status === 'fulfilled') {
        const prop = enumQueue[index].prop || ''
        const currentColumns = tableColumns.find((item) => item.prop === prop)

        // 枚举里面有值，代表不是初次请求
        if (enumProp.value[prop]) {
          // 那些搜索的key枚举值是有变化的
          fields.push(currentColumns?.search?.key || '')
        }

        enumProp.value[prop] = element.value.data
      }
    })

    if (fields.length > 0) {
      // 更新search表单的字段，以防残留
      tableRef.value.updatedSearch(fields)
    }
  }

  watchThrottled(
    params,
    () => {
      // console.log('nvalue: ', nvalue)
      executeEnumQueue()
    },
    { throttle: 500, deep: true }
  )

  return {
    buildEnumQueue,
    executeEnumQueue,
    enumProp
  }
}
