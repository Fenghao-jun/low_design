<template>
  <div :class="{ 'ep-node': true, 'ep-node-arrows': !isStart }">
    <div
      :class="{ 'ep-node-content': true, 'ep-node-error': isError }"
      @click="showNodeDrawer"
    >
      <!-- header -->
      <div
        class="ep-node-header"
        :style="{ color: config.color, 'background-color': config.bgColor }"
      >
        <svg-icon
          :icon-class="config.icon.name"
          class="ep-node-icon"
          color="#FFFFFF"
        />
        <div class="ep-node-header-title">
          {{ node.config.name || config.title }}
        </div>
        <svg-icon
          icon-class="close"
          class="ep-node-close"
          color="#FFFFFF"
          v-if="canRemoved"
          @click.stop="removeNode"
        />
      </div>
      <!-- body -->
      <div class="ep-node-body">
        <component
          ref="node"
          :is="nodeComponents[props.node.nodeType]"
          :tempNodeId="tempNodeId"
          :node="props.node"
        />
      </div>
      <!-- 校验错误提示 -->
      <div class="ep-node-error-msg" v-if="isError">
        <div class="ep-node-error-msg-box">
          <svg-icon
            icon-class="tips"
            class="ep-node-error-icon"
            color="red"
            @mouseenter="showErrorTips(true)"
            @mouseleave="showErrorTips(false)"
          />
          <div class="ep-node-error-tips" v-if="errorTips && errorMsg">
            {{ errorMsg }}
          </div>
        </div>
      </div>
    </div>
    <AddNode :node="props.node" />

    <!-- <Teleport to="#"></Teleport> -->
    <BaseDrawer
      ref="drawerRef"
      @updateConfig="updateConfig"
      @cancelUpdateConfig="cancelUpdateConfig"
    />
    <!-- 节点配置Drawer -->
  </div>
</template>

<script lang="ts" setup name="BaseNode">
import BaseDrawer from './BaseDrawer.vue'
import AddNode from './AddNode.vue'
import {
  ref,
  shallowRef,
  onMounted,
  getCurrentInstance,
  defineAsyncComponent,
  watch,
  computed,
  onUnmounted,
  inject
} from 'vue'
import { nodeConfig } from '../../config/nodeConfig'
import { copy, getUUID } from '../../utils/tools'
import { START, CONDITION } from '../../config/nodeType'
import { KEY_VALIDATOR } from '../../config/keys'
import SvgIcon from '../../../SvgIcon/index.vue'
import { Validator } from '@editor/work-flow/components/Process/utils/validator'

const props = defineProps({
  node: {
    // 传入的流程节点数据
    type: Object,
    default: () => ({})
  },
  conditionNodes: {
    // 条件集合，当节点类型为condition时有效
    type: Array,
    default: () => []
  },
  conditionIndex: {
    // 当前条件节点的顺序，当节点类型为condition时有效
    type: Number,
    default: 0
  }
})

// 生成临时节点ID
const tempNodeId = getUUID()

// 节点配置数据
const config = ref(nodeConfig[props.node.nodeType])

// 获取流程验证器实例
const validator = inject<Validator>(KEY_VALIDATOR)
const errorMsg = ref(null)
const errorTips = ref(false)

watch(
  () => props.node,
  (val) => {
    console.log('val: ', val)
    config.value = nodeConfig[props.node.nodeType]
    validator?.validate()
  }
)

const nodeComponents = shallowRef({})
const modules = require.context('../', true, /.*\/.*Node\.vue$/)

const loadComponent = async (key) => {
  // if (nodeConfig[key] && nodeConfig[key].hasDrawer) {
  try {
    const modulePath = `./${key}/${key}Node.vue`

    nodeComponents.value[key] = modules(modulePath).default
  } catch (error) {
    // console.error(`Failed to load component for ${key}: `, error)
  }
  // }
}

// 初始化加载所有组件
Object.keys(nodeConfig).forEach((key) => loadComponent(key))

// 节点左右移动按钮状态
const isShowLeftMoveBtn = ref(false)
const isSelectedLeftMoveBtn = ref(false)
const isShowRightMoveBtn = ref(false)
const isSelectedRightMoveBtn = ref(false)

// onMounted(async () => {})

onUnmounted(async () => {
  validator?.remove(tempNodeId)
  validator?.validate()
})

const isStart = computed(() => {
  return props.node.nodeType === START
})

// 节点验证结果是否异常
const isError = computed(() => {
  const result = validator?.getResult(tempNodeId)
  return result ? !result.valid : false
})

