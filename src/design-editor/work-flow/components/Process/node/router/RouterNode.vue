<template>
  <!-- 路由节点 -->
  <div class="ep-node-router">
    <div class="ep-condition-node-add" @click="addCondition">添加条件</div>
    <div class="ep-node-router-box">
      <div
        class="ep-node-router-col"
        v-for="(condition, index) in props.node.conditionNodes"
        :key="index"
      >
        <!-- 生成节点 -->
        <NodeWrap
          :node="condition"
          :conditionNodes="props.node.conditionNodes"
          :conditionIndex="index"
          @removeNode="removeCondition(index)"
        />
        <!-- 用来遮挡最左列的线 -->
        <template v-if="index == 0">
          <div class="cover-line top-left-cover-line"></div>
          <div class="cover-line bottom-left-cover-line"></div>
        </template>
        <!-- 用来遮挡最右列的线 -->
        <template v-if="index == props.node.conditionNodes.length - 1">
          <div class="cover-line top-right-cover-line"></div>
          <div class="cover-line bottom-right-cover-line"></div>
        </template>
      </div>
    </div>
    <div
      style="
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <AddNode :node="props.node" />
    </div>
  </div>
</template>

<script setup name="RouterNode">
import NodeWrap from '../NodeWrap'
import AddNode from '../base/AddNode'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { copy } from '../../utils/tools'
import { nodeConfig } from '../../config/nodeConfig'
import { CONDITION } from '../../config/nodeType'

const props = defineProps({
  node: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  }
})

// const { proxy } = getCurrentInstance()

// 流程配置数据
const config = ref({})

// onMounted(async () => {})

// 移除条件

const emit = defineEmits(['removeNode', 'conditionChange'])
const removeCondition = (index) => {
  const conditionNum = props.node.conditionNodes.length
  if (conditionNum > 2) {
    // emit('conditionChange', index, 1)
    props.node.conditionNodes.splice(index, 1)
  } else {
    emit('removeNode')
  }
}

// 添加条件分支
const addCondition = () => {
  const defaultNode = copy(nodeConfig[CONDITION].defaultNode)
  const length = props.node.conditionNodes.length

  props.node.conditionNodes.splice(length - 1, 0, defaultNode)
}
</script>

<style scoped>
.ep-node-router {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
}
.ep-node-router-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  .ep-node-router-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-top: 2px solid #cacaca;
    border-bottom: 2px solid #cacaca;
    background-color: #f5f5f7;

    padding-top: 50px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      margin: auto;
      width: 2px;
      height: 100%;
      background-color: #cacaca;
    }
  }

  .cover-line {
    position: absolute;
    height: 8px;
    width: 50%;
    background-color: #f5f5f7;
  }
  .top-left-cover-line {
    top: -4px;
    left: -1px;
  }
  .top-right-cover-line {
    top: -4px;
    right: -1px;
  }

  .bottom-left-cover-line {
    bottom: -4px;
    left: -1px;
  }
  .bottom-right-cover-line {
    bottom: -4px;
    right: -1px;
  }
}

.ep-condition-node-add {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 70px;
  height: 30px;
  font-size: 12px;
  color: #1c84c6;
  background-color: #ffffff;
  border-radius: 20px;
  cursor: pointer;
}
</style>
