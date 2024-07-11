<template>
  <!-- 流程应用 -->
  <div class="ep-node-condition">
    <div>流程应用: {{ flowNodeText }}</div>
  </div>
</template>

<script lang="ts" setup name="FeatureNode">
import { computed, inject, ref } from 'vue'
import { KEY_VALIDATOR } from '../../config/keys'
import { Validator } from '@editor/work-flow/components/Process/utils/validator'
import { FLOW_LIST_KEY } from '@design/pages/work-flow/projectFlow/keys/index'

const props = defineProps({
  tempNodeId: {
    // 临时节点ID
    type: String
  },
  node: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  }
})

// 获取功能选项
const flowList = inject(FLOW_LIST_KEY, ref([]))

const flowNodeText = computed(() => {
  let text = ''

  if (props.node?.config?.flowScene) {
    const flow = flowList.value.find(
      (item) => item.flowScene === props.node.config.flowScene
    )

    text = flow?.flowName || ''
  }

  return text
})

// 获取流程验证器实例
const validator = inject(KEY_VALIDATOR) as Validator

// 注册验证器
validator.register(props.tempNodeId || '', () => {
  let valid = true
  if (!flowNodeText.value) {
    valid = false
  }
  return {
    valid: valid,
    message: '请选择功能流程'
  }
})
</script>

<style scoped>
.ep-node-condition {
}
</style>
