<template>
  <!-- 条件节点 -->
  <div class="ep-node-condition">
    <div v-if="!props.node.isLastCondition">
      请假天数: {{ node.config.days }}天
    </div>
    <div v-else>其他条件进入此流程</div>
  </div>
</template>

<script setup lang="ts" name="ConditionNode">
import { getCurrentInstance, inject } from 'vue'
import { KEY_PROCESS_DATA, KEY_VALIDATOR } from '../../config/keys'
import { Validator } from '@editor/work-flow/components/Process/utils/validator'

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

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
// 获取流程验证器实例
const validator = inject<Validator>(KEY_VALIDATOR)

// 注册验证器
validator?.register(props.tempNodeId || '', () => {
  let valid = true
  if (!props.node.isLastCondition) {
    if (!props.node.config.days) {
      valid = false
    }
  }
  return {
    valid: valid,
    message: '请选择条件'
  }
})
</script>

<style scoped>
.ep-node-condition {
}
</style>
