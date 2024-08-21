<template>
  <div class="flow-container" id="flow-container">
    <div class="flow-container__tabs">
      <ElButton v-if="active === 0" @click="router.back()">返回</ElButton>
      <ElButton v-if="active === 1" @click="active = 0">上一步</ElButton>

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
      <ElButton type="primary" @click="handleSubmit" v-else>发布</ElButton>
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
        <template #flowEvent>
          <el-checkbox-group
            v-model="formData.flowEvent"
            size="small"
            style="display: flex; flex-direction: column"
          >
            <el-checkbox
              v-for="item in flowEvent"
              :key="item.event"
              :label="item.eventName"
              :value="item.event"
            />
          </el-checkbox-group>
        </template>
      </CustomForm>
    </div>
    <div style="width: 100%; overflow: auto">
      <ProcessDesigner
        v-show="active === 1"
        :data="mockData"
        ref="processRef"
        :type="'project'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditForm } from './config/index'

import { CustomForm } from 'am-admin-component'
import ProcessDesigner from '@editor/work-flow/components/Process/ProcessDesigner.vue'
import {
  DefaultNode,
  nodeConfig
} from '@editor/work-flow/components/Process/config/nodeConfig'
import {
  getFlowType,
  getFlowScene,
  SaveApprovalFlowParams,
  FlowNode,
  NodeTarget,
  getApprovalFlowDetail,
  saveApprovalFlow,
  getBusinessType,
  getFlowList,
  FlowListItem,
  saveProjectFlow,
  getProjectFlowDetail,
  ProjectFlowNode,
  getFlowEvent
} from '@editor/api/workFlow'
import { provide, ref, watch } from 'vue'
import { AnyObject } from '@/types'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { omit, cloneDeep } from 'lodash-es'
import {
  PROJECT_DATA_KEY,
  TOTAL_SELECTED_FLOW_KEY,
  FLOW_LIST_KEY
} from './keys'
import {
  FEATURE,
  FEATURE_ROUTER
} from '@/design-editor/work-flow/components/Process/config/nodeType'

const mockData = ref({
  processId: '10001',
  processName: '流程设计',
  nodeConfig: {
    nodeName: '发起加盟邀请',
    nodeType: 'feature',
    config: {
      // name: null
    },
    childNode: null
  }
})
const active = ref(0)

const formData = ref<Omit<SaveApprovalFlowParams, 'flowNode'>>({
  flowName: '',
  flowType: 'PROJECT',
  flowScene: '',
  flowDesc: '',
  businessType: '',
  flowEvent: []
})

// 提供功能选项
const flowList = ref<FlowListItem[]>([])
provide(FLOW_LIST_KEY, flowList)

// 提供已选择的流程，用于避免流程被重复选择
const totalSelectedFlow = ref<string[]>([])
const setSelectedFlow = (nValue: number | string, oValue: number | string) => {
  console.log(
    'nValue: number | string, oValue: number | string: ',
    !nValue,
    oValue
  )
  if (oValue && !nValue) {
    // 清空的
    const list = totalSelectedFlow.value.filter(
      (item) => item !== String(oValue)
    )
    totalSelectedFlow.value = list
    return
  }
  if (!oValue) {
    // 全新的
    totalSelectedFlow.value.push(String(nValue))
  } else {
    // 过滤掉旧的
    const list = totalSelectedFlow.value.filter(
      (item) => item !== String(oValue)
    )
    list.push(String(nValue))
    totalSelectedFlow.value = list
  }
}
provide(TOTAL_SELECTED_FLOW_KEY, {
  totalSelectedFlow,
  setSelectedFlow
})

watch(
  () => formData.value.businessType,
  async (nValue) => {
    console.log('nValue: ', nValue)
    if (!nValue) {
      return
    }
    const res = await getFlowList(nValue)
    flowList.value = res.data
  }
)

const flowType = ref([])
const flowScene = ref([])
const flowBusinessType = ref([])
const flowEvent = ref<any[]>([])

const { useEditFormItem } = useEditForm(
  formData,
  flowType,
  flowScene,
  flowBusinessType,
  flowEvent
)

const getFlowTypeRequest = async () => {
  const res = await getFlowType()

  flowType.value = res.data
}

const getFlowSceneRequest = async () => {
  const res = await getFlowScene()

  flowScene.value = res.data
}

const getBusinessTypeRequest = async () => {
  const res = await getBusinessType()
  flowBusinessType.value = res.data
}

const getFlowEventRequest = async (businessType = '') => {
  if (!businessType) {
    flowEvent.value = []
    formData.value.flowEvent = []
    return
  }
  const params = {
    businessType,
    flowType: formData.value.flowType,
    flowScene: ''
  }
  const res = await getFlowEvent(params)
  console.log('getFlowEventRequest: ', res)

  const list = res.data
    .filter((item) => formData.value.flowEvent.includes(item.event))
    .map((item) => item.event)

  formData.value.flowEvent = list
  flowEvent.value = res.data
}

