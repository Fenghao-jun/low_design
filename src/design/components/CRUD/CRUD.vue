<template>
  <div>
    <ProTable v-bind="proTablePropsWrapper" />
  </div>
</template>

<script setup lang="ts">
import { ProTable } from 'am-admin-component'
import { computed, withDefaults } from 'vue'
import { CRUDProps } from './props'
import { useApi } from '@design/hooks/useApi'

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
</script>

<style scoped></style>
