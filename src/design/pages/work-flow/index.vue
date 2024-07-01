<template>
  <div class="flow-container">
    <div class="flow-container__tabs">
      <ElButton v-if="active === 0">返回</ElButton>

      <el-steps
        :active="active"
        style="width: 600px"
        align-center
        finish-status="success"
      >
        <el-step title="基础配置" @click="handleNextClick(0)" />
        <el-step title="流程设计" />
      </el-steps>
      <ElButton type="primary" @click="handleNextClick()" v-if="active === 0"
        >下一步</ElButton
      >
      <ElButton type="primary" v-else>发布</ElButton>
    </div>
    <div class="form-container" v-show="active === 0">
      <CustomForm
        ref="formRef"
        :from-items="useEditFormItem"
        v-model="formData"
        label-width="130"
        :col-layout="{
          xl: 24,
          lg: 24,
          md: 24,
          sm: 24,
          xs: 24
        }"
        inline
      >
      </CustomForm>
    </div>
    <ProcessDesigner v-show="active === 1" :data="mockData" />
  </div>
</template>

<script setup lang="ts">
import { useEditForm } from './config/index'

import { CustomForm } from 'am-admin-component'
import ProcessDesigner from '@editor/work-flow/components/Process/ProcessDesigner.vue'
import { getFlowType, getFlowScene } from '@editor/api/workFlow'
import { ref } from 'vue'

const mockData = ref({
  processId: '10001',
  processName: '流程设计',
  nodeConfig: {
    nodeName: '发起加盟邀请',
    nodeType: 'start',
    config: {
      // name: null
    },
    childNode: {
      nodeName: '加盟商确认加盟邀请',
      nodeType: 'confirm',
      config: {
        // name: '确认人'
      },
      childNode: {
        nodeName: '审批人',
        nodeType: 'approver',
        config: {
          // name: '李四2'
        }
      }
    }
  }
})
const active = ref(0)

const formData = ref({
  flowName: '',
  flowtype: '',
  flowScene: '',
  flowDesc: ''
})

const flowType = ref([])
const flowScene = ref([])

const { useEditFormItem } = useEditForm(formData, flowType, flowScene)

const getFlowTypeRequest = async () => {
  const res = await getFlowType()

  flowType.value = res.data
}

const getFlowSceneRequest = async () => {
  const res = await getFlowScene()

  flowScene.value = res.data
}

getFlowSceneRequest()
getFlowTypeRequest()

const formRef = ref<InstanceType<typeof CustomForm>>()
const handleNextClick = (num?: number) => {
  if (num === 0) {
    active.value = num
    return
  }
  formRef.value
    ?.validate()
    .then(() => {
      if (active.value === 1) {
        return
      }
      active.value = active.value + 1
    })
    .catch(() => {
      if (active.value === 1) {
        return
      }
      active.value = active.value + 1
    })
}
</script>
<style lang="scss" scoped>
.flow-container {
  padding: 16px 0;
  min-height: 100vh;
  box-sizing: border-box;

  &__tabs {
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    justify-content: center;
    gap: 20px;
    margin: 0 auto;
  }
  .form-container {
    margin: 0 auto;
    width: 500px;
  }
}
</style>
