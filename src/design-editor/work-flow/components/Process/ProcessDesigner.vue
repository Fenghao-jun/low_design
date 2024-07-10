<template>
  <div class="ep-container">
    <!-- 流程 -->
    <div class="ep-process">
      <!-- 递归节点 -->
      <NodeWrap
        v-if="processData && processData.nodeConfig"
        :node="processData.nodeConfig"
        @removeChildNode="handleRemoveChild"
      />
      <!-- 结束节点 -->
      <EndNode />
    </div>
    <!-- 缩放 -->
    <!-- <div class="ep-zoom">
      <svg-icon
        icon-class="subtract"
        class="ep-zoom-icon"
        color="#5a5e66"
        :class="zoom == 50 && 'disabled'"
        @click="setZoom(1)"
      />
      <span>{{ zoom }}%</span>
      <svg-icon
        icon-class="plus"
        class="ep-zoom-icon"
        color="#5a5e66"
        :class="zoom == 300 && 'disabled'"
        @click="setZoom(2)"
      />
    </div> -->
  </div>
</template>

<script setup lang="ts" name="ProcessDesigner">
import NodeWrap from './node/NodeWrap.vue'
import EndNode from './node/end/endNode.vue'
import { ref, onMounted, watch, provide } from 'vue'
import { copy } from './utils/tools'
import { createValidator } from './utils/validator'
import { KEY_VALIDATOR, KEY_PROCESS_DATA, KET_TYPE } from './config/keys'
import { BaseNodeConfig } from './config/nodeConfig'
import { flowType } from './config/nodeType'

const props = withDefaults(
  defineProps<{
    data: Record<any, any>
    // 这里会影响添加的节点列表，如果有新增的type，需要去nodeType文件中添加配置暴露节点
    type: flowType
  }>(),
  {
    data: () => ({}),
    type: 'feature'
  }
)

// 缩放值
const zoom = ref(100)
// 创建节点验证器实例
const validator = createValidator()
// 依赖注入: 节点验证器实例
provide(KEY_VALIDATOR, validator)

// 流程数据
const processData = ref<BaseNodeConfig>()
// 依赖注入: 流程数据
provide(KEY_PROCESS_DATA, processData)
// 依赖注入: 流程类型
provide(KET_TYPE, props.type)

watch(
  () => props.data,
  (val) => {
    init()
  }
)

onMounted(async () => {
  init()
})

/**
 * 设置缩放
 * @param type
 */
const setZoom = (type: number) => {
  if (type === 1) {
    if (zoom.value === 50) {
      return
    }
    zoom.value -= 10
  } else {
    if (zoom.value === 300) {
      return
    }
    zoom.value += 10
  }
}

// 初始化流程
const init = () => {
  if (props.data && props.data.nodeConfig) {
    processData.value = copy(props.data)
  }
}

const validate = (callback) => {
  const result = validator.validate()
  console.log('result: ', result)
  callback(result.valid, result.messages)
}

/**
 * 获取流程配置结果
 */
const getResult = () => {
  return copy(processData.value)
}

const handleRemoveChild = (child, old) => {
  child = old
}

defineExpose({
  validate,
  getResult
})
</script>
<style lang="scss" scoped>
.ep-container {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  overflow-x: auto;
  overflow-y: auto;
  padding: 16px 0;
  height: calc(100vh - 216px);
}

.ep-process {
  // position: relative;
  height: 100%;
  width: 100%;
}

.ep-zoom {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 40px;
  top: 70px;
  z-index: 10;
}

.ep-zoom-icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
  padding: 4px;
  border: 1px solid #cacaca;
}
</style>
