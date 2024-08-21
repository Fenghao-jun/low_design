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
              :disabled="item.isDisable"
            />
          </el-checkbox-group>
        </template>
      </CustomForm>
    </div>
    <ProcessDesigner v-show="active === 1" :data="mockData" ref="processRef" />
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
  getSceneState,
  getFlowEvent
} from '@editor/api/workFlow'
import { ref, watch } from 'vue'
import { AnyObject } from '@/types'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { omit } from 'lodash-es'

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

const formData = ref<Omit<SaveApprovalFlowParams, 'flowNode'>>({
  flowName: '',
  flowType: 'APPROVAL',
  flowScene: '',
  flowDesc: '',
  businessType: '',
  sceneStatus: '',
  flowEvent: []
})

const flowType = ref([])
const flowScene = ref([])
const flowBusinessType = ref([])
const sceneStatus = ref<any[]>([])

const { useEditFormItem } = useEditForm(
  formData,
  flowType,
  flowScene,
  flowBusinessType,
  sceneStatus
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

const getSceneStateRequest = async (flowScene) => {
  if (!flowScene) {
    return
  }
  const res = await getSceneState(flowScene)
  console.log('getSceneStateRequest: ', res)

  sceneStatus.value = res.data

  const clear = res.data.filter((item) => {
    console.log('item3333: ', item, formData.value)
    return item.stateCode === formData.value.sceneStatus
  })
  // console.log('clear: ', clear)

  if (!clear || clear.length === 0) {
    formData.value.sceneStatus = ''
  }
}

watch(
  () => formData.value.flowScene,
  (nvalue) => {
    console.log('nvalueflowScene: ', nvalue)

    // formData.value.sceneStatus = ''
    getSceneStateRequest(nvalue)
  },
  {
    immediate: true
  }
)
getFlowSceneRequest()
getFlowTypeRequest()
getBusinessTypeRequest()

const flowEvent = ref<any[]>([])
const getFlowEventRequest = async (val = '') => {
  if (!val) {
    flowEvent.value = []
    formData.value.flowEvent = []
    return
  }
  const params = {
    businessType: formData.value.businessType,
    flowScene: val,
    flowType: formData.value.flowType
  }
  const res = await getFlowEvent(params)
  console.log('getFlowEventRequest: ', res)

  let list = []
  if (formData.value.flowEvent.length > 0) {
    list = res.data
      .filter((item) => formData.value.flowEvent.includes(item.event))
      .map((item) => item.event)
  } else {
    // 加盟退出默认全部选中
    if (val === 'FRANCHISEE_EXIT') {
      list = res.data.map((item) => item.event)
    } else {
      list = res.data
        .filter((item) => item.isDisable === 1)
        .map((item) => item.event)
    }
  }

  formData.value.flowEvent = list
  flowEvent.value = res.data
}

watch(
  [() => formData.value.flowScene, () => formData.value.businessType],
  ([flowScene, businessType]) => {
    if (flowScene && businessType) {
      if (flowScene === 'FRANCHISEE_EXIT') {
        getFlowEventRequest(flowScene)
      } else {
        flowEvent.value = []
        formData.value.flowEvent = []
      }
    }
  }
)

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
      // if (active.value === 1) {
      //   return
      // }
      // active.value = active.value + 1
    })
}

// 新增
const processRef = ref<InstanceType<typeof ProcessDesigner>>()

// 节点配置表单枚举值
enum NODE_TARGET_KEYS {
  userId = 'STAFF',
  departId = 'DEPART',
  custom = 'CUSTOM',
  CUSTOM = 'custom',
  STAFF = 'userId',
  DEPART = 'departId'
  // CUSTOM = ''
}

// 节点类型枚举值
enum NODE_TYPE {
  start = 'START',
  confirm = 'CONFIRM',
  approver = 'APPROVAL',
  START = 'start',
  CONFIRM = 'confirm',
  APPROVAL = 'approver'
}

const dataToAddParams = (data: DefaultNode) => {
  // 转换的队列
  const flowNode: SaveApprovalFlowParams['flowNode'] = []

  // 把每个节点的config转成后端需要的NodeTarget
  const nodeConfigToNodeTarget = (config: AnyObject) => {
    const keys = Object.keys(config).filter((item) => NODE_TARGET_KEYS[item])
    console.log('config: ', config)

    console.log('keys: ', keys)

    const nodeTarget = keys.map((item) => ({
      targetType: NODE_TARGET_KEYS[item],
      targetItem: config[item].join(',')
    })) as NodeTarget[]

    return nodeTarget
  }

  // 每个节点转成node
  const changeToFlowNode = (nodeData: DefaultNode) => {
    console.log('nodeData: ', nodeData)
    const task: FlowNode = {
      nodeDesignFormId: nodeData.config.type || '',
      nodeName: nodeData.config.name,
      nodeType: NODE_TYPE[nodeData.nodeType],
      nodeTarget: nodeConfigToNodeTarget(nodeData.config),
      approvalType: nodeData.config.approvalType || 'NONE',
      nodeId: nodeData.config.nodeId || ''
    }
    if (nodeData.childNode) {
      changeToFlowNode(nodeData.childNode)
    }
    // return task
    flowNode.push(task)
  }

  changeToFlowNode(data)

  return flowNode
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
    console.log('processData: ', processData)

    console.log('32131231', dataToAddParams(processData.nodeConfig))

    const params = {
      ...formData.value,
      flowNode: dataToAddParams(processData.nodeConfig).reverse(),
      flowEvent: formData.value.flowEvent.join(',')
    } as SaveApprovalFlowParams

    saveApprovalFlow(params).then((res) => {
      console.log('res: ', res)
      ElMessage.success('发布成功')
      router.back()
    })
    console.log('params: ', JSON.stringify(params))
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
  const res = await getApprovalFlowDetail(searchParams.id as string)
  // console.log('res32131321: ', res.data.sceneStatus)

  formData.value = {
    ...omit(res.data, 'flowNode'),
    flowEvent: res.data.flowEvent.split(',')
  }

  const flowNodeToData = (data: FlowNode[]) => {
    const toData = (index = 0) => {
      const nodeData = data[index]
      console.log('nodeData: ', nodeData)
      const nodeType = NODE_TYPE[nodeData.nodeType]

      const defaultNodeConfig = nodeConfig[nodeType].defaultNode
      console.log('defaultNodeConfig: ', defaultNodeConfig)

      // const nodeDataToNodeConfig = ()=>{}

      if (defaultNodeConfig?.config) {
        // 转换配置
        defaultNodeConfig.config = {
          ...nodeData.nodeTarget
            .filter((item) => NODE_TARGET_KEYS[item.targetType])
            .reduce((pre, current) => {
              // 获取当前的key
              const key = NODE_TARGET_KEYS[current.targetType]
              pre[key] = current.targetItem ? current.targetItem.split(',') : []
              return pre
            }, {}),

          name: nodeData.nodeName,
          type: nodeData.nodeDesignFormId,
          approvalType: nodeData.approvalType,
          nodeId: nodeData.nodeId || ''
        }
      }

      return {
        ...defaultNodeConfig,
        childNode: data[index + 1] ? toData(index + 1) : null
      }
    }

    return toData()
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
