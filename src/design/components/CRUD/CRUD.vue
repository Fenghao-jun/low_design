<template>
  <div>
    <ProTable
      v-bind="proTablePropsWrapper"
      :columns="columns"
      ref="tableRef"
      @sortChange="handleTableSortChange"
    >
      <!-- 操作列 -->
      <template #operation="scope">
        <template v-for="(item, index) in operations" :key="index">
          <ElButton
            v-if="handleOperationItemHidden(item, scope.row)"
            text
            type="primary"
            @click="handleActionClick(item, scope.row)"
          >
            {{ item.text }}
          </ElButton>
          <!-- <RootRender :components="headerSlot" /> -->
        </template>
      </template>

      <template #tableHeader>
        <RootRender :components="headerSlot" />
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ProTable } from 'am-admin-component'
import { computed, withDefaults, defineExpose, ref, watch } from 'vue'
import { CRUDProps, RowOperation } from './props'
import { useApi } from '@design/hooks/useApi'
import actionRegisterCenter from '@/design-core/utils/componentActionCenter/action-regiter'
import RootRender from '@/design-core/render/RootRender/RootRender.vue'
import { excelEventFlow } from '@/design-core/utils/event-flow'
import { ElMessage } from 'element-plus'
import { evaluate } from 'amis-formula'
import { get } from 'lodash-es'
import { usePageDataStore } from '@/design-core/store/page-data'
import { useTableEnum } from '@/design/hooks/useTableEnum'

const props = withDefaults(defineProps<CRUDProps>(), {
  columns: () => [],
  requestAuto: true,
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  rowKey: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  defaultExpandAll: false,
  field: 'data',
  headerSlot: () => []
})

const sortField = ref({ field: '', order: 'asc' })

const store = usePageDataStore()

const tableRef = ref<InstanceType<typeof ProTable>>()

const handleTableSortChange = (data: {
  column: any
  prop: string
  order: any
}) => {
  if (data.order) {
    sortField.value = {
      field: data.prop,
      order: data.order === 'descending' ? 'DESC' : 'ASC'
    }
  } else {
    sortField.value = {
      field: '',
      order: ''
    }
  }

  tableRef.value?.search()
}

const apiRequest = async (params) => {
  console.log('params: ', params)
  if (!props.api) {
    console.warn('请传入api')
  }
  const { requestAction } = useApi(props.api)

  let otherParams = {}

  // 处理Scheme额外参数
  if (props.api.params) {
    const mergeData = {
      pageData: store.getData()
    }
    otherParams = props.api.params.reduce((prev, cur) => {
      if (cur.formula) {
        // 执行公式
        prev[cur.key] = evaluate(cur.formula, mergeData)
        return prev
      }
      prev[cur.key] = get(mergeData, cur.value)
      return prev
    }, {})
  }

  // 处理表格排序
  return requestAction({
    url: props.api.url,
    data: {
      ...params,
      ...otherParams,
      sort: sortField.value.field ? sortField.value : {}
    }
  })
}

const proTablePropsWrapper = computed(() => {
  return {
    ...props,
    requestApi: apiRequest
  }
})

const proTableKey = ref(0)

const tableSeachParams = computed(() => tableRef.value?.searchParam)

const pageData = computed(() => {
  return store.pageData
})

const mergeData = computed(() => {
  return {
    pageData: pageData.value,
    eventData: tableSeachParams.value
  }
})

const { enumProp } = useTableEnum(props.columns, mergeData as any)

const columns = computed(() => {
  const list = props.columns.map((item) => {
    if (item.api) {
      item.enum = enumProp.value[item.prop!]
    }

    // return {
    //   ...item
    // }
    // TODO component包中直接使用对象作为key，这里不能进行任何拷贝
    return item
  })

  if (props.operations) {
    list.push({
      prop: 'operation',
      fixed: 'right',
      label: '操作',
      width: props.operationColumnWidth || 250
    })
  }

  console.log('list: ', list)

  return list
})

const handleActionClick = (operation: RowOperation, rowData: any) => {
  operation.events && excelEventFlow(operation.events, rowData, rowData)
}

const getSelectedRow = () => {
  const selectRow = tableRef.value?.selectedList

  if (!selectRow?.length) {
    ElMessage.warning('请选择要操作的行')
    throw Error('请选择要操作的行')
  }
  return selectRow
}

const handleOperationItemHidden = (
  item: RowOperation,
  row: Record<string, any>
) => {
  if (!item.hidden) {
    return true
  }

  if (item.hidden?.type === 'formula') {
    return item.hidden.formula ? evaluate(item.hidden.formula, row) : true
  } else if (item.hidden.type === 'variable') {
    return store.pageData[item.hidden.value]
  } else {
    return !!item.hidden.value
  }
}

const clearSelectedRow = () => {
  return tableRef.value?.clearSelection()
}

const search = () => {
  proTableKey.value = proTableKey.value + 1
  tableRef.value?.search()
}

const getSearchData = () => {
  const params = {
    sort: sortField.value.field ? sortField.value : {},
    ...(tableRef.value?.searchParam || {})
  }
  return params
}

defineExpose({
  // 获取当前选中的行
  getSelectedRow,
  // 清空选中
  clearSelectedRow,
  // 搜索
  search,
  // 获取搜索参数
  getSearchData
})
</script>

<style scoped></style>
