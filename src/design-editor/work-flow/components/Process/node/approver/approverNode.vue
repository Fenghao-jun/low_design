<template>
  <!-- 审批人节点 -->
  <div class="node-row">
    审批对象：

    <div class="node-row_content">
      <div v-if="userNum">{{ userNum }}</div>
      <div v-if="departNum">{{ departNum }}</div>
    </div>
    <el-icon><ArrowRight /></el-icon>
  </div>
</template>

<script lang="ts" setup name="ApproverNode">
import { computed, getCurrentInstance, inject } from 'vue'
import { KEY_VALIDATOR, KEY_PROCESS_DATA } from '../../config/keys'
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

const userNum = computed(() => {
  return props.node.config.userId
    ? `人员：${props.node.config.userId.length}人 `
    : ''
})

const departNum = computed(() => {
  return props.node.config.departId
    ? `部门：${props.node.config.departId.length}个`
    : ''
})

// const { proxy } = getCurrentInstance()

// 获取流程数据
// const processData = inject(KEY_PROCESS_DATA)
// 获取流程验证器实例
const validator = inject<Validator>(KEY_VALIDATOR)

// 注册验证器
validator?.register(props.tempNodeId || '', () => {
  return {
    valid: !!props.node.config.name,
    message: '请选择审批人'
  }
})
</script>

<style lang="scss" scoped>
.node-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
