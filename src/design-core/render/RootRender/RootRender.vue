<template>
  <div>
    <component
      v-for="component in mock"
      :key="component.componentId"
      :_id="component.componentId"
      :_name="component.name"
      :is="componentRegister.getComponent(component.key)"
      :ref="(el) => setComponentRef(component.componentId, el)"
      v-bind="component.props"
    >
      <template
        v-if="
          Array.isArray(component.children) && component.children.length > 0
        "
      >
        <RootRender />
      </template>
    </component>
  </div>
</template>
<script setup lang="ts">
// TODO 最外层的render
import { setComponentRef } from '@core/utils/component-ref'
import componentRegister from '@core/utils/component-regiter'

const mock = [
  {
    key: 'CRUD',
    name: '表格组件',
    description: '增删改查表格',
    componentId: 6,
    props: {
      columns: [
        {
          prop: 'name',
          label: '门店名称',
          search: {
            key: 'storeName',
            el: 'input',
            props: {
              placeholder: '输入门店名称'
            }
          }
        },
        {
          prop: 'tel',
          label: '手机号码',
          search: {
            key: 'phone',
            el: 'input',
            props: {
              placeholder: '输入负责人手机号码'
            }
          }
        },
        {
          prop: 'storedBalance',
          label: '储蓄余额（元）',
          sortable: 'custom'
        },
        {
          prop: 'weightReducingApparatusBootNum',
          label: '减肥仪开机次数',
          sortable: 'custom'
        },
        {
          prop: 'cabinBootNum',
          label: '舱开机次数',
          sortable: 'custom'
        },
        {
          prop: 'operation',
          label: '操作',
          fixed: 'right',
          width: 250
        }
      ],
      api: 'baidu.com',
      'row-key': 'id'
    },
    children: []
  }
]
</script>

<style scoped></style>