watch(isError, (newValue) => {
  if (newValue) {
    errorMsg.value = validator?.getResult(tempNodeId)?.message
  } else {
    errorMsg.value = null
  }
})

// 节点是否可以被移除
const canRemoved = computed(() => {
  if (isLastCondition()) {
    return false
  }
  return config.value.canRemoved
})

// 显示节点配置组件
const drawerRef = ref<InstanceType<typeof BaseDrawer>>()
const showNodeDrawer = () => {
  if (config.value.hasDrawer) {
    if (isLastCondition()) {
      return false
    }
    drawerRef.value?.show(props.node)
  }
}

// 判断当前节点是否为条件节点
const isCondition = () => {
  if (props.node.nodeType === CONDITION) {
    return true
  }
  return false
}

// 判断当前节点是否为条件节点，且为最后一个条件
const isLastCondition = () => {
  if (isCondition() && props.node.isLastCondition) {
    return true
  }
  return false
}

// 移除当前节点
const emit = defineEmits(['removeNode', 'updateNode'])
const removeNode = () => {
  emit('removeNode')
  isShowLeftMoveBtn.value = false
  isShowRightMoveBtn.value = false
}

// // 鼠标移入事件
// const mouseenter = () => {
//   showMoveBtn(1, true)
//   showMoveBtn(2, true)
// }

// // 鼠标移出事件
// const mouseleave = () => {
//   showMoveBtn(1, false)
//   showMoveBtn(2, false)
// }

// // 节点左右移动按钮状态
// const showMoveBtn = (direction, flag) => {
//   const index = props.conditionIndex
//   const length = props.conditionNodes.length
//   if (isCondition() && !isLastCondition()) {
//     if (direction === 1 && index !== 0) {
//       isShowLeftMoveBtn.value = flag
//     } else if (direction === 2 && index !== length - 2) {
//       isShowRightMoveBtn.value = flag
//     } else {
//       isShowRightMoveBtn.value = false
//     }
//   }
// }

// 更新节点配置属性
const updateConfig = (data) => {
  console.log('data: ', data)
  props.node.config = data
  emit('updateNode', props.node.config, data)
  validator?.validate()
}

// 取消更新节点配置属性
const cancelUpdateConfig = () => {
  validator?.validate()
}

// 显示错误提示信息
const showErrorTips = (flag) => {
  errorTips.value = flag
}
</script>

<style lang="scss" scoped>
.ep-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0px 100px;
}

.ep-node-arrows {
  &:before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: #cacaca transparent transparent;
    background: #f5f5f7;
  }
}

.ep-node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  min-height: 80px;
  font-size: 14px;
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
  white-space: normal;
  word-break: break-word;
  position: relative;
  box-sizing: border-box;
  border-radius: 5px;
  transition-property: box-shadow;
  transition-duration: 0.1s;
  cursor: pointer;
  &:hover {
    box-shadow: 5px 5px 12px 5px rgba(0, 0, 0, 0.2);
  }

  .ep-node-header {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #1e83e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 5px 10px;
    color: #ffffff;
    box-sizing: border-box;

    .ep-node-icon {
      font-size: 16px;
    }

    .ep-node-header-title {
      flex: 1;
      margin-left: 4px;
      text-align: left;
    }

    .ep-node-close {
      font-size: 16px;
      text-align: center;
      cursor: pointer;
    }
  }
  .ep-node-body {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 10px;
    color: #5a5e66;
    cursor: pointer;
    box-sizing: border-box;
    text-align: left;
  }
}

.ep-node-error {
  box-shadow: 0px 0px 10px 2px rgba(243, 5, 5, 0.5);
  &:hover {
    box-shadow: 0px 0px 12px 4px rgba(243, 5, 5, 0.5);
  }
}
.ep-node-error-msg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -55px;
  z-index: 1;

  .ep-node-error-msg-box {
    position: relative;
    .ep-node-error-icon {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
    .ep-node-error-tips {
      position: absolute;
      z-index: 3;
      top: 50%;
      transform: translateY(-50%);
      left: 45px;
      min-width: 150px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
      display: flex;
      padding: 16px;

      &:before {
        content: '';
        width: 0;
        height: 0;
        border: 10px solid;
        position: absolute;
        top: 50%;
        left: -20px;
        transform: translateY(-50%);
        border-color: transparent #ffffff transparent transparent;
      }
    }
  }
}

.ep-node-move {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.ep-node-move-left {
  left: -30px;
}
.ep-node-move-right {
  right: -30px;
}
.ep-node-move-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
</style>
