<template>
  <div>
    <ProTable v-bind="proTablePropsWrapper" :columns="columns">
      <template #operation="scope">
        <!-- {{ scope.row }} -->

        <template v-for="(value, key) in operations" :key="key">
          <ElButton
            text
            type="primary"
            @click="handleActionClick(value, scope.row)"
          >
            {{ value.text }}</ElButton
          >
        </template>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ProTable } from 'am-admin-component'
import { computed, withDefaults } from 'vue'
import { CRUDProps, RowOperation } from './props'
import { useApi } from '@design/hooks/useApi'
import actionRegisterCenter from '@/design-core/utils/componentActionCenter/action-regiter'

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
  field: 'data'
})

const apiRequest = async (params) => {
  console.log('params: ', params)
  if (!props.api) {
    console.warn('请传入api')
  }
  const { requestAction } = useApi(props.api)

  return requestAction({
    url: props.api.url,
    data: params
  })
}

const proTablePropsWrapper = computed(() => {
  return {
    ...props,
    requestApi: apiRequest
  }
})

const columns = computed(() => {
  const list = props.columns

  if (props.operations) {
    list.push({
      prop: 'operation',
      fixed: 'right',
      label: '操作',
      width: 250
    })
  }

  return list
})

const handleActionClick = (action: RowOperation, rowData: any) => {
  const actionInstance = actionRegisterCenter.getAction(action.actionType)

  if (!actionInstance) {
    console.warn('未注册该action:', action.actionType)
    return
  }
  actionInstance.run(action, {}, rowData)
}
</script>

<style scoped></style>
