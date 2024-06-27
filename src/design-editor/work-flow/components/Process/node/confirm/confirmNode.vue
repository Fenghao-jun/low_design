<template>
  <!-- 确认人节点 -->
  <div class="node-row">确认对象：{{ node.config.name }}</div>
</template>

<script lang="ts" setup name="ApproverNode">
import { inject } from 'vue'
import { KEY_VALIDATOR, KEY_PROCESS_DATA } from '../../config/keys'
import { Validator } from '../../utils/validator'
import { DefaultNode } from '../../config/nodeConfig'

interface NodeProps {
  tempNodeId: string
  node: DefaultNode
}

const props = withDefaults(defineProps<NodeProps>(), {
  tempNodeId: '',
  node: () => ({
    config: {},
    nodeName: '',
    nodeType: ''
  })
})

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
