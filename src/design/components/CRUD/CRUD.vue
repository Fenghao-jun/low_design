<template>
  <div>
    <ProTable v-bind="props" :request-api="apiRequest" />
  </div>
</template>

<script setup lang="ts">
import { ProTable } from 'am-admin-component'
import { withDefaults } from 'vue'
import { CRUDProps } from './props'
import request from '@design/http'

const props = withDefaults(defineProps<CRUDProps>(), {})

const apiRequest = async (params) => {
  const { url, method } = props.api

  return request[method]({ url, params: params })
}
</script>

<style scoped></style>
