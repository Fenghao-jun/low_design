<template>
  <div class="flow-container">
    <div class="flow-container__tabs">
      <el-steps :active="active" style="max-width: 600px;margin: 0 auto;" align-center finish-status="success">
        <el-step title="基础配置" />
        <el-step title="流程设计" />
      </el-steps>
    </div>
    <BaseConfig v-if="active === 0"></BaseConfig>
    <ProcessDesigner v-if="active === 1" :data="mockData" />
  </div>
</template>

<script setup lang="ts">

import BaseConfig from '@editor/work-flow/components/BaseConfig/index.vue'
import ProcessDesigner from '@editor/work-flow/components/Process/ProcessDesigner.vue'
import { ref } from 'vue'

const mockData = ref({
  processId: '10001',
  processName: '请假审批',
  nodeConfig: {
    nodeName: '发起人',
    nodeType: 'start',
    config: {
      name: null
    },
    childNode: {
      nodeName: '审批人',
      nodeType: 'approver',
      config: {
        name: null
      },
      // childNode: {
      //   nodeName: '路由',
      //   nodeType: 'router',
      //   conditionNodes: [
      //     {
      //       nodeName: '条件',
      //       nodeType: 'condition',
      //       isLastCondition: false,
      //       config: {
      //         days: 1
      //       },
      //       childNode: {
      //         nodeName: '审批人',
      //         nodeType: 'approver',
      //         config: {
      //           name: '赵六'
      //         }
      //       }
      //     },
      //     {
      //       nodeName: '条件',
      //       nodeType: 'condition',
      //       isLastCondition: false,
      //       config: {
      //         days: 3
      //       },
      //       childNode: {
      //         nodeName: '审批人',
      //         nodeType: 'approver',
      //         config: {
      //           name: '老王'
      //         }
      //       }
      //     },
      //     {
      //       nodeName: '条件',
      //       nodeType: 'condition',
      //       isLastCondition: true,
      //       config: {},
      //       childNode: {}
      //     }
      //   ],
      //   childNode: {
      //     nodeName: '审批人',
      //     nodeType: 'approver',
      //     config: {
      //       name: '李四'
      //     },
      //     childNode: {
      //       nodeName: '抄送人',
      //       nodeType: 'notify',
      //       config: {
      //         name: '王五'
      //       }
      //     }
      //   }
      // }
    }
  }
})
const active = ref(1)
</script>

<style lang="scss" scoped>
.flow-container {
  padding: 16px 0;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