getFlowSceneRequest()
getFlowTypeRequest()
getBusinessTypeRequest()

watch(
  () => formData.value.businessType,
  (nValue) => {
    getFlowEventRequest(nValue)
  }
)

const formRef = ref<InstanceType<typeof CustomForm>>()
const handleNextClick = (num?: number) => {
  if (num === 0) {
    active.value = num
    return
  }
  formRef.value?.validate().then(() => {
    if (active.value === 1) {
      return
    }
    active.value = active.value + 1
  })
}

// 新增
const processRef = ref<InstanceType<typeof ProcessDesigner>>()

const dataToAddParams = (processData: DefaultNode) => {
  const getFlowNode = (data: DefaultNode) => {
    const item = {
      nodes:
        data.nodeType === 'feature'
          ? [
              {
                flowScene: data.config.flowScene,
                nodeName: data.config.nodeName,
                nodeType: 'SCENE',
                nodeId: data.config.nodeId || ''
              }
            ]
          : data.featureNodes?.map((item) => ({
              flowScene: item.config.flowScene,
              nodeName: item.config.nodeName,
              nodeType: 'SCENE',
              nodeId: item.config.nodeId || ''
            })),
      children: null
    } as any
    // const nodes =

    if (data.childNode) {
      item.children = getFlowNode(data.childNode)
    }

    return [item]
  }

  // return flowNode
  return getFlowNode(processData)
}

// 提交
const router = useRouter()
const handleSubmit = () => {
  console.log('submit!')
  processRef.value?.validate((validate, messages) => {
    if (!validate) {
      messages.forEach((element) => {
        ElMessage.error(element)
      })
      return
    }
    console.log('validate,messages: ', validate, messages)
    const processData = processRef.value?.getResult()
    console.log(
      'processData: ',
      processData,
      dataToAddParams(processData.nodeConfig)
    )

    // console.log('32131231', dataToAddParams(processData.nodeConfig))

    const params = {
      ...formData.value,
      flowEvent: formData.value.flowEvent.join(','),
      flowNode: dataToAddParams(processData.nodeConfig)
    }

    saveProjectFlow(params).then((res) => {
      console.log('res: ', res)
      ElMessage.success('发布成功')
      router.back()
    })
    // console.log('params: ', JSON.stringify(params))
  })
}

// 获取详情 转换数据格式
const route = useRoute()
const getDetail = async () => {
  const searchParams = route.params
  console.log('searchParams: ', searchParams)
  if (!searchParams.id) {
    return
  }
  const res = await getProjectFlowDetail(searchParams.id as string)

  formData.value = {
    ...omit(res.data, 'flowNode'),
    flowEvent: res.data.flowEvent.split(',')
  }

  const flowNodeToData = (data: ProjectFlowNode[]) => {
    const toData = (children: ProjectFlowNode[], first = false) => {
      const item = children[0] || null

      if (!item) {
        // 没有值就返回
        return null
      }

      if (first) {
        const featureDefaultConfog = cloneDeep(nodeConfig[FEATURE].defaultNode)

        const firstNodeConfig = item.nodes[0]

        if (firstNodeConfig.flowScene) {
          setSelectedFlow(firstNodeConfig.flowScene, '')
        }
        return {
          ...featureDefaultConfog,
          config: {
            ...firstNodeConfig
          },
          childNode: toData(item.children || [])
        }
      }

      // 拿个路由节点
      const routerDefaultConfig = cloneDeep(
        nodeConfig[FEATURE_ROUTER].defaultNode
      )

      return {
        ...routerDefaultConfig,
        featureNodes: item.nodes.map((itemData) => {
          // 拿个功能节点
          const featureDefaultConfog = cloneDeep(
            nodeConfig[FEATURE].defaultNode
          )
          setSelectedFlow(itemData.flowScene, '')

          return {
            ...featureDefaultConfog,
            config: {
              ...itemData
            }
            // childNode:toData()
          }
        }),
        childNode: toData(item.children || [])
      }
    }

    return toData(data, true)
  }

  // console.log(flowNodeToData(res..data.flowNode as any), '33333333')
  mockData.value = {
    nodeConfig: flowNodeToData(res.data.flowNode as any)
    // lineConfig: res.flowLine as any,
    // data: res.flowData as any
  } as any
}

getDetail()
</script>
<style lang="scss" scoped>
.flow-container {
  padding: 16px 0;
  // min-height: 100vh;
  height: calc(100vh - 116px);
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
