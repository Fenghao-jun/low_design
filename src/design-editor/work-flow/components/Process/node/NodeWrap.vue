<template>
  <div class="ep-node-wrap" v-if="props.node">
    <!-- 路由节点 -->
    <RouterNode
      :node="props.node"
      @removeNode="removeNode"
      v-if="props.node.nodeType == ROUTER"
    />
    <FeatureRouterNode
      :node="props.node"
      @removeNode="removeNode"
      v-else-if="props.node.nodeType === FEATURE_ROUTER"
    />
    <!-- 普通节点 -->
    <BaseNode
      :node="props.node"
      :conditionNodes="props.conditionNodes"
      :conditionIndex="props.conditionIndex"
      @removeNode="removeNode"
      @updateNode="handleUpdateNode"
      v-else
    />
    <!-- 子节点 -->
    <NodeWrap
      :node="props.node.childNode"
      @removeNode="removeChildNode"
      v-if="props.node.childNode && props.node.childNode.nodeType"
    />
  </div>
</template>

<script lang="ts" setup name="NodeWrap">
import BaseNode from './base/BaseNode.vue'
import RouterNode from './router/RouterNode.vue'
import FeatureRouterNode from './featureRouter/featureRouterNode.vue'
import { ref } from 'vue'
import { ROUTER, FEATURE_ROUTER } from '../config/nodeType'

const props = defineProps({
  node: {
    // 当前流程节点数据
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
  },
  canRemoved: {
    // 当前节点是否可以移除
    type: Boolean,
    default: true
  }
})

// 流程配置数据
const config = ref({})

// 移除当前节点
const emit = defineEmits(['removeNode', 'removeChildNode'])
const removeNode = () => {
  emit('removeNode')
}

// 移除子节点
const removeChildNode = () => {
  const nextChildNode = props.node.childNode.childNode
  console.log('removeChildNode')

  props.node.childNode = nextChildNode
}

const handleUpdateNode = (config, data) => {
  config = data
}

const handleAddNode = (childNode, addNode) => {
  childNode = addNode
}

// const handleConditionChange = (target,...args)=>{

// }
</script>

<style lang="scss" scoped></style>
